'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Music, Cloud, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-10 lg:py-16 flex-1 flex flex-col justify-center relative">

      {/* Background slowly drifting soft glows (Lavender, Sky Blue, Mint) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full bg-[#B9A7FF]/8 blur-[70px] md:blur-[85px] top-[-5%] left-[5%] animate-float-light-1" />
        <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#93C5FD]/6 blur-[80px] md:blur-[100px] bottom-[5%] right-[5%] animate-float-light-2" />
        <div className="absolute w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full bg-[#9FE7D7]/8 blur-[60px] md:blur-[75px] top-[35%] right-[25%] animate-float-light-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Hero Text and Main CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center z-10">
          {/* Visual Tuning Dial Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-14 h-14 lg:w-16 lg:h-16 mb-6 lg:mb-8 rounded-full border border-dashed border-[#B9A7FF]/30 flex items-center justify-center relative bg-white/40"
          >
            <div className="absolute inset-1.5 rounded-full border border-[#93C5FD]/20 animate-pulse" />
            <div className="absolute inset-3.5 rounded-full bg-gradient-to-tr from-[#B9A7FF]/8 to-[#93C5FD]/8 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 lg:w-4 h-4 text-[#B9A7FF]" />
            </div>
          </motion.div>

          {/* Main Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[28px] md:text-[34px] lg:text-[42px] font-bold text-[#171725] leading-snug tracking-wider mb-5 lg:mb-6 font-title"
          >
            今の気分に、
            <br />
            ぴったりの一曲を。
          </motion.h1>

          {/* Explanatory Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs md:text-sm text-[#6E7180] leading-relaxed lg:leading-loose max-w-sm lg:max-w-md mb-8 lg:mb-10"
          >
            気分、時間、天気、推しメンから、
            <br className="lg:hidden" />
            あなたに合うイコノイジョイの音楽を見つけます。
          </motion.p>

          {/* TUNE CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-[280px]"
          >
            <motion.div
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.975 }}
            >
              <Link
                href="/tune"
                aria-label="TUNEを始める"
                className="flex items-center justify-center gap-3 w-full h-[54px] rounded-full bg-gradient-to-r from-[#B9A7FF] via-[#A5B4FC] to-[#93C5FD] text-white font-semibold text-base shadow-[0_8px_20px_-6px_rgba(165,180,252,0.45)] hover:brightness-[1.03] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-white/10" />
                TUNEを始める
              </Link>
            </motion.div>
          </motion.div>

          {/* Unofficial project tag */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[9px] uppercase tracking-[0.2em] text-[#6E7180] font-semibold mt-8 block"
          >
            非公式ファン制作Webアプリ
          </motion.span>
        </div>

        {/* Right Column: Interactive Preview Visual (Glassmorphism card) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center justify-center relative w-full mt-6 lg:mt-0 z-10"
        >
          {/* Subtle glow behind preview */}
          <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-tr from-[#B9A7FF]/10 to-[#93C5FD]/10 blur-[60px] md:blur-[80px] z-0 pointer-events-none" aria-hidden="true" />

          {/* Preview Card with floating-card effect */}
          <div className="relative z-10 w-full max-w-[390px] bg-white/70 backdrop-blur-md rounded-3xl border border-[rgba(80,84,120,0.12)] shadow-2xl p-5 md:p-6 flex flex-col gap-5 floating-card">

            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100/80 pb-3.5">
              <span className="text-[10px] font-bold text-[#6E7180] tracking-widest uppercase flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#B9A7FF]" />
                TUNE PREVIEW
              </span>
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-rose-200" />
                <span className="w-2 h-2 rounded-full bg-amber-200" />
                <span className="w-2 h-2 rounded-full bg-emerald-200" />
              </div>
            </div>
            
            {/* Vibe selection chip preview */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-[#6E7180]/60 uppercase tracking-widest">
                YOUR VIBE
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-3.5 py-1.5 rounded-full text-[10px] bg-[#B9A7FF]/12 text-[#B9A7FF] font-bold">
                  #motivated
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-[10px] bg-slate-100/60 text-slate-500 font-semibold">
                  #excited
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-[10px] bg-slate-100/60 text-slate-500 font-semibold">
                  #healing
                </span>
              </div>
            </div>

            {/* Selected conditions chip preview */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-[#6E7180]/60 uppercase tracking-widest">
                CONDITIONS
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-white/70 border border-slate-100/80 text-[10px] font-bold text-[#171725]">
                  🌆 夕暮れ
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/70 border border-slate-100/80 text-[10px] font-bold text-[#171725]">
                  ☀️ 晴れ
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/70 border border-slate-100/80 text-[10px] font-bold text-[#171725]">
                  🌸 ＝LOVE
                </span>
              </div>
            </div>

            {/* Recommendation result sample card */}
            <div className="flex flex-col gap-2.5 border-t border-slate-100/80 pt-4.5">
              <span className="text-[9px] font-bold text-[#6E7180]/60 uppercase tracking-widest">
                RECOMMENDED TRACK
              </span>

              {/* Internal Glassmorphism Result Card */}
              <div className="bg-gradient-to-r from-white/95 to-white/60 backdrop-blur-sm rounded-2xl border border-[rgba(80,84,120,0.08)] p-4 flex flex-col gap-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-bold bg-[#EFF6FF] text-[#93C5FD] border border-[#DBEAFE] px-2 py-0.5 rounded-full">
                    ＝LOVE
                  </span>
                  <h4 className="text-xs font-bold text-[#171725] tracking-wide">
                    この空がトリガー
                  </h4>
                </div>
                <p className="text-[10px] text-[#6E7180] leading-relaxed">
                  爽やかな王道メロディと切ない情景が、夕暮れの帰り道に優しく寄り添う一曲です。張り詰めた心がすっと軽くなります。
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
