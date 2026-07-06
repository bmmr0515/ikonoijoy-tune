'use client';

import React from 'react';
import Link from 'next/link';

export default function LegalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F8F9FD]/40 px-6 py-8 pb-28 border-t border-[rgba(80,84,120,0.06)] flex flex-col items-center gap-6">
      {/* Policy and Information Links */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#6E7180] font-medium">
        <Link href="/about" className="hover:text-[#171725] hover:underline smooth-transition">
          このサイトについて
        </Link>
        <Link href="/privacy" className="hover:text-[#171725] hover:underline smooth-transition">
          プライバシーポリシー
        </Link>
        <Link href="/terms" className="hover:text-[#171725] hover:underline smooth-transition">
          利用規約
        </Link>
        <Link href="/disclaimer" className="hover:text-[#171725] hover:underline smooth-transition">
          免責事項
        </Link>
        <Link href="/contact" className="hover:text-[#171725] hover:underline smooth-transition">
          お問い合わせ
        </Link>
      </div>

      {/* Disclaimers */}
      <div className="flex flex-col gap-2 max-w-sm text-[10px] text-[#6E7180]/80 leading-relaxed text-center font-normal">
        <p>
          IKONOIJOY TUNEは、ファンが個人で制作・運営する非公式Webアプリです。
        </p>
        <p>
          ＝LOVE、≠ME、≒JOY、各所属事務所、レコード会社、および各音楽配信サービスとは一切関係ありません。
        </p>
        <p>
          本サイトは公式画像、ジャケット画像、歌詞、音源を一切掲載・配信していません。楽曲の視聴にはSpotify、Apple Music、YouTube等の公式サービスをご利用ください。
        </p>
        <p>
          掲載内容に問題がある場合は、お手数ですがお問い合わせよりご連絡ください。
        </p>
      </div>

      {/* Copyright */}
      <div className="text-[10px] text-[#6E7180]/60 tracking-wider font-title">
        &copy; {currentYear} IKONOIJOY TUNE. Unofficial Fan Project.
      </div>
    </footer>
  );
}
