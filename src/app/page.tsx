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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '8px 0' }}>
      <div style={{ height: '1px', width: '35px', background: 'var(--royal-gold)', opacity: 0.3 }} />
      <Star size={10} className="text-gold" fill="currentColor" />
      <div style={{ height: '1px', width: '35px', background: 'var(--royal-gold)', opacity: 0.3 }} />
    </div>
  );

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: 'inherit',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '36px 24px 28px 24px',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}
    >
      
      {/* 1. Top Section: Crest & Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
          <motion.div
            animate={{ 
              scale: [1, 1.04, 1],
              filter: [
                'drop-shadow(0 0 12px rgba(251, 191, 36, 0.25))', 
                'drop-shadow(0 0 28px rgba(251, 191, 36, 0.55))', 
                'drop-shadow(0 0 12px rgba(251, 191, 36, 0.25))'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img 
              src="/icon.png" 
              alt="AstroRaga Icon" 
              style={{ 
                width: '105px', 
                height: '105px', 
                borderRadius: '24px',
                border: '1px solid rgba(251, 191, 36, 0.35)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
              }} 
            />
          </motion.div>
        </div>
        
        <h1 style={{ fontSize: '2.4rem', marginBottom: '4px', letterSpacing: '0.08em' }} className="royal-title gradient-gold">
          AstroRaga
        </h1>
        <p style={{ 
          fontSize: '0.72rem', 
          color: 'var(--accent-gold)', 
          letterSpacing: '0.3em',
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
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <OrnamentalDivider />
        
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(251, 191, 36, 0.65)' }}
          whileTap={{ scale: 0.96 }}
          className="action-button royal-title"
          onClick={() => router.push('/profile')}
          style={{ 
            width: '100%',
            maxWidth: '320px',
            padding: '18px 24px', 
            fontSize: '1.05rem', 
            borderRadius: '50px',
            boxShadow: '0 12px 35px rgba(245, 158, 11, 0.45)'
          }}
        >
          {t.enter}
        </motion.button>

        <div
          style={{
            fontSize: '0.65rem',
            color: 'var(--accent-gold)',
            background: 'rgba(251, 191, 36, 0.08)',
            padding: '5px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            letterSpacing: '0.1em',
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
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <p style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-main)', 
          lineHeight: '1.5',
          fontStyle: 'italic',
          opacity: 0.85,
          maxWidth: '300px',
          margin: 0
        }}>
          {t.tagline}
        </p>

        {/* Feature Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', maxWidth: '320px' }}>
          <div className="glass-panel" style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={16} className="text-gold" />
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '0.08em' }}>AUTHENTIC</span>
          </div>
          
          <div className="glass-panel" style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Sparkles size={16} className="text-gold" />
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '0.08em' }}>DIVINE</span>
          </div>
        </div>

        {/* Entertainment & Creator Attribution */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
          <div style={{
            fontSize: '0.62rem',
            color: 'rgba(255, 255, 255, 0.65)',
            background: 'rgba(251, 191, 36, 0.04)',
            padding: '6px 12px',
            borderRadius: '10px',
            border: '1px solid rgba(251, 191, 36, 0.12)',
            maxWidth: '320px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            lineHeight: '1.4',
            textAlign: 'left'
          }}>
            <ShieldCheck size={14} style={{ flexShrink: 0, color: 'var(--accent-gold)' }} />
            <span>The universe guides, but your righteous choices shape your karma.</span>
          </div>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(251, 191, 36, 0.6)', marginTop: '2px', fontWeight: 600 }}>
            ASTRORAGA • BY NISC07
          </span>
        </div>
      </motion.div>
    </div>
  );
}
