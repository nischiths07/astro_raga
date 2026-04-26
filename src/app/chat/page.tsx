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
      
      if (!response.ok) {
        throw new Error('API unstable');
      }

      const data = await response.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error('Empty response');
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Forgive me, the cosmic connection was momentarily severed. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingBottom: '80px' }}>
      <header style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(251, 191, 36, 0.1)' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="gradient-gold" style={{ fontSize: '1.2rem', fontWeight: 700 }}>AstroSage AI</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>Cosmic Agent Online</p>
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '14px 18px',
                borderRadius: '20px',
                background: msg.role === 'user' ? 'var(--accent-gold)' : 'rgba(30, 41, 59, 0.5)',
                color: msg.role === 'user' ? 'black' : 'white',
                border: msg.role === 'user' ? 'none' : '1px solid rgba(251, 191, 36, 0.1)',
                boxShadow: msg.role === 'user' ? '0 4px 12px rgba(251, 191, 36, 0.3)' : 'none',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', opacity: 0.7, fontSize: '0.7rem' }}>
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                <span>{msg.role === 'user' ? 'You' : 'AstroSage'}</span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{msg.content}</p>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '15px' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={18} className="text-gold" />
              </motion.div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontStyle: 'italic' }}>AstroSage is consulting the stars...</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={handleSend}
        style={{ 
          padding: '16px', 
          background: 'rgba(15, 23, 42, 0.8)', 
          backdropFilter: 'blur(10px)',
          display: 'flex', 
          gap: '12px',
          position: 'fixed',
          bottom: '80px',
          left: 0,
          right: 0
        }}
      >
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the stars..."
          style={{
            flex: 1,
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '14px',
            padding: '12px 16px',
            color: 'white',
            outline: 'none'
          }}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={loading}
          style={{
            background: 'var(--accent-gold)',
            border: 'none',
            borderRadius: '14px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            cursor: 'pointer'
          }}
        >
          <Send size={20} />
        </motion.button>
      </form>

      <BottomNav />
    </div>
  );
}
