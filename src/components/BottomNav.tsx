'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, User, MessageSquare, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t.dashboard, path: '/dashboard' },
    { icon: MessageSquare, label: 'AstroSage', path: '/chat' },
    { icon: User, label: t.profileTitle, path: '/profile' },
    { icon: Info, label: 'About', path: '/about' },
  ];

  return (
    <nav className="nav-bottom">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              outline: 'none',
              position: 'relative',
              flex: 1,
              zIndex: 1
            }}
          >
            <Icon size={20} style={{ marginBottom: '2px' }} />
            <span style={{ fontSize: '0.6rem' }}>{item.label}</span>
            
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    position: 'absolute',
                    inset: '4px',
                    background: 'rgba(251, 191, 36, 0.1)',
                    borderRadius: '20px',
                    zIndex: -1,
                    border: '1px solid rgba(251, 191, 36, 0.15)'
                  }}
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </nav>
  );
}
