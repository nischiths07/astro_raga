'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, User, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t.dashboard, path: '/dashboard' },
    { icon: MessageSquare, label: 'AI', path: '/chat' },
    { icon: User, label: t.profileTitle, path: '/profile' },
  ];

  return (
    <nav className="nav-bottom">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
          >
            <Icon size={24} />
            <span>{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-glow"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(251, 191, 36, 0.1)',
                  borderRadius: '12px',
                  zIndex: -1
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
