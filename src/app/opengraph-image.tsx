import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'IKONOIJOY TUNE | 今のあなたに、いちばん似合う音楽を。';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #B9A7FF 0%, #F9A8D4 50%, #93C5FD 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Glow ball accents overlay */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '50px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Abstract waveforms decoration */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '50px', alignItems: 'center' }}>
          {[16, 32, 24, 64, 40, 72, 32, 56, 24, 48, 16].map((h, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: `${h}px`,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                borderRadius: '4px',
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            color: '#171725',
            letterSpacing: '14px',
            marginBottom: '24px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          IKONOIJOY TUNE
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '30px',
            fontWeight: 500,
            color: '#171725',
            letterSpacing: '3px',
            opacity: 0.9,
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          今のあなたに、いちばん似合う音楽を。
        </div>

        {/* Unofficial Tag */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgba(23, 23, 37, 0.45)',
            letterSpacing: '3px',
          }}
        >
          非公式ファン制作Webアプリ
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
