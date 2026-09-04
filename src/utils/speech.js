// Speech Synthesis (Text-to-Speech) and Speech Recognition Helper
// Optimized for smooth, natural voice selection with customizable voices, presets, and accents

export const VOICE_PRESETS = [
  { id: 'male-in', name: 'Shivam (Indian Male)', lang: 'en', gender: 'male', region: 'IN' },
  { id: 'female-in', name: 'Pooja (Indian Female)', lang: 'en', gender: 'female', region: 'IN' },
  { id: 'male-global', name: 'Alex / Daniel (Global Male)', lang: 'en', gender: 'male', region: 'US' },
  { id: 'female-global', name: 'Samantha (Global Female)', lang: 'en', gender: 'female', region: 'US' },
  { id: 'hindi-male', name: 'Madhav (Hindi Male)', lang: 'hi', gender: 'male', region: 'IN' },
  { id: 'hindi-female', name: 'Lekha (Hindi Female)', lang: 'hi', gender: 'female', region: 'IN' },
];

export const cleanMarkdownForSpeech = (text) => {
  if (!text) return '';

  return text
    // 1. Remove URLs and link formats: [text](url) -> text, and raw urls
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/mailto:\S+/g, '')
    // 2. Remove code blocks and inline code markers
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // 3. Remove Markdown headings, bold, italic, strikethrough, blockquotes
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/^\s*>\s+/gm, '')
    // 4. Remove list bullet points and numberings (e.g., "- ", "* ", "1. ")
    .replace(/^\s*[\-\*\+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // 5. Remove all Unicode emojis and pictographs so the engine never reads them out
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{200D}\u{FE0F}\u{200B}\u{200C}\u{200E}\u{200F}]/gu, '')
    // 6. Remove remaining decorative symbols
    .replace(/[•★✦✓✔✕✖❌👉🚀💼🛠🏢⚡🎯📍📬📧📞🐙📄📥🎓🏆🌐✨🤖👋💬🔊🎙]/g, '')
    .replace(/[|~_`#^*]/g, ' ')
    // 7. Normalize multiple spaces and punctuation pauses
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .trim();
};

let cachedVoices = [];
let voiceChangeListeners = [];

const initVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  const update = () => {
    cachedVoices = window.speechSynthesis.getVoices() || [];
    voiceChangeListeners.forEach(listener => {
      try { listener(cachedVoices); } catch (e) { console.error(e); }
    });
  };

  update();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = update;
  }
};

if (typeof window !== 'undefined') {
  initVoices();
}

export const onVoicesLoaded = (callback) => {
  if (typeof window === 'undefined') return () => {};
  if (cachedVoices.length > 0) {
    callback(cachedVoices);
  }
  voiceChangeListeners.push(callback);
  return () => {
    voiceChangeListeners = voiceChangeListeners.filter(l => l !== callback);
  };
};

export const getAvailableVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
  return cachedVoices;
};

export const findVoiceByPresetOrName = (presetId = 'male-in', specificVoiceName = null, language = 'en') => {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  // If specific exact voice name was chosen by user
  if (specificVoiceName) {
    const matched = voices.find(v => v.name === specificVoiceName || v.voiceURI === specificVoiceName);
    if (matched) return matched;
  }

  const isHindi = language === 'hi' || presetId.startsWith('hindi');

  if (isHindi) {
    const hindiVoices = voices.filter(v => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi'));
    if (hindiVoices.length > 0) {
      if (presetId === 'hindi-male') {
        const maleHi = hindiVoices.find(v => v.name.toLowerCase().includes('madhav') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('hemant'));
        if (maleHi) return maleHi;
      } else if (presetId === 'hindi-female') {
        const femaleHi = hindiVoices.find(v => v.name.toLowerCase().includes('lekha') || v.name.toLowerCase().includes('swara') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('neerja') || v.name.toLowerCase().includes('kalpana'));
        if (femaleHi) return femaleHi;
      }
      return hindiVoices[0];
    }
  }

  // English voices
  const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
  const candidatePool = englishVoices.length > 0 ? englishVoices : voices;

  switch (presetId) {
    case 'male-in': {
      // Indian English Male (Rishi on Mac, Microsoft Prabhat/Ravi, Google English India Male)
      const rishi = candidatePool.find(v => v.name.toLowerCase().includes('rishi'));
      if (rishi) return rishi;
      const inMale = candidatePool.find(v => (v.lang === 'en-IN' || v.lang.includes('en_IN')) && !v.name.toLowerCase().includes('female') && !v.name.toLowerCase().includes('veena') && !v.name.toLowerCase().includes('heera'));
      if (inMale) return inMale;
      const anyMaleEn = candidatePool.find(v => v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('alex') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male'));
      if (anyMaleEn) return anyMaleEn;
      break;
    }
    case 'female-in': {
      // Indian English Female (Veena on Mac, Microsoft Neerja/Heera, Google English India Female)
      const veena = candidatePool.find(v => v.name.toLowerCase().includes('veena'));
      if (veena) return veena;
      const inFemale = candidatePool.find(v => (v.lang === 'en-IN' || v.lang.includes('en_IN')) && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('neerja') || v.name.toLowerCase().includes('heera')));
      if (inFemale) return inFemale;
      const anyFemaleEn = candidatePool.find(v => v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('karen') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('zira'));
      if (anyFemaleEn) return anyFemaleEn;
      break;
    }
    case 'male-global': {
      // Global Male (Alex, Daniel, Microsoft David, Google US Male)
      const globalMale = candidatePool.find(v => v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('alex') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('oliver'));
      if (globalMale) return globalMale;
      break;
    }
    case 'female-global': {
      // Global Female (Samantha, Karen, Victoria, Microsoft Zira, Google US Female)
      const globalFemale = candidatePool.find(v => v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('karen') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('ava'));
      if (globalFemale) return globalFemale;
      break;
    }
    default:
      break;
  }

  // Fallback to first available candidate voice
  return candidatePool[0] || voices[0] || null;
};

let isSpeakingActive = false;

export const stopSpeech = () => {
  isSpeakingActive = false;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const speakText = (
  text, 
  { 
    presetId = 'male-in', 
    voiceName = null, 
    language = 'en', 
    speed = 1.0, 
    pitch = 1.0 
  } = {}, 
  onStart, 
  onEnd, 
  onError
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech immediately
  stopSpeech();

  const clean = cleanMarkdownForSpeech(text);
  if (!clean) {
    if (onEnd) onEnd();
    return;
  }

  // Split into natural short sentences to eliminate speech engine buffer and fluctuation issues
  const rawSentences = clean.split(/(?<=[.?!])\s+/).map(s => s.trim()).filter(s => s.length > 0);
  if (rawSentences.length === 0) {
    if (onEnd) onEnd();
    return;
  }

  isSpeakingActive = true;
  if (onStart) onStart();

  const isHindi = language === 'hi' || presetId.startsWith('hindi') || /[\u0900-\u097F]/.test(clean);
  const targetLang = isHindi ? 'hi-IN' : 'en-IN';
  const selectedVoice = findVoiceByPresetOrName(presetId, voiceName, language);

  let index = 0;

  const speakNext = () => {
    if (!isSpeakingActive || index >= rawSentences.length) {
      isSpeakingActive = false;
      if (onEnd) onEnd();
      return;
    }

    const currentSentence = rawSentences[index];
    index++;

    const utterance = new SpeechSynthesisUtterance(currentSentence);
    utterance.lang = targetLang;
    utterance.rate = (isHindi ? 0.95 : 1.0) * (speed || 1.0);
    
    // Set natural pitch based on gender profile
    let calculatedPitch = pitch || 1.0;
    if (presetId.includes('male')) {
      calculatedPitch *= 0.95;
    } else if (presetId.includes('female')) {
      calculatedPitch *= 1.05;
    }
    utterance.pitch = Math.max(0.7, Math.min(1.4, calculatedPitch));
    utterance.volume = 1.0;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      if (isSpeakingActive) {
        speakNext();
      }
    };

    utterance.onerror = (err) => {
      console.warn('Speech chunk error:', err);
      if (index >= rawSentences.length) {
        isSpeakingActive = false;
        if (onEnd) onEnd();
      } else if (isSpeakingActive) {
        speakNext();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  speakNext();
};

export const testVoicePreview = (presetId, voiceName, language = 'en', speed = 1.0) => {
  const sampleText = language === 'hi' || presetId.startsWith('hindi')
    ? 'नमस्ते! मैं शिवम का एआई असिस्टेंट हूँ। आप मुझसे कुछ भी पूछ सकते हैं।'
    : "Hi there! I'm Shivam's AI Assistant. How can I help you today?";
  
  speakText(sampleText, { presetId, voiceName, language, speed });
};

export const createSpeechRecognition = (language = 'en-IN', onResult, onError, onEnd) => {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported in this browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript || '';
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    if (onError) onError(event);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
};

