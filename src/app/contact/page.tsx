'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', category: '掲載内容の訂正', message: '' });

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: '', email: '', category: '掲載内容の訂正', message: '' });
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
              お問い合わせ（準備中）
            </h2>
          </div>

          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[24px] border border-[rgba(80,84,120,0.12)] p-6 shadow-sm flex flex-col gap-5 text-xs text-[#6E7180] leading-relaxed">

            {/* Warning Banner */}
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 flex gap-3 text-amber-800 text-[11px] leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">⚠️ お問い合わせ窓口は現在準備中です</span>
                現在、本フォームからのデータ送信機能は提供されていません。入力された内容は当サイトのサーバーや外部サービスへ送信・保存されず、運営者へ届くことはありません。入力した内容はブラウザ内でのみ一時的に保持され、ブラウザを閉じるかリロードすると完全に消去・破棄されます。
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#171725]">お名前（※送信されません）</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="イコノイジョイ太郎"
                  className="h-10 px-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-white text-[#171725] focus:outline-none focus:border-[#B9A7FF] smooth-transition"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#171725]">メールアドレス（※送信されません）</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your-email@example.com"
                  className="h-10 px-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-white text-[#171725] focus:outline-none focus:border-[#B9A7FF] smooth-transition"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#171725]">お問い合わせ種別（※送信されません）</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-10 px-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-white text-[#171725] focus:outline-none focus:border-[#B9A7FF] smooth-transition"
                >
                  <option value="掲載内容の訂正">掲載内容の訂正</option>
                  <option value="権利侵害、削除依頼">権利侵害、削除依頼 (著作権等)</option>
                  <option value="プライバシー">プライバシーポリシー・データ保護に関して</option>
                  <option value="不具合">アプリの不具合報告</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#171725]">メッセージ内容（※送信されません）</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="詳細な情報をお書きください。"
                  className="p-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-white text-[#171725] focus:outline-none focus:border-[#B9A7FF] smooth-transition resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  type="button"
                  disabled
                  className="flex-1 h-11 rounded-full bg-slate-200 text-slate-500 font-semibold flex items-center justify-center gap-2 cursor-not-allowed text-xs"
                >
                  送信不可（準備中）
                </button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleClear}
                  className="h-11 px-6 rounded-full bg-white border border-[rgba(80,84,120,0.12)] text-[#6E7180] hover:text-[#171725] font-semibold flex items-center justify-center gap-2 smooth-transition cursor-pointer text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  入力をクリアする
                </motion.button>
              </div>

            </form>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
