'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { RefreshCw, Star, Sparkles, LogOut, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [prediction, setPrediction] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();

  useEffect(() => {
    const savedProfile = localStorage.getItem('astroraga_profile');
    if (!savedProfile) {
      router.push('/profile');
      return;
    }
    const parsedProfile = JSON.parse(savedProfile);
    setProfile(parsedProfile);
    
    fetchPrediction(parsedProfile);
  }, [router, language]);

  const fetchPrediction = async (profileData: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profileData, language }),
      });
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      setPrediction("The stars are clouded today. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('astroraga_profile');
    router.push('/');
  };

  if (!profile) return null;

  return (
    <div className="container-full">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingTop: '12px' }}>
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <h2 className="gradient-gold royal-title" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{t.dashboard}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Seeker: {profile.name}</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '10px', color: 'var(--text-muted)' }}
        >
          <LogOut size={18} />
        </motion.button>
      </header>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="spacer"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ color: 'var(--accent-gold)' }}
            >
              <Sparkles size={48} />
            </motion.div>
            <p className="royal-title gradient-gold" style={{ letterSpacing: '0.2em', fontSize: '0.9rem' }}>{t.loading}</p>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="spacer"
          >
            <div className="section-title">
              <Star size={12} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              Your Cosmic Insight
            </div>

            <div className="glass-panel" style={{ marginBottom: '32px' }}>
              <div style={{ 
                whiteSpace: 'pre-wrap', 
                fontSize: '1rem', 
                lineHeight: '1.8',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'var(--font-body)'
              }}>
                {prediction.split('\n').map((line, i) => {
                  if (line.includes('AstroSage Divine Remedy')) return null;
                  return (
                    <p key={i} style={{ marginBottom: line.startsWith('#') || line.includes('**') ? '24px' : '16px' }}>
                      {line.includes('**') ? (
                        <span className="gradient-gold royal-title" style={{ display: 'block', fontSize: '1.1rem', marginTop: i > 0 ? '12px' : '0' }}>
                          {line.replace(/\*\*/g, '').replace(/#/g, '')}
                        </span>
                      ) : line}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="section-title">Divine Remedy</div>
            <div style={{ perspective: '1000px', marginBottom: '40px' }}>
              <motion.div 
                onClick={() => setFlipped(!flipped)}
                initial={false}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
                style={{ 
                  width: '100%', 
                  height: '240px', 
                  position: 'relative', 
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer'
                }}
              >
                {/* Front of Card */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  background: 'var(--royal-gold)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                  boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)',
                  border: '4px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    border: '2px solid rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Sparkles size={40} color="black" />
                  </div>
                  <h3 style={{ color: 'black', fontFamily: 'var(--font-royal)', fontSize: '1.2rem', textAlign: 'center' }}>SEAL OF WISDOM</h3>
                  <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', marginTop: '8px' }}>TAP TO REVEAL RITUAL</p>
                </div>

                {/* Back of Card */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'rgba(30, 41, 59, 0.9)',
                  borderRadius: '24px',
                  padding: '24px',
                  border: '2px solid var(--accent-gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <div style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0.3 }}>
                    <Star size={16} color="var(--accent-gold)" />
                  </div>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.6', 
                    color: 'var(--accent-gold)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600
                  }}>
                    {prediction.split('Divine Remedy').pop()?.replace(/[*#]/g, '').trim() || "Chant 'Om' 108 times for spiritual clarity."}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fetchPrediction(profile)} 
              className="action-button" 
              style={{ width: '100%', marginBottom: '40px' }}
            >
              <RefreshCw size={18} /> Refresh Destiny
            </motion.button>

            <div style={{ textAlign: 'center', opacity: 0.3, fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '0.2em' }}>
              MADE WITH COSMIC ENERGY BY NISC_01
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
