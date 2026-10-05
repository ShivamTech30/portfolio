import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, Trash2, Copy, Check, User, Mail, FileText, ArrowRight, Volume2, VolumeX, Mic, MicOff, Languages, Settings2, Play } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { fetchAIResponse } from '../utils/aiAssistant';
import { 
  speakText, 
  stopSpeech, 
  createSpeechRecognition, 
  VOICE_PRESETS, 
  getAvailableVoices, 
  onVoicesLoaded,
  testVoicePreview 
} from '../utils/speech';

const SUGGESTED_PROMPTS = [
  'Tell me about Shivam Sharma',
  'What are his core technical skills?',
  'Explain his role at Axis Mutual Fund',
  'Tell me about his key projects',
  'How can I get in touch with Shivam?'
];

const SUGGESTED_PROMPTS_HI = [
  'शिवम के बारे में विस्तार से बताएं',
  'शिवम की मुख्य टेक्निकल स्किल्स क्या हैं?',
  'Axis Mutual Fund में उनका क्या रोल है?',
  'उनके मुख्य प्रोजेक्ट्स के बारे में बताएं',
  'शिवम से संपर्क कैसे करें?'
];

const MyAi = () => {
  const [language, setLanguage] = useState(() => localStorage.getItem('shivam_ai_lang') || 'en');
  const [voicePreset, setVoicePreset] = useState(() => {
    const saved = localStorage.getItem('shivam_ai_voice_preset');
    return (saved && saved !== 'male-in') ? saved : 'female-in';
  });
  const [selectedVoiceName, setSelectedVoiceName] = useState(() => localStorage.getItem('shivam_ai_voice_name') || '');
  const [speechSpeed, setSpeechSpeed] = useState(() => parseFloat(localStorage.getItem('shivam_ai_speed')) || 1.0);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Welcome! I'm **Shivam's AI Assistant**.\n\nI can answer any questions regarding Shivam's 5+ years of experience as a Lead Frontend Developer, his work at Axis Mutual Fund, his skills with React/Next.js/TypeScript, his projects, or help you connect with him directly.\n\n*(Audio enabled with 👩 female voice & Hindi/English support)*"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onVoicesLoaded((voices) => {
      setAvailableVoices(voices);
    });
    setAvailableVoices(getAvailableVoices());
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('shivam_ai_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('shivam_ai_voice_preset', voicePreset);
  }, [voicePreset]);

  useEffect(() => {
    localStorage.setItem('shivam_ai_voice_name', selectedVoiceName);
  }, [selectedVoiceName]);

  useEffect(() => {
    localStorage.setItem('shivam_ai_speed', speechSpeed.toString());
  }, [speechSpeed]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      stopSpeech();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleToggleSpeak = (text, index) => {
    if (speakingIndex === index) {
      stopSpeech();
      setSpeakingIndex(null);
    } else {
      stopSpeech();
      setSpeakingIndex(index);
      speakText(
        text,
        {
          presetId: voicePreset,
          voiceName: selectedVoiceName || null,
          language,
          speed: speechSpeed
        },
        () => setSpeakingIndex(index),
        () => setSpeakingIndex(null),
        () => setSpeakingIndex(null)
      );
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      const recognition = createSpeechRecognition(
        language === 'hi' ? 'hi-IN' : 'en-IN',
        (transcript) => {
          setInput(transcript);
          setIsListening(false);
          handleSendMessage(transcript);
        },
        (error) => {
          console.warn('Speech recognition error:', error);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );

      if (recognition) {
        recognitionRef.current = recognition;
        try {
          recognition.start();
          setIsListening(true);
        } catch (e) {
          console.error(e);
          setIsListening(false);
        }
      } else {
        alert('Speech recognition is not supported in this browser. Try Chrome/Edge.');
      }
    }
  };

  const handleClearChat = () => {
    stopSpeech();
    setSpeakingIndex(null);
    setMessages([
      {
        role: 'assistant',
        content: language === 'hi'
          ? "✨ चैट साफ़ कर दी गई है! आप शिवम के बारे में क्या जानना चाहते हैं?"
          : "✨ Chat cleared! What would you like to ask about Shivam?"
      }
    ]);
  };

  const handleSendMessage = async (textToSend) => {
    const userQuery = (textToSend || input).trim();
    if (!userQuery || isLoading) return;

    stopSpeech();
    setSpeakingIndex(null);
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userQuery }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const queryWithLang = language === 'hi' 
        ? `${userQuery} (Please answer in natural, fluent Hindi / Hinglish)` 
        : userQuery;

      const aiResponse = await fetchAIResponse(queryWithLang);
      const updatedMessages = [...newMessages, { role: 'assistant', content: aiResponse }];
      setMessages(updatedMessages);

      const newIndex = updatedMessages.length - 1;
      speakText(
        aiResponse,
        {
          presetId: voicePreset,
          voiceName: selectedVoiceName || null,
          language,
          speed: speechSpeed
        },
        () => setSpeakingIndex(newIndex),
        () => setSpeakingIndex(null),
        () => setSpeakingIndex(null)
      );
    } catch (error) {
      console.error('AI assistant error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm available to answer any questions about Shivam! Feel free to ask about his experience at Axis Mutual Fund, skills, projects, or reach out at [shivamtech30@gmail.com](mailto:shivamtech30@gmail.com)."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPresetName = VOICE_PRESETS.find(p => p.id === voicePreset)?.name || 'Custom Voice';

  return (
    <div className="pt-24 pb-16 min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-yellow-500 animate-spin" />
            Voice-Enabled AI Assistant (English &amp; हिंदी)
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold gradient-text mb-2">
            Shivam's AI Assistant
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
            Ask questions with your keyboard or microphone in English and Hindi, and listen to spoken answers.
          </p>
        </motion.div>

        {/* Chat Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[700px] relative"
        >
          {/* Top Bar */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-4 text-white flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  Shivam's Assistant
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-xs text-blue-100">Lead Frontend Engineer AI • Voice Enabled</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Settings Dropdown Toggle */}
              <button
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                title="Change Voice & Audio Settings"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  showVoiceSettings 
                    ? 'bg-white text-blue-700 border-white shadow-sm' 
                    : 'bg-white/15 hover:bg-white/25 text-white border-white/20'
                }`}
              >
                <Volume2 size={14} className={showVoiceSettings ? "text-blue-600" : "text-yellow-300"} />
                <span>Voice: {currentPresetName.split(' ')[0]}</span>
                <Settings2 size={13} />
              </button>

              {/* Language Switcher */}
              <button
                onClick={() => {
                  stopSpeech();
                  setSpeakingIndex(null);
                  setLanguage(language === 'en' ? 'hi' : 'en');
                }}
                title={`Switch language (Current: ${language === 'en' ? 'English' : 'Hindi'})`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-white/20"
              >
                <Languages size={14} />
                <span>{language === 'en' ? 'English 🇺🇸' : 'हिंदी 🇮🇳'}</span>
              </button>

              {/* Stop Audio Button */}
              {speakingIndex !== null && (
                <button
                  onClick={() => { stopSpeech(); setSpeakingIndex(null); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/30 hover:bg-yellow-400/40 rounded-xl text-xs font-semibold text-yellow-200 transition-all cursor-pointer animate-pulse"
                >
                  <VolumeX size={14} /> Stop
                </button>
              )}

              {/* Clear Chat */}
              <button
                onClick={handleClearChat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>

          {/* Voice Settings Panel (Slide-down Popover) */}
          <AnimatePresence>
            {showVoiceSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-slate-900 text-slate-100 px-6 py-4 border-b border-slate-800 shadow-xl overflow-hidden z-20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-blue-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Voice Selection &amp; Speech Preferences</h4>
                  </div>
                  <button
                    onClick={() => testVoicePreview(voicePreset, selectedVoiceName, language, speechSpeed)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-all cursor-pointer shadow-sm"
                  >
                    <Play size={12} fill="currentColor" /> Test Voice
                  </button>
                </div>

                {/* Preset Voices Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                  {VOICE_PRESETS.map((preset) => {
                    const isSelected = voicePreset === preset.id && !selectedVoiceName;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          stopSpeech();
                          setSpeakingIndex(null);
                          setVoicePreset(preset.id);
                          setSelectedVoiceName('');
                          testVoicePreview(preset.id, null, preset.lang, speechSpeed);
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all text-xs font-medium flex flex-col justify-between border cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/30 border-blue-400 text-white ring-1 ring-blue-400'
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-semibold text-white flex items-center justify-between">
                          <span>{preset.name}</span>
                          {isSelected && <Check size={13} className="text-blue-400" />}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1">
                          {preset.lang === 'hi' ? 'Hindi Voice' : preset.region === 'IN' ? 'Indian Accent' : 'Global Accent'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Fine Controls: System Voice Picker & Speed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs">
                  {availableVoices.length > 0 && (
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-medium">Specific System Voice:</label>
                      <select
                        value={selectedVoiceName}
                        onChange={(e) => {
                          stopSpeech();
                          setSelectedVoiceName(e.target.value);
                          if (e.target.value) {
                            testVoicePreview(voicePreset, e.target.value, language, speechSpeed);
                          }
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-blue-400"
                      >
                        <option value="">-- Use Curated Preset ({currentPresetName}) --</option>
                        {availableVoices.map((v, i) => (
                          <option key={i} value={v.name}>
                            {v.name} ({v.lang})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-medium">
                      <span>Speech Speed:</span>
                      <span className="text-blue-400 font-bold">{speechSpeed}x</span>
                    </div>
                    <div className="flex gap-2">
                      {[0.85, 1.0, 1.15].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            setSpeechSpeed(speed);
                            testVoicePreview(voicePreset, selectedVoiceName, language, speed);
                          }}
                          className={`flex-1 py-1 rounded text-xs font-medium border transition-all cursor-pointer ${
                            speechSpeed === speed
                              ? 'bg-blue-600 border-blue-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {speed === 0.85 ? 'Slow (0.85x)' : speed === 1.0 ? 'Normal (1.0x)' : 'Fast (1.15x)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audio Wave Banner when speaking */}
          {speakingIndex !== null && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-6 py-2 flex items-center justify-between text-xs text-blue-800">
              <div className="flex items-center gap-2 font-medium">
                <Volume2 size={15} className="text-blue-600 animate-bounce" />
                <span>Speaking with {currentPresetName} in {language === 'hi' ? 'Hindi (हिंदी)' : 'English'}...</span>
                <div className="flex items-center gap-0.5 ml-1">
                  <span className="w-1 h-3 bg-blue-600 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                  <span className="w-1 h-4 bg-indigo-600 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                  <span className="w-1 h-2.5 bg-blue-500 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]"></span>
                </div>
              </div>
              <button
                onClick={() => { stopSpeech(); setSpeakingIndex(null); }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                Stop Audio
              </button>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 text-[15px] leading-relaxed">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                    <Bot size={18} />
                  </div>
                )}

                <div className={`relative group max-w-[85%] rounded-2xl p-4 sm:p-5 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-md'
                    : 'bg-white border border-slate-200 rounded-bl-sm shadow-sm text-slate-800'
                }`}>
                  <div className="prose prose-sm md:prose-base max-w-none break-words">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                      <button
                        onClick={() => handleToggleSpeak(msg.content, idx)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          speakingIndex === idx
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'hover:bg-slate-100 text-slate-600 hover:text-blue-600'
                        }`}
                      >
                        {speakingIndex === idx ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        <span>{speakingIndex === idx ? 'Stop Audio' : `Listen (${currentPresetName}) 🔊`}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                      >
                        {copiedIndex === idx ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-9 h-9 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-700 flex-shrink-0 mt-1 shadow-xs">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                  <Bot size={18} />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-xs text-slate-500 font-medium ml-1.5">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-6 py-2.5 bg-slate-100/80 border-t border-slate-200 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Sparkles size={13} className="text-yellow-500" /> Suggestions:
            </span>
            {(language === 'hi' ? SUGGESTED_PROMPTS_HI : SUGGESTED_PROMPTS).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="text-xs px-3 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-full text-slate-700 hover:text-blue-700 hover:border-blue-300 transition-all cursor-pointer shadow-2xs font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
            {/* Microphone Button */}
            <button
              type="button"
              onClick={handleToggleMic}
              title={isListening ? 'Stop listening' : 'Speak using microphone'}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-sm ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                  : 'bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200'
              }`}
            >
              {isListening ? <MicOff size={19} /> : <Mic size={19} />}
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={isListening ? "Listening... speak now" : (language === 'hi' ? "शिवम के काम, स्किल्स या प्रोजेक्ट्स के बारे में पूछें..." : "Ask about Shivam's work, skills, projects...")}
              className="flex-1 bg-slate-50 px-4 py-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 focus:border-blue-500 transition-all"
              disabled={isLoading}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold text-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              <span>Send</span>
              <Send size={16} />
            </button>
          </div>
        </motion.div>

        {/* Quick Links Below */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
          <Link to="/contact" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium">
            <Mail size={16} /> Contact Shivam directly <ArrowRight size={14} />
          </Link>
          <span className="text-slate-300">•</span>
          <Link to="/projects" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium">
            <FileText size={16} /> View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAi;

