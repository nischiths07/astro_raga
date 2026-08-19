'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Send, Sparkles, User, Bot, ArrowLeft, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import BottomNav from '@/components/BottomNav';

export default function ChatPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice Mode States
  const [isMuted, setIsMuted] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const showNotification = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({ message, type });
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('astroraga_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setMessages([
          { 
            role: 'assistant', 
            content: `Greetings, ${parsed.name || 'Seeker'}. I am AstroSage. The stars have much to tell us today. How may I guide you on your journey through the cosmos?` 
          }
        ]);
      } catch (e) {
        localStorage.removeItem('astroraga_profile');
        router.push('/profile');
      }
    } else {
      router.push('/profile');
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Set up Speech Synthesis voices trigger
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (typeof window === 'undefined') return;

    // Stop and resume speech synthesis if paused by browser
    if (window.speechSynthesis) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
    }

    // Stop speaking whatever is currently active in Audio element
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Clean text (remove markdown elements, remedy block, emojis)
    const cleanText = text
      .replace(/\[REMEDY\].*?\[\/REMEDY\]/gi, '')
      .replace(/[*#_`~]/g, '')
      .trim();

    if (!cleanText) return;

    const currentVoices = voices.length > 0 ? voices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);

    // Helper for SpeechSynthesis native playback
    const speakNativeFallback = (txt: string) => {
      if (!window.speechSynthesis) return;
      setTimeout(() => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(txt);
        utteranceRef.current = utterance; // Retain ref to prevent GC in Chrome

        let fallbackVoice = currentVoices.find(v => v.lang.includes('kn-IN') || v.lang.includes('kn')) ||
                            currentVoices.find(v => v.lang.includes('en-IN') || v.lang.includes('hi-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')) ||
                            currentVoices[0] || null;

        if (fallbackVoice) {
          utterance.voice = fallbackVoice;
        }
        utterance.lang = language === 'kn' ? (fallbackVoice?.lang || 'kn-IN') : 'en-IN';
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        utterance.onend = () => { utteranceRef.current = null; };
        utterance.onerror = () => { utteranceRef.current = null; };

        window.speechSynthesis.speak(utterance);
      }, 50);
    };

    // Attempt to find native Kannada voice if language is Kannada
    let preferredVoice = null;
    if (language === 'kn') {
      preferredVoice = currentVoices.find(voice => voice.lang.includes('kn-IN') || voice.lang.includes('kn'));
    }

    // FALLBACK: If language is Kannada and there is no native Kannada voice, try proxy TTS with native fallback
    if (language === 'kn' && !preferredVoice) {
      try {
        const speechText = cleanText
          .replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '')
          .trim();
        
        if (speechText) {
          const chunks: string[] = [];
          let currentChunk = "";
          const words = speechText.split(' ');
          
          for (const word of words) {
            if ((currentChunk + " " + word).length > 150) {
              if (currentChunk) chunks.push(currentChunk.trim());
              currentChunk = word;
            } else {
              currentChunk += (currentChunk ? " " : "") + word;
            }
          }
          if (currentChunk) chunks.push(currentChunk.trim());

          let currentIdx = 0;
          let failedAttempts = 0;

          const playNextChunk = () => {
            if (currentIdx >= chunks.length) {
              audioRef.current = null;
              return;
            }
            if (failedAttempts >= 1) {
              audioRef.current = null;
              speakNativeFallback(cleanText);
              return;
            }

            const chunkText = chunks[currentIdx];
            const audioUrl = `/api/tts?lang=kn&text=${encodeURIComponent(chunkText)}`;
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            
            audio.onended = () => {
              currentIdx++;
              playNextChunk();
            };
            audio.onerror = () => {
              failedAttempts++;
              audioRef.current = null;
              speakNativeFallback(cleanText);
            };
            audio.play().catch(err => {
              if (err.name !== 'AbortError') {
                failedAttempts++;
                audioRef.current = null;
                speakNativeFallback(cleanText);
              }
            });
          };

          playNextChunk();
          return;
        }
      } catch (err) {
        speakNativeFallback(cleanText);
        return;
      }
    }

    speakNativeFallback(cleanText);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    // Resume and prime speech synthesis synchronously during user input event
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const userApiKey = localStorage.getItem('astroraga_api_key') || "";
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-api-key': userApiKey
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          profile,
          language // Pass the current selected language option (en or kn)
        }),
      });
      
      const data = await response.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        if (!isMuted) {
          speakText(data.content);
        }
      } else {
        throw new Error('Empty response');
      }
    } catch (error) {
      const errorMsg = "Forgive me, the cosmic connection was momentarily severed. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      if (!isMuted) {
        speakText(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content-wrapper" style={{ 
      padding: '20px 16px 80px 16px', 
      height: '100%', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              width: 'calc(100% - 40px)',
              maxWidth: '400px',
              background: notification.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(251, 191, 36, 0.15)',
              backdropFilter: 'blur(12px)',
              border: notification.type === 'error' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(251, 191, 36, 0.4)',
              borderRadius: '16px',
              padding: '14px 20px',
              color: notification.type === 'error' ? '#fca5a5' : 'var(--accent-gold)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 500, lineHeight: '1.4' }}>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header style={{ 
        padding: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(251, 191, 36, 0.1)',
        background: 'rgba(5, 5, 10, 0.8)',
        backdropFilter: 'blur(10px)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="gradient-gold royal-title" style={{ fontSize: '1.2rem' }}>{language === 'kn' ? 'ಆಸ್ಟ್ರೋಸೇಜ್ AI' : 'AstroSage AI'}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'kn' ? 'ಸಂಪರ್ಕದಲ್ಲಿದೆ' : 'Connected'}
              </span>
            </div>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            if (typeof window !== 'undefined' && window.speechSynthesis) {
              window.speechSynthesis.resume();
            }
            if (newMuted) {
              window.speechSynthesis?.cancel();
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
              }
            } else if (messages.length > 0) {
              speakText(messages[messages.length - 1].content);
            }
          }}
          style={{ 
            background: isMuted ? 'rgba(255,255,255,0.05)' : 'rgba(251, 191, 36, 0.15)', 
            border: isMuted ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--accent-gold)', 
            borderRadius: '12px', 
            padding: '10px', 
            color: isMuted ? 'var(--text-muted)' : 'var(--accent-gold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={language === 'kn' ? (isMuted ? "ಧ್ವನಿಯನ್ನು ಆನ್ ಮಾಡಿ" : "ಧ್ವನಿಯನ್ನು ಆಫ್ ಮಾಡಿ") : (isMuted ? "Enable AstroSage Voice" : "Mute AstroSage Voice")}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      </header>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        minHeight: 0,
        padding: '20px 24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px'
      }}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '16px 20px',
                borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                background: msg.role === 'user' ? 'var(--royal-gold)' : 'rgba(255, 255, 255, 0.05)',
                color: msg.role === 'user' ? 'black' : 'white',
                border: msg.role === 'user' ? 'none' : '1px solid rgba(251, 191, 36, 0.1)',
                boxShadow: msg.role === 'user' ? '0 10px 30px rgba(245, 158, 11, 0.2)' : 'none',
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '8px', 
                opacity: 0.7, 
                fontSize: '0.65rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {msg.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                  <span>{msg.role === 'user' ? (language === 'kn' ? 'ಜಿಜ್ಞಾಸು' : 'Seeker') : (language === 'kn' ? 'ಆಸ್ಟ್ರೋಸೇಜ್' : 'AstroSage')}</span>
                </div>
                {msg.role !== 'user' && (
                  <button 
                    onClick={() => speakText(msg.content)} 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--accent-gold)', 
                      cursor: 'pointer', 
                      padding: '2px 4px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      opacity: 0.8 
                    }}
                    title={language === 'kn' ? "ಗಟ್ಟಿಯಾಗಿ ಓದಿ" : "Read aloud"}
                  >
                    <Volume2 size={12} />
                  </button>
                )}
              </div>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                {msg.content.split('\n').map((line, lineIdx) => {
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={lineIdx} style={{ marginBottom: lineIdx < msg.content.split('\n').length - 1 ? '10px' : 0 }}>
                      {parts.map((part, partIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={partIdx} style={{ color: msg.role === 'user' ? 'inherit' : 'var(--accent-gold)' }}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(251, 191, 36, 0.05)', borderRadius: '20px', border: '1px solid rgba(251, 191, 36, 0.1)' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={18} className="text-gold" />
              </motion.div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontStyle: 'italic', fontWeight: 500 }}>{language === 'kn' ? 'ನಕ್ಷತ್ರಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Consulting the stars...'}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div style={{ 
        padding: '12px 20px 105px 20px',
        background: 'linear-gradient(to top, rgba(5, 5, 10, 0.95) 80%, rgba(5, 5, 10, 0.8) 100%)',
        borderTop: '1px solid rgba(251, 191, 36, 0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        flexShrink: 0
      }}>
        {/* Suggestions Row */}
        {!loading && messages.length < 3 && (
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            overflowX: 'auto', 
            paddingBottom: '12px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            {(language === 'kn' ? [
              "ನನ್ನ ಶನಿ ದಶೆ ಏನು ಹೇಳುತ್ತದೆ?",
              "ವೃತ್ತಿ ಬದಲಾವಣೆಯ ಮಾರ್ಗದರ್ಶನ?",
              "ಈ ವಾರದ ಅದೃಷ್ಟ ಬಣ್ಣಗಳು?",
              "ವೈದಿಕ ಪರಿಹಾರಗಳು?"
            ] : [
              "What does my Shani Dasha reveal?",
              "Career shift guidance?",
              "Lucky colors this week?",
              "Vedic focus remedies?"
            ]).map((text, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05, background: 'rgba(251, 191, 36, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setInput(text);
                }}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  background: 'rgba(251, 191, 36, 0.05)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  color: 'var(--accent-gold)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {text}
              </motion.button>
            ))}
          </div>
        )}

        <form 
          onSubmit={handleSend}
          style={{ 
            display: 'flex', 
            gap: '12px',
            background: 'rgba(30, 41, 59, 0.5)',
            padding: '8px',
            borderRadius: '20px',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            backdropFilter: 'blur(20px)',
            alignItems: 'center'
          }}
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'kn' ? "ನಕ್ಷತ್ರಗಳನ್ನು ಕೇಳಿ..." : "Ask the stars..."}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              padding: '12px 16px',
              color: 'white',
              outline: 'none',
              fontSize: '0.95rem'
            }}
          />

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--royal-gold)',
              border: 'none',
              borderRadius: '14px',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1,
              flexShrink: 0
            }}
          >
            <Send size={18} />
          </motion.button>
        </form>
        <p style={{
          fontSize: '0.65rem',
          color: 'rgba(255, 255, 255, 0.4)',
          textAlign: 'center',
          marginTop: '10px',
          fontStyle: 'italic'
        }}>
          {language === 'kn' 
            ? '⚠️ ಆಸ್ಟ್ರೋಸೇಜ್ AI ಒದಗಿಸುವ ಮಾಹಿತಿಯು ಮನರಂಜನೆಗಾಗಿ ಮಾತ್ರ ಮತ್ತು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯಿಂದ (AI) ರಚಿತವಾಗಿದೆ.' 
            : '⚠️ AstroSage AI insights are for entertainment purposes only and generated by artificial intelligence.'}
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
