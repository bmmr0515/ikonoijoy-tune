import React from 'react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';

export default function TermsPage() {
  return (
    <>
      <AppHeader showBack={true} />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 items-center">
          <div className="text-center mb-2">
            <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase">
              Terms of Service
            </span>
            <h2 className="text-lg font-bold text-[#171725] tracking-wide mt-2">
              利用規約
            </h2>
          </div>

          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[24px] border border-[rgba(80,84,120,0.12)] p-6 shadow-sm flex flex-col gap-4 text-xs text-[#6E7180] leading-relaxed">
            <h3 className="font-bold text-[#171725] text-sm tracking-wide">
              1. 利用規約の適用
            </h3>
            <p>
              本利用規約は、「IKONOIJOY TUNE」（以下「本サービス」）の利用者すべてに適用されます。本サービスを利用することにより、本規約に同意したものとみなされます。
            </p>

            <h3 className="font-bold text-[#171725] text-sm tracking-wide mt-2">
              2. 利用について
            </h3>
            <p>
              本サービスは非商用のファンアプリであり、個人的かつ非営利の目的でのみご利用いただけます。診断結果の画像や結果テキストは自由にSNS等でシェアして構いませんが、営利目的での無断使用や当サイトへの攻撃的・負荷をかける行為は禁止します。
            </p>

            <h3 className="font-bold text-[#171725] text-sm tracking-wide mt-2">
              3. 知的財産権
            </h3>
            <p>
              当サイトに掲載されているシステム、デザイン、ロゴマーク、テキスト等の著作権は制作者に帰属します。また、＝LOVE、≠ME、≒JOYに関するアーティスト名やグループ名等の権利は、それぞれの所属事務所、レコード会社、および関連する権利者に帰属します。
            </p>

            <h3 className="font-bold text-[#171725] text-sm tracking-wide mt-2">
              4. 免責事項
            </h3>
            <p>
              本サービス上の情報や選曲結果、各種マッチングデータの正確性についてはいかなる保証も行いません。また、本サービスを利用したこと、または利用できなかったことにより生じたトラブルや損害について、開発・運営者は一切の責任を負いません。
            </p>
            <p>
              本サービスは予告なく提供内容を変更、中断、または終了する場合があります。
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
