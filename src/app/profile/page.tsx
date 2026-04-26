'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { ArrowLeft, Moon, Star, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Profile() {
  const { t } = useLanguage();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    rashi: '',
    nakshatra: '',
    pada: '1',
    birthDate: '',
    birthTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('astroraga_profile', JSON.stringify(formData));
    router.push('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '24px 0 120px 0' }}>
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()} 
        className="secondary-button mb-8" 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}
      >
        <ArrowLeft size={18} /> {t.back}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel"
      >
        <div className="mb-8">
          <h2 className="title-lg gradient-gold royal-title mb-2">{t.profileTitle}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Provide your birth details to unlock your cosmic map.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="premium-input-group">
            <label className="premium-label"><User size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {t.nameLabel}</label>
            <input 
              type="text" 
              name="name" 
              required 
              className="premium-input" 
              placeholder="e.g. Nischith" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="premium-input-group">
              <label className="premium-label"><Moon size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {t.rashiLabel}</label>
              <select name="rashi" required className="premium-input" value={formData.rashi} onChange={handleChange}>
                <option value="" disabled>Select</option>
                {t.rashiList.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="premium-input-group">
              <label className="premium-label"><Star size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {t.nakshatraLabel}</label>
              <select name="nakshatra" required className="premium-input" value={formData.nakshatra} onChange={handleChange}>
                <option value="" disabled>Select</option>
                {t.nakshatraList.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div className="premium-input-group" style={{ width: '40%' }}>
            <label className="premium-label">{t.padaLabel}</label>
            <select name="pada" required className="premium-input" value={formData.pada} onChange={handleChange}>
              {[1, 2, 3, 4].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
            <div className="premium-input-group">
              <label className="premium-label"><Calendar size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {t.birthDateLabel}</label>
              <input 
                type="date" 
                name="birthDate" 
                required 
                className="premium-input" 
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>

            <div className="premium-input-group">
              <label className="premium-label"><Clock size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {t.birthTimeLabel}</label>
              <input 
                type="time" 
                name="birthTime" 
                required 
                className="premium-input" 
                value={formData.birthTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="action-button"
            style={{ width: '100%', marginTop: '16px', borderRadius: '18px' }}
          >
            {t.saveProfile}
            <ChevronRight size={20} />
          </motion.button>
        </form>
      </motion.div>
      <BottomNav />
    </div>
  );
}
