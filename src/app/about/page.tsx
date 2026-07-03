import React from 'react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';
import LegalFooter from '../../components/LegalFooter';

export default function AboutPage() {
  return (
    <>
      <AppHeader showBack={true} />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 items-center">
          <div className="text-center mb-2">
            <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase">
              About the site
            </span>
            <h2 className="text-lg font-bold text-[#171725] tracking-wide mt-2">
              このサイトについて
            </h2>
          </div>

          {/* Info card (Restricted width on desktop for better readability) */}
          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[24px] border border-[rgba(80,84,120,0.12)] p-6 shadow-sm flex flex-col gap-4 text-xs text-[#6E7180] leading-relaxed">
            <h3 className="font-bold text-[#171725] text-sm tracking-wide">
              「今のあなたに、いちばん似合う音楽を。」
            </h3>
            <p>
              「IKONOIJOY TUNE（イコノイジョイ チューン）」は、＝LOVE、≠ME、≒JOYの素晴らしい楽曲たちと、ユーザーの皆様との新しい出会いを演出するために制作された非公式のファンWebアプリです。
            </p>
            <p>
              その日の気分、過ごし方、天気、時間帯、そして推しメンなどの条件を重ね合わせることで、今のあなたに最もフィットする「運命の一曲」または「プレイリスト」を調律（TUNE）して提案します。
            </p>
            
            <h3 className="font-bold text-[#171725] text-sm tracking-wide mt-2">
              非公式ファンプロジェクト
            </h3>
            <p>
              本アプリは、一人のファンが趣味の一環として開発・運営しているものであり、メンバー本人、所属事務所、関連レコード会社、および各音楽配信サービス（Spotify、Apple Music、YouTube等）とは一切関係がありません。
            </p>
            <p>
              公式画像（アーティスト写真、ロゴ、ジャケット等）、歌詞、音源は、著作権および各種権利の保護のため一切使用・掲載・配信しておりません。結果画面で生成されるグラデーションアートは、楽曲の雰囲気から動的に構築された独自のビジュアルアートです。
            </p>

            <h3 className="font-bold text-[#171725] text-sm tracking-wide mt-2">
              楽曲の視聴に関して
            </h3>
            <p>
              提案された楽曲を視聴する際は、公式の音楽配信サービス、またはお持ちのCD・各種音楽プレイヤーにてお楽しみいただきますようお願いいたします。
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
