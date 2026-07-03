'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Check } from 'lucide-react';

interface OptionCardProps {
  label: string;
  subLabel?: string;
  isSelected: boolean;
  iconName?: string;
  onClick: () => void;
  layoutType?: 'list' | 'grid' | 'chip';
}

export default function OptionCard({
  label,
  subLabel,
  isSelected,
  iconName,
  onClick,
  layoutType = 'list',
}: OptionCardProps) {
  // Dynamically resolve icon from lucide-react
  const IconComponent = iconName ? (Icons as any)[iconName] : null;

  if (layoutType === 'chip') {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`px-4 py-2.5 rounded-full border text-xs font-semibold tracking-wide smooth-transition cursor-pointer ${
          isSelected
            ? 'bg-gradient-to-r from-[#B9A7FF]/15 to-[#93C5FD]/15 border-[#B9A7FF] text-[#171725]'
            : 'bg-white/60 border-[rgba(80,84,120,0.12)] text-[#6E7180] hover:border-[#B9A7FF]/35'
        }`}
      >
        <span className="flex items-center gap-1.5 justify-center">
          {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
          {label}
        </span>
      </motion.button>
    );
  }

  const isGrid = layoutType === 'grid';

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl bg-white/70 backdrop-blur-sm border smooth-transition flex items-center justify-between gap-3 relative overflow-hidden cursor-pointer ${
        isSelected
          ? 'border-[#B9A7FF] bg-white shadow-[0_4px_16px_rgba(185,167,255,0.12)]'
          : 'border-[rgba(80,84,120,0.12)] hover:border-[#B9A7FF]/40 shadow-sm'
      } ${isGrid ? 'flex-col items-center text-center justify-center p-5 min-h-[120px]' : ''}`}
    >
      {/* Background glow when selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#B9A7FF]/3 to-[#93C5FD]/3 pointer-events-none -z-10" />
      )}

      {/* Left side (Icon + Text) */}
      <div className={`flex ${isGrid ? 'flex-col items-center gap-2' : 'items-center gap-3.5'} flex-1`}>
        {IconComponent && (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isSelected
                ? 'bg-gradient-to-tr from-[#B9A7FF] to-[#93C5FD] text-white shadow-sm'
                : 'bg-[#F8F9FD] text-[#6E7180]'
            } smooth-transition`}
          >
            <IconComponent className="w-4.5 h-4.5" />
          </div>
        )}

        <div className={`flex flex-col ${isGrid ? 'items-center' : ''}`}>
          <span className="text-sm font-semibold text-[#171725] tracking-wide">
            {label}
          </span>
          {subLabel && (
            <span className="text-[10px] text-[#6E7180] mt-1 font-medium leading-relaxed">
              {subLabel}
            </span>
          )}
        </div>
      </div>

      {/* Right side (Checkmark, omitted in grid layout for aesthetic neatness) */}
      {!isGrid && (
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center smooth-transition ${
            isSelected
              ? 'bg-[#B9A7FF] border-[#B9A7FF] text-white'
              : 'border-[rgba(80,84,120,0.15)] bg-white/20'
          }`}
        >
          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      )}
    </motion.button>
  );
}
