import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  if (!isMaintenance) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // 静的アセットや画像、アイコン、および指定の除外法的ページはメンテナンス中もアクセス可能にする
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') || // favicon.ico, icon.svg などの静的ファイル
    pathname === '/privacy' ||
    pathname === '/terms' ||
    pathname === '/disclaimer' ||
    pathname === '/contact'
  ) {
    return NextResponse.next();
  }

  // APIリクエストの場合はJSONで503を返す
  if (pathname.startsWith('/api/')) {
    return new NextResponse(
      JSON.stringify({
        error: 'Service Unavailable',
        message: 'ただいまメンテナンス中です。推薦データの品質確認と調整のため、診断機能を一時停止しています。'
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Retry-After': '3600'
        }
      }
    );
  }

  // 通常のページリクエストの場合はプレミアムデザインの503 HTMLを返す
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>メンテナンス中 - IKONOIJOY TUNE</title>
  <meta name="robots" content="noindex, nofollow">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%);
      --accent-color: #ec4899;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Outfit', 'Noto Sans JP', sans-serif;
      background: var(--bg-gradient);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      overflow-x: hidden;
    }
    .container {
      max-width: 600px;
      width: 90%;
      text-align: center;
      padding: 40px;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.8s ease-out;
    }
    .icon-container {
      width: 80px;
      height: 80px;
      margin: 0 auto 30px;
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(236, 72, 153, 0.3);
      position: relative;
    }
    .icon {
      font-size: 32px;
      animation: pulse 2s infinite ease-in-out;
    }
    h1 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 20px;
      background: linear-gradient(to right, #f472b6, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.desc {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text-main);
      margin-bottom: 24px;
      font-weight: 400;
    }
    p.note {
      font-size: 0.95rem;
      color: var(--text-muted);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 24px;
      margin-bottom: 0;
    }
    .footer-links {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s;
    }
    .footer-links a:hover {
      color: var(--accent-color);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.1); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon-container">
      <span class="icon">⚙️</span>
    </div>
    <h1>ただいまメンテナンス中です</h1>
    <p class="desc">
      推薦データの品質確認と調整のため、診断機能を一時停止しています。<br>
      より安心して楽しめる状態に整えてから、公開を再開します。
    </p>
    <p class="note">
      ご不便をおかけしますが、しばらくお待ちください。
    </p>
    <div class="footer-links">
      <a href="/privacy">プライバシーポリシー</a>
      <a href="/terms">利用規約</a>
      <a href="/disclaimer">免責事項</a>
      <a href="/contact">お問い合わせ</a>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': '3600',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}

export const config = {
  // すべてのパスを横取りするが、法的ページ等は middleware の内部ロジックでスルーさせる
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
};
