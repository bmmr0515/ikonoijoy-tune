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

          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[24px] border border-[rgba(80,84,120,0.12)] p-6 shadow-sm flex flex-col gap-5 text-xs text-[#6E7180] leading-relaxed">

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                1. 規約の適用と目的
              </h3>
              <p>
                本利用規約（以下「本規約」）は、ウェブサイト「IKONOIJOY TUNE」（以下「本サービス」）のすべての利用者に適用されます。本規約は、本サービスが提供する診断機能および掲載情報の適切な利用条件を定めることを目的としています。利用者は本サービスにアクセスした時点で、本規約に同意したものとみなされます。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                2. 非公式ファンアプリの明示と無料提供
              </h3>
              <p>
                本サービスは、＝LOVE、≠ME、≒JOYおよび関係各社とは無関係の、ファンが個人で制作・運営する非公式Webアプリです。本サービスが提供する機能はすべて無料であり、有料コンテンツや課金システムは一切存在しません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                3. 利用条件
              </h3>
              <p>
                利用者は、個人的かつ非営利の範囲においてのみ本サービスを利用できます。診断結果などのスクリーンショットや共有リンクはSNS等へ自由に投稿できますが、営利目的でのコンテンツの転載や商業利用は禁止します。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                4. 禁止事項
              </h3>
              <p>
                本サービスの利用にあたり、以下の行為を禁止します。
              </p>
              <ul className="list-disc pl-5 mt-1.5 flex flex-col gap-1">
                <li>本サービスのサーバーやネットワークシステムに過度な負荷をかける行為</li>
                <li>本サービスの解析、リバースエンジニアリング、または不正な手段でのアクセスを試みる行為</li>
                <li>運営者、関係各社、メンバー、または他の第三者の名誉・信頼を損なう行為</li>
                <li>その他、運営者が不適切と判断する行為</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                5. 知的財産権
              </h3>
              <p>
                本サービス上のロゴ、プログラム、デザイン、独自のテキスト等の著作権は運営者に帰属します。また、＝LOVE、≠ME、≒JOYに関する楽曲名、グループ名、メンバー名等の登録商標および権利は、それぞれのアーティスト、所属事務所、レコード会社、および関連する権利者に帰属します。当サイトは権利侵害を意図しておらず、知的財産権の保護のため公式の音源・画像・歌詞は一切掲載していません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                6. 免責事項（情報の正確性と推薦結果）
              </h3>
              <p>
                運営者は、本サービス上の掲載情報（楽曲データ等）や診断の推薦結果が特定の状況に適合していること、およびその正確性について、いかなる明示的・黙示的保証も行いません。診断結果はあくまで一つのレコメンデーションであり、ユーザー自身の体調や精神状態に対する医学的効果や問題解決を保証するものではありません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                7. サービス変更、中断、終了
              </h3>
              <p>
                本サービスは、保守点検の必要性、サーバーの不具合、または運営者の都合等により、利用者に事前に通知することなく本サービスの内容を変更、中断、または終了する場合があります。これによって利用者に生じた損害について、運営者は一切の責任を負いません。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                8. 損害賠償責任の範囲
              </h3>
              <p>
                本サービスの利用に関連して利用者に生じたトラブル、データの消失、端末の不具合、または損害について、運営者は故意または重大な過失がある場合を除き、一切の責任を負わないものとします。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                9. 規約の変更
              </h3>
              <p>
                運営者は、運営上の必要性や法改正等に応じて、利用者に個別の承諾を得なくとも本規約をいつでも変更できるものとします。変更後の規約は当サイト上に掲載された時点より適用されます。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                10. 準拠法および管轄裁判所
              </h3>
              <p>
                本規約の解釈にあたっては日本法を準拠法とします。本サービスまたは本規約に関して生じた一切の紛争については、運営者の所在地を管轄する地方裁判所または簡易裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#171725] text-sm tracking-wide mb-1.5">
                11. お問い合わせについて
              </h3>
              <p>
                現在、本サイト上に公開されている公式メールアドレス等の連絡先窓口は未確定（未設定）です。また、お問い合わせフォームからのデータ送信機能は現在準備中のため提供されておりません。お問い合わせ窓口の準備が整い次第、本ページにて案内いたします。
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
