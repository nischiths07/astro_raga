'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, TrendingUp, Users, Sparkles, Heart } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="container-full" style={{ paddingBottom: '100px' }}>
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
            AstroRaga is currently in its **Sacred Alpha Phase**. We are constantly refining our celestial algorithms. This journey is under active development and not yet complete.
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
