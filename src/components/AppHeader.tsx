'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Menu, X, Info, Shield, HelpCircle, FileText, Music } from 'lucide-react';

interface AppHeaderProps {
  showBack?: boolean;
  onBackClick?: () => void;
}

export default function AppHeader({ showBack, onBackClick }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we should show back button automatically (if not explicitly overridden)
  const shouldShowBack = showBack !== undefined ? showBack : pathname !== '/';

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F9FD]/80 backdrop-blur-md border-b border-[rgba(80,84,120,0.12)] px-4 py-3">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between relative">
        
        {/* Left Side: Back button + Logo (Desktop layout) */}
        <div className="flex items-center gap-3">
          {shouldShowBack && (
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 border border-[rgba(80,84,120,0.08)] shadow-sm hover:scale-105 active:scale-95 smooth-transition"
              aria-label="戻る"
            >
              <ArrowLeft className="w-5 h-5 text-[#171725]" />
            </button>
          )}
          
          {/* Logo Typography (Hidden on mobile if back is shown to keep central logo spacing) */}
          <Link 
            href="/" 
            className={`flex flex-col items-start select-none ${shouldShowBack ? 'hidden lg:flex' : 'flex'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="font-title tracking-[0.2em] font-light text-[10px] text-[#6E7180] leading-none uppercase">
              IKONOIJOY
            </div>
            <div className="font-title tracking-[0.3em] font-medium text-lg text-[#171725] mt-0.5 uppercase leading-none">
              TUNE
            </div>
            <div className="text-[7px] text-[#6E7180]/60 tracking-[0.1em] font-light mt-1 hidden lg:block">
              Music for your moment.
            </div>
          </Link>
        </div>

        {/* Center Logo placeholder for Mobile ONLY when back button is shown */}
        {shouldShowBack && (
          <Link 
            href="/" 
            className="lg:hidden absolute left-1/2 -translate-x-1/2 flex flex-col items-center select-none" 
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="font-title tracking-[0.2em] font-light text-[10px] text-[#6E7180] leading-none uppercase">
              IKONOIJOY
            </div>
            <div className="font-title tracking-[0.3em] font-medium text-lg text-[#171725] mt-0.5 uppercase leading-none">
              TUNE
            </div>
          </Link>
        )}

        {/* Right Side Navigations for Desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link 
            href="/tune" 
            className={`text-xs font-bold tracking-widest hover:text-[#B9A7FF] smooth-transition ${
              pathname === '/tune' ? 'text-[#B9A7FF]' : 'text-[#6E7180]'
            }`}
          >
            TUNE
          </Link>
          <Link 
            href="/about" 
            className={`text-xs font-bold tracking-widest hover:text-[#F9A8D4] smooth-transition ${
              pathname === '/about' ? 'text-[#F9A8D4]' : 'text-[#6E7180]'
            }`}
          >
            ABOUT
          </Link>
          <Link 
            href="/contact" 
            className={`text-xs font-bold tracking-widest hover:text-[#9FE7D7] smooth-transition ${
              pathname === '/contact' ? 'text-[#9FE7D7]' : 'text-[#6E7180]'
            }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Mobile Hamburger menu trigger */}
        <div className="w-10 flex justify-end lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 border border-[rgba(80,84,120,0.08)] shadow-sm hover:scale-105 active:scale-95 smooth-transition"
            aria-label="メニュー"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-[#171725]" />
            ) : (
              <Menu className="w-5 h-5 text-[#171725]" />
            )}
          </button>
        </div>

        {/* Drawer Overlay & Content */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute top-[65px] right-0 w-60 z-50 bg-white/95 backdrop-blur-md rounded-2xl border border-[rgba(80,84,120,0.12)] shadow-xl p-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-xs font-semibold text-[#6E7180] px-2 py-1 border-b border-[rgba(80,84,120,0.06)] mb-1">
                MENU
              </div>
              
              <Link
                href="/tune"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F8F9FD] text-[#171725] text-sm smooth-transition lg:hidden"
              >
                <Music className="w-4 h-4 text-[#B9A7FF]" />
                診断を開始する
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F8F9FD] text-[#171725] text-sm smooth-transition"
              >
                <Info className="w-4 h-4 text-[#B9A7FF]" />
                このサイトについて
              </Link>

              <Link
                href="/privacy"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F8F9FD] text-[#171725] text-sm smooth-transition"
              >
                <Shield className="w-4 h-4 text-[#93C5FD]" />
                プライバシーポリシー
              </Link>

              <Link
                href="/terms"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F8F9FD] text-[#171725] text-sm smooth-transition"
              >
                <FileText className="w-4 h-4 text-[#F9A8D4]" />
                利用規約
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F8F9FD] text-[#171725] text-sm smooth-transition"
              >
                <HelpCircle className="w-4 h-4 text-[#9FE7D7]" />
                お問い合わせ
              </Link>

              <div className="text-[10px] text-[#6E7180]/70 text-center mt-3 pt-3 border-t border-[rgba(80,84,120,0.06)]">
                IKONOIJOY TUNE (Unofficial)
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
