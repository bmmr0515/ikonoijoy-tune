'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-xs"
            >
              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 text-amber-800 leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                  ⚠️ お問い合わせフォームは現在準備中です
                </p>
                <p className="text-[10px]">
                  当フォームは現在、正式公開前の動作確認中のため、メッセージの送信機能は有効になっておりません。
                  入力されたお名前や内容が外部サーバーに送信されることはありません。
                </p>
              </div>

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
                  disabled
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="イコノイジョイ太郎"
                  className="h-10 px-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-slate-50 text-slate-400 cursor-not-allowed focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#171725]">メールアドレス</label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your-email@example.com"
                  className="h-10 px-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-slate-50 text-slate-400 cursor-not-allowed focus:outline-none"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#171725]">メッセージ内容</label>
                <textarea
                  disabled
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="不具合報告や、ご意見、応援メッセージなどをお書きください。"
                  className="p-3.5 rounded-xl border border-[rgba(80,84,120,0.12)] bg-slate-50 text-slate-400 cursor-not-allowed focus:outline-none resize-none"
                />
              </div>

              {/* Submit (Disabled) */}
              <button
                type="button"
                disabled
                className="w-full h-11 rounded-full bg-slate-200 text-slate-500 font-semibold flex items-center justify-center gap-2 cursor-not-allowed mt-2 text-xs"
              >
                送信不可 (準備中)
              </button>
            </form>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
