import React from 'react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';

export default function PrivacyPage() {
  return (
    <>
      <AppHeader showBack={true} />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 items-center">
          <div className="text-center mb-2">
            <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase">
              Privacy Policy
            </span>
            <h2 className="text-lg font-bold text-[#171725] tracking-wide mt-2">
              プライバシーポリシー
            </h2>
          </div>

          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[24px] border border-[rgba(80,84,120,0.12)] p-6 shadow-sm flex flex-col gap-4 text-xs text-[#6E7180] leading-relaxed">
            <h3 className="font-bold text-[#171725] text-sm tracking-wide">
              位置情報（GPS）の取り扱いについて
            </h3>
            <p>
              本アプリの診断フローにおいて「現在地の天気を使う」を選択された場合、お使いの端末から取得した位置情報（緯度・経度）を使用して無料の外部気象データ提供サービス（Open-Meteo）へアクセスし、現在の地域の天気情報を取得します。
            </p>
            <p>
              この位置情報はクライアント（端末）側での天気の取得および診断（選曲）の計算にのみ一時的に使用され、当サイトのサーバーに送信されたり、保存されたりすることは一切ありません。
            </p>

            <h3 className="font-bold text-[#171725] text-sm tracking-wide mt-2">
              アクセス解析およびログについて
            </h3>
            <p>
              当サイトでは、サービスの改善・分析のため、Cookie（クッキー）等の技術を使用したアクセス解析ツール（Google Analytics等）を将来的に導入、またはログを計測する場合があります。これらのデータは個人を特定しない形での統計的な数値としてのみ収集されます。
            </p>

            <h3 className="font-bold text-[#171725] text-sm tracking-wide mt-2">
              データのローカル保存
            </h3>
            <p>
              診断履歴や入力状態を保持するために、ブラウザの LocalStorage 等を使用してデータをブラウザ内に保存する場合があります。このデータも端末のローカル環境から外へ送信されることはありません。
            </p>

            <h3 className="font-bold text-[#171725] text-sm tracking-wide mt-2">
              ポリシーの変更
            </h3>
            <p>
              本プライバシーポリシーの内容は、必要に応じて事前通告なく改定されることがあります。改定されたポリシーは当ページに掲載された時点より有効となります。
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
