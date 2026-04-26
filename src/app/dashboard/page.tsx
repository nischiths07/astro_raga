'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { LogOut, RefreshCw, Star, Compass, Info, Home, User, MessageSquare } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState(true);

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

  const fetchPrediction = async (userProfile: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userProfile, language }),
      });
      const data = await response.json();
      if (data.error && data.details) {
        setPrediction(`${data.error}\n\nCosmic Detail: ${data.details}`);
      } else {
        setPrediction(data.prediction || data.error);
      }
    } catch (err) {
      setPrediction("Failed to connect to the cosmos. Check your internet or API key.");
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
    <div style={{ paddingBottom: '100px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingTop: '12px' }}>
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <h2 className="gradient-gold royal-title" style={{ fontSize: '1.8rem' }}>{t.dashboard}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome, {profile.name}</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout} 
          className="secondary-button" 
          style={{ padding: '12px', borderRadius: '14px', color: '#ff6b6b' }}
        >
          <LogOut size={20} />
        </motion.button>
      </header>

      {/* Profile Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel" 
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Compass size={24} className="gradient-gold" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{t.rashiLabel}</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{profile.rashi}</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel" 
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Star size={24} className="gradient-gold" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{t.nakshatraLabel}</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{profile.nakshatra} (P{profile.pada})</span>
        </motion.div>
      </div>

      {/* Prediction Main Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel text-center" 
            style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <RefreshCw size={56} className="gradient-gold" strokeWidth={1.5} />
            </motion.div>
            <p className="gradient-gold" style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              {t.loading}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="prediction"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel" 
            style={{ minHeight: '350px', padding: '32px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '10px', borderRadius: '12px' }}>
                <Info size={24} className="text-gold" />
              </div>
              <h3 className="title-lg" style={{ fontSize: '1.4rem' }}>{t.predictionTitle}</h3>
            </div>
            
            <p style={{ 
              lineHeight: '1.9', 
              fontSize: '1.15rem', 
              color: 'rgba(248, 250, 252, 0.95)', 
              whiteSpace: 'pre-wrap',
              fontWeight: 400
            }}>
              {prediction}
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fetchPrediction(profile)} 
              className="action-button" 
              style={{ marginTop: '40px', width: '100%', borderRadius: '18px' }}
            >
              <RefreshCw size={20} /> Refresh Insight
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
}
