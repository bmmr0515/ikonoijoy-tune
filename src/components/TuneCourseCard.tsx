'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock } from 'lucide-react';

interface TuneCourseCardProps {
  type: 'quick' | 'detailed';
  title: string;
  description: string;
  duration: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function TuneCourseCard({
  type,
  title,
  description,
  duration,
  isSelected,
  onClick,
}: TuneCourseCardProps) {
  const isQuick = type === 'quick';

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-6 rounded-[24px] bg-white/70 backdrop-blur-md border smooth-transition flex flex-col justify-between min-h-[150px] relative overflow-hidden cursor-pointer ${
        isSelected
          ? 'border-[#B9A7FF] shadow-[0_0_20px_rgba(185,167,255,0.18)] bg-white/90'
          : 'border-[rgba(80,84,120,0.12)] hover:border-[#B9A7FF]/50 shadow-sm'
      }`}
    >
      {/* Background glow when selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#B9A7FF]/4 to-[#93C5FD]/4 pointer-events-none -z-10" />
      )}

      <div className="flex justify-between items-start w-full mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isSelected
                ? 'bg-gradient-to-tr from-[#B9A7FF] to-[#93C5FD] text-white'
                : 'bg-[#F8F9FD] text-[#6E7180]'
            } smooth-transition`}
          >
            {isQuick ? <Zap className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-semibold text-base text-[#171725] tracking-wide">
              {title}
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                isSelected
                  ? 'bg-[#B9A7FF]/20 text-[#171725]'
                  : 'bg-slate-100 text-[#6E7180]'
              }`}
            >
              {duration}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#6E7180] leading-relaxed pr-4">
        {description}
      </p>

      {/* Decorative indicator dots */}
      <div className="absolute right-4 bottom-4 flex items-center gap-1">
        <div
          className={`w-2 h-2 rounded-full smooth-transition ${
            isSelected ? 'bg-[#B9A7FF]' : 'bg-slate-200'
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full smooth-transition ${
            isSelected ? 'bg-[#93C5FD]' : 'bg-slate-200'
          }`}
        />
      </div>
    </motion.button>
  );
}
