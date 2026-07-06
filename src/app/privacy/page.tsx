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

          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[24px] border border-[rgba(80,84,120,0.12)] p-6 shadow-sm flex flex-col gap-5 text-xs text-[#6E7180] leading-relaxed">

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                1. 運営者情報
              </h3>
              <p>
                本サイト「IKONOIJOY TUNE」（以下「当サイト」）は、個人開発者（以下「運営者」）が非営利目的で運営しています。現在、公開用のメールアドレス等の連絡先窓口は未確定（未設定）となっております。また、お問い合わせフォームからのデータ送信機能は現在準備中のため提供されておりません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                2. 取得する情報について（不取得の原則）
              </h3>
              <p>
                当サイトでは、ユーザーの個人情報（氏名、メールアドレス、住所、電話番号等）をサーバー側で収集・保持・蓄積することは一切ありません。お問い合わせフォームに入力されたお名前やメールアドレス等の内容はブラウザ内でのみ一時的に処理され、運営者を含むいかなる第三者のサーバーへも送信されないため、運営者がこれらを閲覧・取得・保存することはできません。入力された情報は、ブラウザを閉じるかリロードすることで即座に完全に消去・破棄されます。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                3. 位置情報（GPS）の取り扱いについて
              </h3>
              <p>
                本アプリの診断フローにおいて「現在地の天気を使う」を選択された場合、お使いの端末から取得した位置情報（緯度・経度等）を使用して無料の外部気象データ提供サービス（Open-Meteo）へアクセスし、現在の地域の天気情報を取得します。
              </p>
              <p className="mt-1.5">
                この位置情報は端末側での天気取得および診断（選曲）の計算にのみ一時的に使用され、当サイトのサーバーに送信されたり、保存されたりすることは一切ありません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                4. Cookie（クッキー）および類似技術について
              </h3>
              <p>
                当サイトでは現在、ユーザーを識別・追跡するためのCookie（クッキー）やその他類似する広告目的のトラッキング技術を一切使用していません。
              </p>
              <p className="mt-1.5">
                ただし、サービスの改善・分析のため、Cookie等の技術を使用したアクセス解析ツール（Google Analytics等）を将来的に導入、またはログを計測する場合があります。これらのデータは個人を特定しない形での統計的な数値としてのみ収集されます。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                5. localStorage（ローカルストレージ）の仕様
              </h3>
              <p>
                当サイトは、ユーザーが診断結果の履歴（最近おすすめされた曲）をブラウザ内で保持・確認できるようにするため、ブラウザの LocalStorage 機能を利用して端末内に直接履歴データを保存します。
              </p>
              <ul className="list-disc pl-5 mt-1.5 flex flex-col gap-1">
                <li><strong>保存キー名:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">ikonoijoy-tune-history</code></li>
                <li><strong>保存される具体的な項目:</strong> 診断履歴リスト（各診断の実行日時、診断タイプ「TUNE」、提案された楽曲IDおよびグループ）</li>
                <li><strong>保存件数:</strong> 直近の診断結果（最大10件まで）</li>
                <li><strong>保存期間:</strong> 無期限（ユーザー自身がキャッシュ削除等を行うまで）</li>
                <li><strong>削除方法:</strong> アプリ内の診断履歴クリア操作を実行する、またはブラウザの設定からサイトデータ（キャッシュ・閲覧データ）を削除する</li>
                <li><strong>送信制限:</strong> この履歴データは端末内のローカル環境のみに保存され、インターネットを介して送信されることは一切ありません。</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                6. 外部サービス（ホスティング事業者）の利用
              </h3>
              <p>
                当サイトは、ホスティング事業者として Vercel, Inc.（米国）のサーバーおよび配信プラットフォームを利用してホスティングされています。サイトの安全な配信および通信エラー調査・不正アクセス対策のため、利用者の接続に伴い、IPアドレス、端末およびブラウザの種類、通信ログなどの情報が自動的に Vercel 社によって処理・一時保存される場合があります。
              </p>
              <p className="mt-1.5">
                なお、当サイト独自のアクセス解析ツール（Google Analytics等）やパフォーマンス追跡ツール（Vercel Web Analytics, Vercel Speed Insights等）は現在、導入および利用していません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                7. 第三者提供・外部委託・安全管理
              </h3>
              <p>
                当サイトは個人情報をそもそもサーバー側で取得・保存しないため、第三者提供や外部企業へのデータ処理委託はありません。ローカルで動作するアプリ内のデータ管理については、Next.js およびブラウザの標準的なセキュリティ仕様に基づき処理されています。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                8. 未成年者の利用について
              </h3>
              <p>
                当サイトはすべての利用者に安全にご利用いただけるよう設計されていますが、未成年の方が利用される場合は保護者の方の同意を得たうえでのご利用を推奨します。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                9. ポリシーの変更
              </h3>
              <p>
                本プライバシーポリシーの内容は、関係法令の改正やサイト運営方針の変更等に伴い、必要に応じて事前通告なく改定されることがあります。改定後のポリシーは、当ページに掲載された時点より有効となります。
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
