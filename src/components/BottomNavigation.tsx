'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, ListMusic } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNavigation() {
  const pathname = usePathname();

  const tabs = [
    {
      label: 'HOME',
      href: '/',
      icon: Home,
    },
    {
      label: 'TUNE',
      href: '/tune',
      icon: Sparkles,
      // Matches /tune or subpages
      isActive: (path: string) => path.startsWith('/tune'),
    },
    {
      label: 'SONGS',
      href: '/songs',
      icon: ListMusic,
      isActive: (path: string) => path.startsWith('/songs'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 bg-[#F8F9FD]/80 backdrop-blur-md border-t border-[rgba(80,84,120,0.12)] px-6 py-2.5 pb-safe flex justify-around items-center lg:hidden">
      {tabs.map((tab) => {
        const active = tab.isActive
          ? tab.isActive(pathname)
          : pathname === tab.href;

        const Icon = tab.icon;

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="relative py-1 flex flex-col items-center justify-center w-16 tap-highlight-transparent group"
            aria-label={tab.label}
          >
            {/* Visual indicator for active tab (soft glowing dot underneath or backing glow) */}
            {active && (
              <motion.div
                layoutId="activeNavBackground"
                className="absolute -inset-x-1 py-4 bg-gradient-to-r from-[#B9A7FF]/8 to-[#93C5FD]/8 rounded-2xl -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            <Icon
              className={`w-5 h-5 smooth-transition ${
                active
                  ? 'text-[#B9A7FF] scale-110'
                  : 'text-[#6E7180] group-hover:text-[#171725] group-active:scale-95'
              }`}
            />
            <span
              className={`text-[10px] tracking-wider font-title mt-1 font-semibold smooth-transition ${
                active ? 'text-[#171725]' : 'text-[#6E7180] group-hover:text-[#171725]'
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
