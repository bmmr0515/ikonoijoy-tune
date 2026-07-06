'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, HelpCircle } from 'lucide-react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate brief network delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <>
      <AppHeader showBack={true} />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 items-center">
          <div className="text-center mb-2">
            <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase">
              Contact
            </span>
            <h2 className="text-lg font-bold text-[#171725] tracking-wide mt-2">
              お問い合わせ
            </h2>
          </div>

          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[24px] border border-[rgba(80,84,120,0.12)] p-6 shadow-sm flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 text-xs"
                >
                  <p className="text-[#6E7180] leading-relaxed">
                    本アプリの掲載内容に関する修正・削除のご依頼、不具合の報告、ご意見がございましたら、以下のフォームよりご連絡ください。
                  </p>
                  <p className="text-[10px] text-[#6E7180]/80 bg-[#F8F9FD] p-3 rounded-xl border border-[rgba(80,84,120,0.06)] leading-relaxed">
                    ※非公式の個人制作Webアプリであるため、すべてのお問い合わせに返信できるとは限りません。予めご了承ください。
                  </p>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="font-semibold text-[#171725]">お名前</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="イコノイジョイ太郎"
                      className="h-10 px-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-white text-[#171725] focus:outline-none focus:border-[#B9A7FF] smooth-transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-[#171725]">メールアドレス</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your-email@example.com"
                      className="h-10 px-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-white text-[#171725] focus:outline-none focus:border-[#B9A7FF] smooth-transition"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-[#171725]">メッセージ内容</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="不具合報告や、ご意見、応援メッセージなどをお書きください。"
                      className="p-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-white text-[#171725] focus:outline-none focus:border-[#B9A7FF] smooth-transition resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 rounded-full bg-[#171725] text-white font-semibold flex items-center justify-center gap-2 smooth-transition disabled:opacity-50 mt-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {loading ? '送信中...' : '送信する'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 flex flex-col items-center gap-3.5"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#171725]">送信完了しました</h3>
                    <p className="text-[10px] text-[#6E7180] leading-relaxed mt-2 px-2">
                      お問い合わせを受け付けました。ご報告いただきありがとうございます。
                    </p>
                    <p className="text-[10px] text-[#6E7180] leading-relaxed mt-1 px-2">
                      返信が必要な案件についてのみ、記載いただいたメールアドレスへ追ってご連絡いたします。
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 mt-2 rounded-xl bg-white border border-[rgba(80,84,120,0.12)] text-[10px] font-bold text-[#B9A7FF] cursor-pointer"
                  >
                    新しいメッセージを送る
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
