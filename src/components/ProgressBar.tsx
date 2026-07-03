'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full flex flex-col gap-2 px-4 py-2">
      <div className="flex justify-between items-center text-xs text-[#6E7180] font-semibold tracking-wider">
        <span className="uppercase text-[10px] tracking-widest text-[#6E7180]/60">Progress</span>
        <span>
          {current} <span className="text-[#6E7180]/40">/</span> {total}
        </span>
      </div>

      <div className="w-full h-1 bg-[rgba(80,84,120,0.06)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-[#B9A7FF] via-[#A5B4FC] to-[#93C5FD] rounded-full"
        />
      </div>
    </div>
  );
}
