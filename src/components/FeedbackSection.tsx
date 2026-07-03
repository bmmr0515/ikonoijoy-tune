'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FeedbackSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (rating: string) => {
    // rating can be 'high' | 'mid' | 'low'
    // Log feedback or handle it locally
    console.log(`User feedback rating submitted: ${rating}`);
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white/60 backdrop-blur-sm border border-[rgba(80,84,120,0.08)] rounded-[24px] p-5 shadow-sm text-center">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-3.5"
          >
            <h4 className="text-xs font-semibold text-[#171725] tracking-wide">
              今の選曲は気分に合っていましたか？
            </h4>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleFeedback('high')}
                className="px-3.5 py-2 rounded-xl bg-white border border-[rgba(80,84,120,0.12)] text-[11px] font-medium text-[#171725] hover:border-[#B9A7FF]/50 active:scale-95 smooth-transition cursor-pointer"
              >
                かなり合っていた
              </button>
              <button
                onClick={() => handleFeedback('mid')}
                className="px-3.5 py-2 rounded-xl bg-white border border-[rgba(80,84,120,0.12)] text-[11px] font-medium text-[#171725] hover:border-[#93C5FD]/50 active:scale-95 smooth-transition cursor-pointer"
              >
                少し合っていた
              </button>
              <button
                onClick={() => handleFeedback('low')}
                className="px-3.5 py-2 rounded-xl bg-white border border-[rgba(80,84,120,0.12)] text-[11px] font-medium text-[#171725] hover:border-[#F9A8D4]/50 active:scale-95 smooth-transition cursor-pointer"
              >
                あまり合わなかった
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-2 gap-2 text-center"
          >
            <div className="w-6 h-6 rounded-full bg-[#F9A8D4]/10 flex items-center justify-center text-[#F9A8D4]">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            <p className="text-xs font-semibold text-[#171725]">
              フィードバックありがとうございます。
            </p>
            <p className="text-[10px] text-[#6E7180] leading-relaxed">
              いただいた回答を活かして、TUNEの選曲精度を少しずつ改善していきます。
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
