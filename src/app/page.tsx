'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { Sparkles, Star, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  const { language, t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromNav = params.get('fromNav');
    if (fromNav === 'true') {
      return;
    }
    const profile = localStorage.getItem('astroraga_profile');
    if (profile) {
      router.push('/dashboard');
    }
  }, [router]);

  const OrnamentalDivider = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '4px 0' }}>
      <div style={{ height: '1px', width: '30px', background: 'var(--royal-gold)', opacity: 0.3 }} />
      <Star size={9} className="text-gold" fill="currentColor" />
      <div style={{ height: '1px', width: '30px', background: 'var(--royal-gold)', opacity: 0.3 }} />
    </div>
  );

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        flex: 1,
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 'clamp(20px, 4vh, 36px) clamp(16px, 4vw, 24px) calc(88px + env(safe-area-inset-bottom, 12px)) clamp(16px, 4vw, 24px)',
        textAlign: 'center',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >
      
      {/* 1. Top Section: Crest & Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto 0 8px 0' }}
      >
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '12px' }}>
          <motion.div
            animate={{ 
              scale: [1, 1.04, 1],
              filter: [
                'drop-shadow(0 0 10px rgba(251, 191, 36, 0.25))', 
                'drop-shadow(0 0 24px rgba(251, 191, 36, 0.55))', 
                'drop-shadow(0 0 10px rgba(251, 191, 36, 0.25))'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img 
              src="/icon.png" 
              alt="AstroRaga Icon" 
              style={{ 
                width: 'clamp(80px, 20vw, 100px)', 
                height: 'clamp(80px, 20vw, 100px)', 
                borderRadius: '22px',
                border: '1px solid rgba(251, 191, 36, 0.35)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
              }} 
            />
          </motion.div>
        </div>
        
        <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.4rem)', marginBottom: '2px', letterSpacing: '0.08em' }} className="royal-title gradient-gold">
          AstroRaga
        </h1>
        <p style={{ 
          fontSize: 'clamp(0.65rem, 2vw, 0.72rem)', 
          color: 'var(--accent-gold)', 
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          fontWeight: 700,
          opacity: 0.85
        }}>
          Royal Vedic Sanctuary
        </p>
      </motion.div>

      {/* 2. Middle Action & Gateway Area (Equally Spaced) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '10px',
          margin: 'auto 0'
        }}
      >
        <OrnamentalDivider />
        
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(251, 191, 36, 0.65)' }}
          whileTap={{ scale: 0.96 }}
          className="action-button royal-title"
          onClick={() => router.push('/profile')}
          style={{ 
            width: '100%',
            maxWidth: '300px',
            padding: '16px 20px', 
            fontSize: 'clamp(0.95rem, 3.5vw, 1.05rem)', 
            borderRadius: '50px',
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.45)'
          }}
        >
          {t.enter}
        </motion.button>

        <div
          style={{
            fontSize: 'clamp(0.6rem, 2vw, 0.65rem)',
            color: 'var(--accent-gold)',
            background: 'rgba(251, 191, 36, 0.08)',
            padding: '4px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={11} />
          No Ads • No Fees • Always Free
          <Sparkles size={11} />
        </div>

        <OrnamentalDivider />
      </motion.div>

      {/* 3. Bottom Features & Assurance Section (Equally Spaced) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '10px',
          margin: '8px 0 auto 0'
        }}
      >
        <p style={{ 
          fontSize: 'clamp(0.78rem, 2.5vw, 0.85rem)', 
          color: 'var(--text-main)', 
          lineHeight: '1.4',
          fontStyle: 'italic',
          opacity: 0.85,
          maxWidth: '300px',
          margin: 0
        }}>
          {t.tagline}
        </p>

        {/* Feature Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%', maxWidth: '300px' }}>
          <div className="glass-panel" style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={15} className="text-gold" />
            <span style={{ fontSize: '0.62rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '0.08em' }}>AUTHENTIC</span>
          </div>
          
          <div className="glass-panel" style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Sparkles size={15} className="text-gold" />
            <span style={{ fontSize: '0.62rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '0.08em' }}>DIVINE</span>
          </div>
        </div>

        {/* Entertainment & Creator Attribution */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
          <div style={{
            fontSize: '0.6rem',
            color: 'rgba(255, 255, 255, 0.65)',
            background: 'rgba(251, 191, 36, 0.04)',
            padding: '5px 10px',
            borderRadius: '8px',
            border: '1px solid rgba(251, 191, 36, 0.12)',
            maxWidth: '300px',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            lineHeight: '1.35',
            textAlign: 'left'
          }}>
            <ShieldCheck size={13} style={{ flexShrink: 0, color: 'var(--accent-gold)' }} />
            <span>The universe guides, but your righteous choices shape your karma.</span>
          </div>
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(251, 191, 36, 0.6)', marginTop: '2px', fontWeight: 600 }}>
            ASTRORAGA • BY NISC07
          </span>
        </div>
      </motion.div>
    </div>
  );
}
