'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Music, Calendar, Cloud, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 flex-1 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Hero Text and Main CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
          {/* Visual Tuning Dial Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-16 h-16 lg:w-20 lg:h-20 mb-6 lg:mb-8 rounded-full border border-dashed border-[#B9A7FF]/40 flex items-center justify-center relative"
          >
            <div className="absolute inset-1.5 rounded-full border border-[#93C5FD]/30 animate-pulse" />
            <div className="absolute inset-3.5 rounded-full bg-gradient-to-tr from-[#B9A7FF]/10 to-[#93C5FD]/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-[#B9A7FF]" />
            </div>
          </motion.div>

          {/* Main Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[24px] md:text-[28px] lg:text-[36px] font-bold text-[#171725] leading-relaxed tracking-wider mb-5 lg:mb-6"
          >
            今のあなたに、
            <br />
            いちばん似合う音楽を。
          </motion.h1>

          {/* Explanatory Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs lg:text-sm text-[#6E7180] leading-loose lg:leading-loose max-w-xs lg:max-w-md mb-8 lg:mb-10"
          >
            気分、時間、天気、推しメンから、
            <br />
            イコノイジョイの一曲を選びます。
          </motion.p>

          {/* TUNE CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-[280px]"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href="/tune"
                className="flex items-center justify-center gap-3 w-full h-[54px] rounded-full bg-gradient-to-r from-[#B9A7FF] via-[#A5B4FC] to-[#93C5FD] text-white font-semibold text-base shadow-[0_8px_20px_-6px_rgba(165,180,252,0.5)] active:shadow-inner hover:brightness-105 smooth-transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-white/10" />
                TUNEをはじめる
              </Link>
            </motion.div>
          </motion.div>

          {/* Mini tag */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[10px] uppercase tracking-widest text-[#6E7180] font-medium mt-6 lg:mt-8 block"
          >
            非公式ファン制作Webアプリ
          </motion.span>
        </div>

        {/* Right Column: Desktop Preview (Hidden on mobile/tablet) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex flex-col items-center justify-center relative w-full"
        >
          {/* Background glow behind preview */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#B9A7FF]/15 to-[#93C5FD]/15 blur-3xl z-0" />
          
          {/* Preview Card */}
          <div className="relative z-10 w-full max-w-[420px] bg-white/70 backdrop-blur-md rounded-3xl border border-[rgba(80,84,120,0.15)] shadow-2xl p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-[#6E7180] tracking-widest uppercase flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#B9A7FF]" />
                TUNE DECK PREVIEW
              </span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              </div>
            </div>
            
            {/* Vibe Selection Mock */}
            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-bold text-[#171725] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#A5B4FC]" />
                1. SELECT YOUR VIBE
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-2 rounded-full text-xs bg-white border border-[#B9A7FF] text-[#B9A7FF] font-semibold shadow-xs">☀️ Motivated</span>
                <span className="px-3.5 py-2 rounded-full text-xs bg-white/60 border border-slate-100 text-slate-500 font-medium">🎵 Calm</span>
                <span className="px-3.5 py-2 rounded-full text-xs bg-white/60 border border-slate-100 text-slate-500 font-medium">☔ Sad</span>
              </div>
            </div>

            {/* Conditions select mock */}
            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-bold text-[#171725] uppercase tracking-wider flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-[#93C5FD]" />
                2. CONDITIONS
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white/50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#6E7180] font-semibold uppercase tracking-wider">Time</span>
                  <span className="text-xs font-bold text-[#171725]">🌆 夕方</span>
                </div>
                <div className="bg-white/50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#6E7180] font-semibold uppercase tracking-wider">Weather</span>
                  <span className="text-xs font-bold text-[#171725]">☀️ 晴れ</span>
                </div>
                <div className="bg-white/50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#6E7180] font-semibold uppercase tracking-wider">Group</span>
                  <span className="text-xs font-bold text-[#171725]">💎 ≒JOY</span>
                </div>
              </div>
            </div>

            {/* Quick Link start */}
            <Link
              href="/tune"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#171725] hover:bg-[#252538] text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg smooth-transition hover:scale-[1.01]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9FE7D7]" />
              チューニングを開始する
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
