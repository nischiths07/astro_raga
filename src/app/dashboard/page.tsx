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
                {prediction.split('\n').map((line, i) => (
                  <p key={i} style={{ marginBottom: line.startsWith('#') || line.includes('**') ? '24px' : '16px' }}>
                    {line.includes('**') ? (
                      <span className="gradient-gold royal-title" style={{ display: 'block', fontSize: '1.1rem', marginTop: i > 0 ? '12px' : '0' }}>
                        {line.replace(/\*\*/g, '').replace(/#/g, '')}
                      </span>
                    ) : line}
                  </p>
                ))}
              </div>
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
