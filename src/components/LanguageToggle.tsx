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
      className="secondary-button language-toggle"
    >
      <Languages size={16} className="text-gold" />
      {t.switchLanguage}
    </motion.button>
  );
}
