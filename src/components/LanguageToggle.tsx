'use client';

import { useLanguage } from './LanguageContext';
import { Languages } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { toggleLanguage, t } = useLanguage();

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="secondary-button"
      style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        zIndex: 1000,
        fontSize: '0.85rem',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderWidth: '1px'
      }}
    >
      <Languages size={16} className="text-gold" />
      {t.switchLanguage}
    </motion.button>
  );
}
