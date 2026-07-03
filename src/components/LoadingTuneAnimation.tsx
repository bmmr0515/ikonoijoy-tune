'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';

export default function LoadingTuneAnimation() {
  const messages = [
    '今のあなたに合う音を探しています。',
    '気分と時間を重ねています。',
    '一曲ずつ、相性を見ています。',
    'メロディを調律しています。',
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none min-h-[400px]">
      {/* Ripple Animation Container */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-12">
        {/* Glowing ripples */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{
              duration: 2.4,
              ease: 'easeOut',
              repeat: Infinity,
              delay: i * 0.8,
            }}
            className="absolute inset-0 rounded-full border border-[#B9A7FF]/30 bg-gradient-to-tr from-[#B9A7FF]/3 to-[#93C5FD]/3 pointer-events-none"
          />
        ))}

        {/* Center core pulse */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B9A7FF] via-[#A5B4FC] to-[#93C5FD] shadow-lg flex items-center justify-center relative z-10"
        >
          <Music className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Dynamic textual animation */}
      <div className="h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-[#171725] tracking-wide"
          >
            {messages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-[10px] text-[#6E7180] tracking-widest uppercase mt-4 opacity-50">
        Tuning Your Sound
      </p>
    </div>
  );
}
