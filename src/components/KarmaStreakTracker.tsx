'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Award, CheckCircle2, Sparkles, Shield, Compass, Zap, Heart } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export interface KarmaStreakData {
  streakCount: number;
  lastCompletedDate: string;
  completedDates: string[];
  karmaPoints: number;
}

const STORAGE_KEY = 'astroraga_karma_streak';

function getLocalDateString(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

export default function KarmaStreakTracker({ rashi, nakshatra }: { rashi?: string; nakshatra?: string }) {
  const { t, language } = useLanguage();
  const [streakData, setStreakData] = useState<KarmaStreakData>({
    streakCount: 0,
    lastCompletedDate: '',
    completedDates: [],
    karmaPoints: 0,
  });
  const [justCompleted, setJustCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const todayStr = getLocalDateString(0);
  const yesterdayStr = getLocalDateString(-1);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: KarmaStreakData = JSON.parse(saved);
        // Validate streak continuity
        let validStreak = parsed.streakCount || 0;
        if (parsed.lastCompletedDate !== todayStr && parsed.lastCompletedDate !== yesterdayStr) {
          validStreak = 0; // Streak broken if missed yesterday
        }
        setStreakData({
          streakCount: validStreak,
          lastCompletedDate: parsed.lastCompletedDate || '',
          completedDates: parsed.completedDates || [],
          karmaPoints: parsed.karmaPoints || 0,
        });
      }
    } catch (e) {
      console.error('Error loading karma streak', e);
    }
  }, [todayStr, yesterdayStr]);

  const isCompletedToday = streakData.lastCompletedDate === todayStr;

  const handleCompleteRitual = () => {
    if (isCompletedToday) return;

    const newStreak = streakData.lastCompletedDate === yesterdayStr 
      ? streakData.streakCount + 1 
      : 1;

    const updatedDates = Array.from(new Set([...streakData.completedDates, todayStr]));
    const updatedPoints = streakData.karmaPoints + 15;

    const updated: KarmaStreakData = {
      streakCount: newStreak,
      lastCompletedDate: todayStr,
      completedDates: updatedDates,
      karmaPoints: updatedPoints,
    };

    setStreakData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setJustCompleted(true);

    setTimeout(() => {
      setJustCompleted(false);
    }, 4000);
  };

  // Determine Spiritual Rank
  const getSpiritualTier = (points: number) => {
    if (language === 'kn') {
      if (points >= 300) return { rank: 'ದೈವಿಕ ಋಷಿ', tier: 'Tier IV', desc: 'ಪೂರ್ಣ ಜ್ಯೋತಿಷ್ಯ ಸಾಮರಸ್ಯ' };
      if (points >= 150) return { rank: 'ಕರ್ಮ ಯೋಗಿ', tier: 'Tier III', desc: 'ಉತ್ತಮ ನಕ್ಷತ್ರ ಬಲ' };
      if (points >= 50) return { rank: 'ನಕ್ಷತ್ರ ಸಾಧಕ', tier: 'Tier II', desc: 'ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿ ಜಾಗೃತ' };
      return { rank: 'ಆರಂಭಿಕ ಸಾಧಕ', tier: 'Tier I', desc: 'ದೈನಂದಿನ ಪಯಣ ಪ್ರಾರಂಭ' };
    } else {
      if (points >= 300) return { rank: 'Vedic Rishi', tier: 'Tier IV', desc: 'Cosmic Mastery' };
      if (points >= 150) return { rank: 'Karma Harmonizer', tier: 'Tier III', desc: 'Deep Cosmic Alignment' };
      if (points >= 50) return { rank: 'Cosmic Initiate', tier: 'Tier II', desc: 'Awakened Energy' };
      return { rank: 'Seeker', tier: 'Tier I', desc: 'Embarking on the Path' };
    }
  };

  const spiritualInfo = getSpiritualTier(streakData.karmaPoints);

  // Generate last 7 days for the streak track
  const daysList = [-6, -5, -4, -3, -2, -1, 0].map((offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString(language === 'kn' ? 'kn-IN' : 'en-US', { weekday: 'narrow' });
    const isCompleted = streakData.completedDates.includes(dateStr);
    const isToday = offset === 0;
    return { dateStr, dayLabel, isCompleted, isToday };
  });

  // Daily Lucky Anchors based on day of week & rashi
  const dayIndex = new Date().getDay();
  const luckyColors = [
    { en: 'Ruby Red / Gold', kn: 'ಕೆಂಪು / ಬಂಗಾರ', planet: 'Surya (Sun)' },
    { en: 'Silver / Pearl White', kn: 'ಬೆಳ್ಳಿ / ಮುತ್ತಿನ ಬಿಳಿ', planet: 'Chandra (Moon)' },
    { en: 'Coral Red / Vermilion', kn: 'ಹವಳ ಕೆಂಪು / ಕೇಸರಿ', planet: 'Mangala (Mars)' },
    { en: 'Emerald Green', kn: 'ಪಚ್ಚೆ ಹಸಿರು', planet: 'Budha (Mercury)' },
    { en: 'Saffron / Yellow', kn: 'ಹಳದಿ / ಕೇಸರಿ', planet: 'Guru (Jupiter)' },
    { en: 'Diamond White / Light Blue', kn: 'ಬಿಳಿ / ತಿಳಿ ನೀಲಿ', planet: 'Shukra (Venus)' },
    { en: 'Midnight Blue / Navy', kn: 'ಕಡು ನೀಲಿ / ಕಪ್ಪು', planet: 'Shani (Saturn)' }
  ];
  const todayColor = luckyColors[dayIndex];
  const luckyNumber = ((dayIndex * 3 + 4) % 9) + 1;
  const directions = language === 'kn' 
    ? ['ಪೂರ್ವ (East)', 'ಈಶಾನ್ಯ (North-East)', 'ಉತ್ತರ (North)', 'ವಾಯುವ್ಯ (North-West)', 'ಪಶ್ಚಿಮ (West)', 'ದಕ್ಷಿಣ (South)', 'ಆಗ್ನೇಯ (South-East)']
    : ['East', 'North-East', 'North', 'North-West', 'West', 'South', 'South-East'];
  const todayDirection = directions[dayIndex % directions.length];

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
      
      {/* 1. Karma Streak & Rank Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(30, 25, 15, 0.85) 0%, rgba(15, 15, 25, 0.95) 100%)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '20px',
          padding: '18px 16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(251, 191, 36, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glow orb */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.div
              animate={{ 
                scale: streakData.streakCount > 0 ? [1, 1.15, 1] : 1,
                filter: streakData.streakCount > 0 ? ['drop-shadow(0 0 4px #f59e0b)', 'drop-shadow(0 0 10px #fbbf24)', 'drop-shadow(0 0 4px #f59e0b)'] : 'none'
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: streakData.streakCount > 0 
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
                  : 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: streakData.streakCount > 0 ? '#1e1b4b' : 'var(--text-muted)'
              }}
            >
              <Flame size={24} fill={streakData.streakCount > 0 ? '#1e1b4b' : 'none'} />
            </motion.div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span className="royal-title gradient-gold" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                  {streakData.streakCount}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.daysCount} {t.streak}
                </span>
              </div>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: 0 }}>
                {spiritualInfo.rank} • {spiritualInfo.tier}
              </p>
            </div>
          </div>

          <div style={{
            textAlign: 'right',
            background: 'rgba(251, 191, 36, 0.08)',
            padding: '6px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(251, 191, 36, 0.18)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
              <Sparkles size={13} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                {streakData.karmaPoints}
              </span>
            </div>
            <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.karmaPoints}
            </span>
          </div>
        </div>

        {/* 7-Day Rolling Calendar Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '14px',
          padding: '10px 8px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {daysList.map((day, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
              <span style={{ 
                fontSize: '0.62rem', 
                color: day.isToday ? 'var(--accent-gold)' : 'var(--text-muted)',
                fontWeight: day.isToday ? 800 : 500
              }}>
                {day.dayLabel}
              </span>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: day.isCompleted 
                  ? 'var(--royal-gold)' 
                  : day.isToday 
                    ? 'rgba(251, 191, 36, 0.12)' 
                    : 'rgba(255, 255, 255, 0.04)',
                border: day.isToday 
                  ? '1.5px solid var(--accent-gold)' 
                  : day.isCompleted 
                    ? '1px solid #f59e0b' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: day.isCompleted ? '0 0 10px rgba(251, 191, 36, 0.4)' : 'none'
              }}>
                {day.isCompleted ? (
                  <CheckCircle2 size={15} color="#000" />
                ) : (
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: day.isToday ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.15)'
                  }} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Status / Encouragement */}
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={12} color="var(--accent-gold)" />
          <span style={{ fontSize: '0.68rem', color: isCompletedToday ? '#4ade80' : 'rgba(255, 255, 255, 0.7)' }}>
            {isCompletedToday 
              ? (language === 'kn' ? '✓ ಇಂದಿನ ದೈವಿಕ ಕರ್ಮ ಪೂರ್ಣಗೊಂಡಿದೆ. ನಕ್ಷತ್ರಗಳು ನಿಮ್ಮೊಂದಿಗೆ ಇವೆ!' : '✓ Today’s ritual is complete. Your cosmic harmony is elevated!') 
              : (language === 'kn' ? 'ಇಂದಿನ ಪರಿಹಾರ ಪೂರ್ಣಗೊಳಿಸಿ ಸರಣಿಯನ್ನು ಜೀವಂತವಾಗಿಡಿ (+15 ಕರ್ಮ ಪುಣ್ಯ)' : 'Complete today’s ritual to maintain your streak (+15 Karma)')}
          </span>
        </div>
      </div>

      {/* 2. Interactive Complete Ritual Button */}
      <AnimatePresence>
        {justCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.3) 100%)',
              border: '1px solid var(--accent-gold)',
              borderRadius: '16px',
              padding: '12px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={18} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
              {language === 'kn' ? '🎉 ಕರ್ಮ ಪುಣ್ಯ +15 ಹೆಚ್ಚಾಗಿದೆ! ಸರಣಿ ಮುಂದುವರಿದಿದೆ!' : '🎉 +15 Karma Merit Acquired! Streak extended!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={!isCompletedToday ? { scale: 1.02, boxShadow: '0 0 25px rgba(251, 191, 36, 0.35)' } : {}}
        whileTap={!isCompletedToday ? { scale: 0.98 } : {}}
        onClick={handleCompleteRitual}
        disabled={isCompletedToday}
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: '16px',
          background: isCompletedToday 
            ? 'rgba(34, 197, 94, 0.12)' 
            : 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.08) 100%)',
          border: isCompletedToday 
            ? '1px solid rgba(34, 197, 94, 0.4)' 
            : '1px solid rgba(251, 191, 36, 0.4)',
          color: isCompletedToday ? '#4ade80' : 'var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: isCompletedToday ? 'default' : 'pointer',
          fontFamily: 'var(--font-royal)',
          fontSize: '0.88rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 700,
          transition: 'all 0.3s ease'
        }}
      >
        {isCompletedToday ? (
          <>
            <CheckCircle2 size={18} color="#4ade80" />
            {t.remedyCompleted}
          </>
        ) : (
          <>
            <Sparkles size={18} />
            {t.completeRemedy} (+15)
          </>
        )}
      </motion.button>

      {/* 3. Daily Cosmic Anchors (Lucky Triggers) */}
      <div 
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(251, 191, 36, 0.15)',
          borderRadius: '18px',
          padding: '14px 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {language === 'kn' ? 'ಅದೃಷ್ಟ ಬಣ್ಣ' : 'Lucky Color'}
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
            {language === 'kn' ? todayColor.kn.split('/')[0] : todayColor.en.split('/')[0]}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', borderLeft: '1px solid rgba(255, 255, 255, 0.08)', borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {language === 'kn' ? 'ಅದೃಷ್ಟ ಸಂಖ್ಯೆ' : 'Lucky Number'}
          </span>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
            {luckyNumber}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {language === 'kn' ? 'ಶುಭ ದಿಕ್ಕು' : 'Lucky Direction'}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
            {todayDirection.split(' ')[0]}
          </span>
        </div>
      </div>

    </div>
  );
}
