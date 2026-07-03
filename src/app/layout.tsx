import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "IKONOIJOY TUNE | 今のあなたに、いちばん似合う音楽を。",
  description: "気分、時間、天気、推しメンから、今のあなたに合うイコノイジョイの一曲を選びます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="h-full antialiased"
    >
      <body className="font-sans min-h-screen flex justify-center bg-[#E5E9F4] text-[#171725] relative overflow-x-hidden">
        {/* Soft floating background glow effects visible on desktop and leaking into app margins */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Light Sphere 1: Lavender/Blue */}
          <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-[#B9A7FF]/20 to-[#93C5FD]/20 blur-[80px] animate-float-light-1" />
          {/* Light Sphere 2: Pink/Mint */}
          <div className="absolute bottom-[15%] right-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-[#F9A8D4]/15 to-[#9FE7D7]/15 blur-[90px] animate-float-light-2" />
        </div>

        {/* Centralized Web App Container (Max width 480px for standard mobile, 1200px for desktop) */}
        <div className="relative z-10 w-full max-w-[480px] lg:max-w-[1200px] min-h-screen bg-[#F8F9FD]/90 backdrop-blur-xl border-x border-[rgba(80,84,120,0.12)] shadow-2xl flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
