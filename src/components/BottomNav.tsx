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
    { id: 'home', icon: Home, label: t.dashboard, path: '/dashboard', activePaths: ['/', '/dashboard'] },
    { id: 'chat', icon: MessageSquare, label: 'AstroSage', path: '/chat', activePaths: ['/chat'] },
    { id: 'profile', icon: User, label: t.profileTitle, path: '/profile', activePaths: ['/profile'] },
    { id: 'about', icon: Info, label: 'About', path: '/about', activePaths: ['/about'] },
  ];

  const handleNavigate = (item: typeof navItems[0]) => {
    if (item.id === 'home') {
      const profile = typeof window !== 'undefined' ? localStorage.getItem('astroraga_profile') : null;
      if (profile) {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } else {
      router.push(item.path);
    }
  };

  return (
    <nav className="nav-bottom">
      {navItems.map((item) => {
        const isActive = item.activePaths.includes(pathname);
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item)}
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
            <span style={{ fontSize: '0.62rem' }}>{item.label}</span>
            
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  style={{
                    position: 'absolute',
                    inset: '3px',
                    background: 'rgba(251, 191, 36, 0.12)',
                    borderRadius: '16px',
                    zIndex: -1,
                    border: '1px solid rgba(251, 191, 36, 0.28)',
                    boxShadow: '0 0 12px rgba(251, 191, 36, 0.15) inset'
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
