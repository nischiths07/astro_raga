'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { ChevronRight, ArrowLeft, UserCircle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Profile() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    rashi: 'Mesha',
    nakshatra: 'Ashwini',
    pada: '1',
    birthDate: '',
    birthTime: '',
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('astroraga_profile');
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('astroraga_profile', JSON.stringify(formData));
    router.push('/dashboard');
  };

  return (
    <div className="container-full">
      <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', paddingTop: '12px' }}>
        <motion.button 
          whileHover={{ x: -4 }}
          onClick={() => router.push('/')} 
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <ArrowLeft size={24} />
        </motion.button>
        <h2 className="title-lg gradient-gold royal-title">{t.profileTitle}</h2>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="spacer"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-title">Essential Details</div>
          
          <div className="glass-panel" style={{ marginBottom: '32px' }}>
            <div className="premium-input-group">
              <label className="premium-label">{t.nameLabel}</label>
              <input
                type="text"
                required
                className="premium-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="premium-input-group">
                <label className="premium-label">{t.rashiLabel}</label>
                <select
                  className="premium-input"
                  value={formData.rashi}
                  onChange={(e) => setFormData({ ...formData, rashi: e.target.value })}
                >
                  {t.rashiList.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="premium-input-group">
                <label className="premium-label">{t.nakshatraLabel}</label>
                <select
                  className="premium-input"
                  value={formData.nakshatra}
                  onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                >
                  {t.nakshatraList.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="premium-input-group">
              <label className="premium-label">{t.padaLabel}</label>
              <select
                className="premium-input"
                value={formData.pada}
                onChange={(e) => setFormData({ ...formData, pada: e.target.value })}
              >
                {['1', '2', '3', '4'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="section-title">Birth Timing</div>
          <div className="glass-panel" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="premium-input-group" style={{ marginBottom: 0 }}>
                <label className="premium-label">{t.birthDateLabel}</label>
                <input
                  type="date"
                  required
                  className="premium-input"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </div>

              <div className="premium-input-group" style={{ marginBottom: 0 }}>
                <label className="premium-label">{t.birthTimeLabel}</label>
                <input
                  type="time"
                  required
                  className="premium-input"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="action-button royal-title"
            style={{ width: '100%', marginBottom: '40px' }}
          >
            {t.saveProfile}
            <ChevronRight size={20} />
          </motion.button>
        </form>
      </motion.div>

      <div style={{ textAlign: 'center', opacity: 0.2, fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '0.2em', marginBottom: '20px' }}>
        ASTROSAGE DIVINE GATEWAY
      </div>

      <BottomNav />
    </div>
  );
}
