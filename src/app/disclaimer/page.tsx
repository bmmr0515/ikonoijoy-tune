import React from 'react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';

export default function DisclaimerPage() {
  return (
    <>
      <AppHeader showBack={true} />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 items-center">
          <div className="text-center mb-2">
            <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase">
              Disclaimer & Rights
            </span>
            <h2 className="text-lg font-bold text-[#171725] tracking-wide mt-2">
              免責事項・権利表記
            </h2>
          </div>

          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[24px] border border-[rgba(80,84,120,0.12)] p-6 shadow-sm flex flex-col gap-5 text-xs text-[#6E7180] leading-relaxed">
            
            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                非公式ファンサイトについて
              </h3>
              <p>
                本サイト「IKONOIJOY TUNE」（以下「当サイト」）は、＝LOVE（イコールラブ）、≠ME（ノットイコールミー）、≒JOY（ニアリーイコールジョイ）を応援する一ファンが個人で制作・運営している非公式のファンWebアプリです。メンバー個人、所属事務所（株式会社代々木アニメーション学院等）、関連レコード会社（株式会社ソニー・ミュージックレーベルズ等）、および公式ファンクラブ等の関係各社とは一切関係ありません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                権利の帰属に関して
              </h3>
              <p>
                当サイトに掲載されているグループ名、メンバー名、楽曲タイトル等の登録商標や関連する知的財産権は、各権利者および関係各社に帰属します。当サイトにおける名称の使用は、ファンの利便性向上およびグループの紹介目的（公正な利用範囲）に限られており、商標権等の侵害を目的としたものではありません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                アセットの非掲載方針
              </h3>
              <p>
                当サイトでは、著作権、肖像権およびパブリシティ権の保護を最優先するため、アーティスト写真、ロゴ画像、CDジャケット画像、歌詞、および音源データ等を一切使用・掲載・配信しない方針をとっています。診断結果画面に表示されるグラデーション等は、各楽曲の雰囲気やテーマカラー等を基に独自に調律・生成された抽象的なビジュアル表現です。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                情報の正確性に関する免責
              </h3>
              <p>
                当サイトで提供している楽曲メタデータ（曲調の分類、気分タグ、センター情報等）は、ファンによる自主的な鑑賞データに基づき制作・検証されています。掲載情報が常に最新かつ正確であることを保証するものではありません。情報の誤り、診断結果によるトラブル、または当サイトを利用したことに起因するあらゆる損害について、運営者は一切の責任を負いません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                権利者様からのお申し出・お問い合わせに関して
              </h3>
              <p>
                当サイトの掲載内容に関して、権利侵害に該当する部分の訂正、削除依頼等の問題がございましたら、個別に対応を行います。
              </p>
              <p className="mt-1.5">
                なお、現在当サイト上に公開されている公式メールアドレスなどの連絡窓口は未確定（未設定）です。また、お問い合わせフォームからのデータ送信機能は準備中のためご利用いただけません。窓口の準備が整い次第、本ページにてご連絡方法を掲載いたします。
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4 flex flex-col gap-0.5 text-[10px] text-[#6E7180]/70 align-end text-right">
              <div>制定日：2026年7月3日</div>
              <div>最終改定日：2026年7月3日</div>
            </div>

          </div>
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
