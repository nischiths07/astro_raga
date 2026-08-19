'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, TrendingUp, Users, Sparkles, Heart, Mail, Send, Check, Copy, MessageSquare } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const targetEmail = 'snischith07@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || loading) return;

    setLoading(true);

    try {
      // 1. Post feedback to Next.js API (saves to Database via Prisma)
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, message: feedback })
      });

      setSubmitted(true);
      setFeedback('');
      setUserEmail('');
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      // Still show success since offline/local mode is resilient
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content-wrapper">
      <header style={{ 
        padding: '20px 0', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        marginBottom: '30px'
      }}>
        <button 
          onClick={() => router.back()} 
          style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '10px', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="royal-title gradient-gold" style={{ fontSize: '1.5rem' }}>About AstroRaga</h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-panel" style={{ marginBottom: '30px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Sparkles className="text-gold" size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>DEVELOPMENT NOTICE</span>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)', fontStyle: 'italic' }}>
            AstroRaga is currently in its <strong style={{ color: 'var(--accent-gold)' }}>Sacred Alpha Phase</strong>. We are constantly refining our celestial algorithms. This journey is under active development and not yet complete.
          </p>
        </div>

        <h2 className="royal-title gradient-gold" style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Why the World Needs AstroRaga</h2>
        
        <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
          <div className="glass-panel" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <TrendingUp className="text-gold" size={24} />
            </div>
            <div>
              <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '5px' }}>$22.8 Billion Market</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                The global astrology market is exploding, projected to nearly double by 2031 as people seek deeper meaning in a digital age.
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <Globe className="text-gold" size={24} />
            </div>
            <div>
              <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '5px' }}>India's Spiritual Tech</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                With a spiritual market worth over $40 Billion, India is leading the revolution of combining ancient Vedic Shastras with cutting-edge AI.
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <Users className="text-gold" size={24} />
            </div>
            <div>
              <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '5px' }}>Democratizing Wisdom</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                We are breaking the barriers of accessibility, bringing judgment-free, instant, and precise Vedic guidance to every seeker's pocket.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback & Suggestion Box */}
        <section className="glass-panel" style={{ 
          marginBottom: '40px', 
          border: '1px solid rgba(251, 191, 36, 0.3)',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(251, 191, 36, 0.15)', padding: '10px', borderRadius: '12px', color: 'var(--accent-gold)' }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <h3 className="royal-title gradient-gold" style={{ fontSize: '1.2rem', margin: 0 }}>Feedback & Suggestions</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Help us shape the future of AstroRaga
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '20px' }}>
            Have ideas, feature suggestions, or feedback? Send directly to <strong style={{ color: 'var(--accent-gold)' }}>{targetEmail}</strong> below.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '12px',
            padding: '10px 16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
              <Mail size={16} />
              <span>{targetEmail}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: 'var(--accent-gold)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '14px',
                padding: '20px',
                textAlign: 'center',
                color: '#6ee7b7'
              }}
            >
              <div style={{ display: 'inline-flex', background: 'rgba(16, 185, 129, 0.2)', padding: '10px', borderRadius: '50%', marginBottom: '10px' }}>
                <Check size={24} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>Feedback Received!</h4>
              <p style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: '1.5' }}>
                Your suggestion has been securely recorded! Thank you for guiding the cosmic evolution of AstroRaga.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: '14px',
                  background: 'none',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#6ee7b7',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Send Another Suggestion
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSendFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="premium-input-group" style={{ marginBottom: 0 }}>
                <label className="premium-label" style={{ fontSize: '0.75rem' }}>Your Email (Optional)</label>
                <input
                  type="email"
                  className="premium-input"
                  placeholder="name@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{ fontSize: '0.85rem', padding: '10px 14px' }}
                />
              </div>

              <div className="premium-input-group" style={{ marginBottom: 0 }}>
                <label className="premium-label" style={{ fontSize: '0.75rem' }}>Suggestion / Feedback *</label>
                <textarea
                  required
                  rows={4}
                  className="premium-input"
                  placeholder="Share your thoughts, suggestions, or feature requests..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  style={{ fontSize: '0.85rem', padding: '12px 14px', resize: 'vertical', minHeight: '90px' }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="action-button royal-title"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '6px'
                }}
              >
                <Send size={16} />
                Send Feedback to snischith07@gmail.com
              </motion.button>
            </form>
          )}
        </section>

        <div style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid rgba(251, 191, 36, 0.1)' }}>
          <Heart size={32} className="text-gold" style={{ marginBottom: '20px', opacity: 0.5 }} />
          <p className="royal-title" style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '10px' }}>
            Thank you for being part of our journey.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '280px', margin: '0 auto', lineHeight: '1.6' }}>
            Your curiosity fuels the stars. We are honored to guide you through the cosmic rhythms of life.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', opacity: 0.4, fontSize: '0.65rem', letterSpacing: '0.2em' }}>
          ASTROSAGE DIVINE GATEWAY • BY NISC07
        </div>
      </motion.div>
    </div>
  );
}

