'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Send, Sparkles, User, Bot, ArrowLeft } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('astroraga_profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setMessages([
        { 
          role: 'assistant', 
          content: `Greetings, ${parsed.name}. I am AstroSage. The stars have much to tell us today. How may I guide you on your journey through the cosmos?` 
        }
      ]);
    } else {
      router.push('/profile');
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          profile 
        }),
      });
      
      const data = await response.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error('Empty response');
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Forgive me, the cosmic connection was momentarily severed. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-full" style={{ padding: 0, height: '100dvh', overflow: 'hidden' }}>
      <header style={{ 
        padding: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        borderBottom: '1px solid rgba(251, 191, 36, 0.1)',
        background: 'rgba(5, 5, 10, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="gradient-gold royal-title" style={{ fontSize: '1.2rem' }}>AstroSage AI</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase' }}>Connected</span>
          </div>
        </div>
      </header>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        paddingBottom: '160px' 
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: 0.7, fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {msg.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                <span>{msg.role === 'user' ? 'Seeker' : 'AstroSage'}</span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{msg.content}</p>
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
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontStyle: 'italic', fontWeight: 500 }}>Consulting the stars...</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '80px', 
        left: 0, 
        right: 0, 
        padding: '10px 20px 20px 20px',
        background: 'linear-gradient(to top, var(--bg-deep) 90%, transparent)',
        zIndex: 10
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
            {[
              "What does my Shani Dasha reveal?",
              "Career shift guidance?",
              "Lucky colors this week?",
              "Vedic focus remedies?"
            ].map((text, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05, background: 'rgba(251, 191, 36, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setInput(text);
                  // Optional: Automatically send after a small delay
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
            backdropFilter: 'blur(20px)'
          }}
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the stars..."
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
              opacity: loading ? 0.5 : 1
            }}
          >
            <Send size={18} />
          </motion.button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}
