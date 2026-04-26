'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { Sparkles, Star, ShieldCheck, Crown } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  const { language, t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const profile = localStorage.getItem('astroraga_profile');
    if (profile) {
      router.push('/dashboard');
    }
  }, [router]);

  const OrnamentalDivider = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', margin: '15px 0' }}>
      <div style={{ height: '1px', width: '40px', background: 'var(--royal-gold)', opacity: 0.3 }} />
      <Star size={10} className="text-gold" fill="currentColor" />
      <div style={{ height: '1px', width: '40px', background: 'var(--royal-gold)', opacity: 0.3 }} />
    </div>
  );

  return (
    <div className="spacer" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100%' }}>
      
      {/* Header Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center"
        style={{ marginBottom: '40px' }}
      >
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ 
              background: 'rgba(10, 10, 15, 0.8)',
              padding: '25px',
              borderRadius: '50%',
              border: '1.5px solid var(--accent-gold)',
            }}
          >
            <Crown size={40} className="gradient-gold" strokeWidth={1} />
          </motion.div>
        </div>
        
        <h1 style={{ fontSize: '2.8rem', marginBottom: '0.25rem' }} className="royal-title gradient-gold">
          AstroRaga
        </h1>
        <p style={{ 
          fontSize: '0.8rem', 
          color: 'var(--accent-gold)', 
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          opacity: 0.8
        }}>
          Royal Vedic Sanctuary
        </p>
      </motion.div>

      {/* Center Action Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <OrnamentalDivider />
        
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(251, 191, 36, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          className="action-button royal-title"
          onClick={() => router.push('/profile')}
          style={{ 
            padding: '24px 70px', 
            fontSize: '1.2rem', 
            borderRadius: '50px',
            margin: '20px 0',
            boxShadow: '0 15px 45px rgba(0,0,0,0.6)'
          }}
        >
          {t.enter}
        </motion.button>

        <OrnamentalDivider />
      </motion.div>

      {/* Footer / Features Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{ marginTop: '50px', width: '100%', textAlign: 'center' }}
      >
        <p style={{ 
          fontSize: '0.95rem', 
          color: 'var(--text-main)', 
          marginBottom: '30px',
          lineHeight: '1.6',
          fontStyle: 'italic',
          opacity: 0.8,
          maxWidth: '300px',
          margin: '0 auto 30px auto'
        }}>
          {t.tagline}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '12px', border: '1px solid rgba(251, 191, 36, 0.1)' }}>
            <ShieldCheck size={16} className="text-gold mb-1" style={{ margin: '0 auto 4px auto' }} />
            <p style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', fontWeight: 700 }}>AUTHENTIC</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '12px', border: '1px solid rgba(251, 191, 36, 0.1)' }}>
            <Sparkles size={16} className="text-gold mb-1" style={{ margin: '0 auto 4px auto' }} />
            <p style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', fontWeight: 700 }}>DIVINE</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: '24px', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-gold)' }}
      >
        ESTABLISHED IN THE COSMOS
      </motion.div>
    </div>
  );
}
