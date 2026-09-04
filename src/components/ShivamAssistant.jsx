import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, Trash2, Copy, Check, User, Minimize2, Maximize2, Volume2, VolumeX, Mic, MicOff, Languages, Settings2, Play, ChevronDown, UserCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
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
  'Tell me about Shivam',
  'What are his top skills?',
  'What is his role at Axis Mutual Fund?',
  'What projects has he built?',
  'How can I get in touch with him?'
];

const SUGGESTED_PROMPTS_HI = [
  'शिवम के बारे में बताएं',
  'शिवम की मुख्य स्किल्स क्या हैं?',
  'Axis Mutual Fund में क्या काम करते हैं?',
  'कौनसे प्रोजेक्ट्स बनाए हैं?',
  'शिवम से कैसे संपर्क करें?'
];

const ShivamAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
      content: "👋 Hi! I'm **Shivam's AI Assistant**.\n\nAsk me anything about Shivam's experience as a Lead Frontend Developer, technical skills with React/Next.js/TypeScript, projects, or how to get in touch!\n\n*(Audio enabled with 👩 female voice & Hindi/English support)*"
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
    // Listen for available voices when loaded by the browser
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
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    } else {
      stopSpeech();
      setSpeakingIndex(null);
      setShowVoiceSettings(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen, messages, isLoading]);

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
        alert('Speech recognition is not supported on this browser. Try Chrome/Edge.');
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
          : "✨ Chat cleared! What would you like to know about Shivam?"
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

      // Auto-speak response with chosen voice
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
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 font-semibold text-sm border border-white/30 cursor-pointer"
          aria-label="Open Shivam's Assistant"
        >
          <div className="relative">
            <Bot size={22} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></span>
          </div>
          <span className="tracking-wide text-sm font-bold">Shivam's Assistant</span>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-normal">
            <Volume2 size={13} className="text-yellow-300" />
            <span>Voice</span>
          </div>
          <Sparkles size={16} className="text-yellow-300 animate-spin" />
        </motion.button>
      </div>

      {/* Floating Chat Drawer / Large Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-24 right-3 sm:right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 ${
              isExpanded 
                ? 'w-[96vw] sm:w-[88vw] md:w-[820px] h-[90vh] max-h-[860px]' 
                : 'w-[95vw] sm:w-[560px] md:w-[620px] h-[84vh] max-h-[720px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-5 py-4 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/25 shadow-inner">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base tracking-wide">Shivam's Assistant</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium border border-emerald-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-blue-100/90 font-light">Lead Frontend Engineer AI • Voice Enabled</p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-1.5">
                {/* Voice Settings Dropdown Toggle */}
                <button
                  onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                  title="Change Voice & Audio Settings"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer border ${
                    showVoiceSettings 
                      ? 'bg-white text-blue-700 border-white shadow-sm' 
                      : 'bg-white/15 hover:bg-white/25 border-white/20'
                  }`}
                >
                  <Volume2 size={14} className={showVoiceSettings ? "text-blue-600" : "text-yellow-300"} />
                  <span className="hidden xs:inline max-w-[110px] truncate">
                    {voicePreset.includes('female') ? '👩 Female' : '👨 Male'}
                  </span>
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
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer border border-white/20"
                >
                  <Languages size={14} />
                  <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
                </button>

                {/* Stop Speech / Audio Status */}
                {speakingIndex !== null && (
                  <button
                    onClick={() => { stopSpeech(); setSpeakingIndex(null); }}
                    title="Stop Audio"
                    className="p-2 bg-yellow-400/30 hover:bg-yellow-400/40 rounded-xl text-yellow-200 transition-colors cursor-pointer animate-pulse"
                  >
                    <VolumeX size={17} />
                  </button>
                )}

                {/* Clear Chat */}
                <button
                  onClick={handleClearChat}
                  title="Clear Chat"
                  className="p-2 hover:bg-white/15 rounded-xl text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 size={17} />
                </button>

                {/* Expand / Minimize Window Size */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? 'Standard view' : 'Expand view'}
                  className="hidden sm:flex p-2 hover:bg-white/15 rounded-xl text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  {isExpanded ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                </button>

                {/* Close Drawer */}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-2 hover:bg-white/15 rounded-xl text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <Minimize2 size={17} className="sm:hidden" />
                  <span className="hidden sm:inline">✕</span>
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
                  className="bg-slate-900 text-slate-100 px-5 py-4 border-b border-slate-800 shadow-xl overflow-hidden z-20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Volume2 size={16} className="text-blue-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Voice Selection &amp; Audio Settings</h4>
                    </div>
                    <button
                      onClick={() => testVoicePreview(voicePreset, selectedVoiceName, language, speechSpeed)}
                      className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-all cursor-pointer shadow-sm"
                    >
                      <Play size={12} fill="currentColor" /> Test Voice
                    </button>
                  </div>

                  {/* Preset Voices Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                    {/* All System Voices */}
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

                    {/* Speed Controls */}
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
                            {speed === 0.85 ? 'Slow' : speed === 1.0 ? 'Normal' : 'Fast'}
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
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-4 py-2 flex items-center justify-between text-xs text-blue-800">
                <div className="flex items-center gap-2 font-medium">
                  <Volume2 size={15} className="text-blue-600 animate-bounce" />
                  <span>Speaking ({currentPresetName} in {language === 'hi' ? 'Hindi' : 'English'})...</span>
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

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-slate-50/60 text-slate-800 text-[14.5px] leading-relaxed">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className={`relative group max-w-[86%] rounded-2xl p-4 text-sm sm:text-[14.5px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-md'
                      : 'bg-white border border-slate-200/90 rounded-bl-sm shadow-sm text-slate-800'
                  }`}>
                    <div className="prose prose-sm max-w-none break-words">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>

                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500">
                        {/* Audio Speak Button */}
                        <button
                          onClick={() => handleToggleSpeak(msg.content, idx)}
                          title={speakingIndex === idx ? 'Stop Voice' : 'Listen with Audio'}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                            speakingIndex === idx
                              ? 'bg-blue-100 text-blue-700 font-semibold'
                              : 'hover:bg-slate-100 text-slate-600 hover:text-blue-600'
                          }`}
                        >
                          {speakingIndex === idx ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          <span>{speakingIndex === idx ? 'Stop' : `Listen (${currentPresetName}) 🔊`}</span>
                        </button>

                        {/* Copy Text Button */}
                        <button
                          onClick={() => handleCopy(msg.content, idx)}
                          title="Copy text"
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                        >
                          {copiedIndex === idx ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                          <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 flex-shrink-0 mt-1 shadow-xs">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                    <Bot size={16} />
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

            {/* Quick Suggestions Chips */}
            {messages.length <= 4 && !isLoading && (
              <div className="px-4 sm:px-5 py-2.5 bg-slate-100/80 border-t border-slate-200/80 flex flex-wrap gap-2 items-center">
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
            )}

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80 flex items-center gap-2.5">
              {/* Mic Voice Input */}
              <button
                type="button"
                onClick={handleToggleMic}
                title={isListening ? 'Stop listening' : 'Speak with microphone (English/Hindi)'}
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
                className="flex-1 bg-slate-100 text-slate-900 px-4 py-3 rounded-2xl text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500/50 border border-transparent focus:border-blue-500 transition-all"
                disabled={isLoading}
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex-shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShivamAssistant;

