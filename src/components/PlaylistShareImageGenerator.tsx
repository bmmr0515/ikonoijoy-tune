'use client';

import React, { useRef, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PlaylistResult } from '../utils/tuneEngine';

interface PlaylistShareImageGeneratorProps {
  playlist: PlaylistResult;
  mood: string;
  weather: string;
  timeOfDay: string;
  season: string;
}

export default function PlaylistShareImageGenerator({
  playlist,
  mood,
  weather,
  timeOfDay,
  season,
}: PlaylistShareImageGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getMoodLabel = (m: string) => {
    const mapping: Record<string, string> = {
      energetic: '元気になりたい',
      hype: '高まりたい',
      calm: '落ち着きたい',
      sad: '泣きたい',
      romantic: '恋を感じたい',
      support: '背中を押してほしい',
    };
    return mapping[m] || '自然体';
  };

  const getWeatherLabel = (w: string) => {
    const mapping: Record<string, string> = {
      sunny: '晴れ',
      cloudy: '曇り',
      rainy: '雨',
      snowy: '雪',
      hot: '暑い日',
      cold: '寒い日',
    };
    return mapping[w] || '穏やか';
  };

  const getTimeLabel = (t: string) => {
    const mapping: Record<string, string> = {
      morning: '朝',
      afternoon: '昼',
      evening: '夕暮れ',
      night: '夜',
    };
    return mapping[t] || 'いつでも';
  };

  const getSeasonLabel = (s: string) => {
    const mapping: Record<string, string> = {
      spring: '春',
      summer: '夏',
      autumn: '秋',
      winter: '冬',
    };
    return mapping[s] || '通年';
  };

  const drawAndDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setGenerating(true);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setGenerating(false);
      return;
    }

    // Canvas size (1080 x 1350)
    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    // 1. Draw base soft gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#F8F9FD');
    bgGrad.addColorStop(1, '#E9ECF5');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Three colored spheres for the background (Lavender, Blue, Pink)
    const radialGrad1 = ctx.createRadialGradient(W * 0.2, H * 0.2, 50, W * 0.2, H * 0.2, 450);
    radialGrad1.addColorStop(0, '#B9A7FFA0'); // lavender (A0 = ~60% opacity)
    radialGrad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = radialGrad1;
    ctx.beginPath();
    ctx.arc(W * 0.2, H * 0.2, 450, 0, Math.PI * 2);
    ctx.fill();

    const radialGrad2 = ctx.createRadialGradient(W * 0.8, H * 0.8, 80, W * 0.8, H * 0.8, 550);
    radialGrad2.addColorStop(0, '#F9A8D490'); // pink
    radialGrad2.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = radialGrad2;
    ctx.beginPath();
    ctx.arc(W * 0.8, H * 0.8, 550, 0, Math.PI * 2);
    ctx.fill();

    const radialGrad3 = ctx.createRadialGradient(W * 0.5, H * 0.5, 30, W * 0.5, H * 0.5, 350);
    radialGrad3.addColorStop(0, '#93C5FD75'); // skyblue
    radialGrad3.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = radialGrad3;
    ctx.beginPath();
    ctx.arc(W * 0.5, H * 0.5, 350, 0, Math.PI * 2);
    ctx.fill();

    // Wave lines
    ctx.strokeStyle = 'rgba(80, 84, 120, 0.04)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      let yOffset = H * 0.88 + i * 30;
      ctx.moveTo(0, yOffset);
      for (let x = 0; x <= W; x += 10) {
        let y = yOffset + Math.sin((x / 130) + i) * 15;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // 2. Draw Translucent White Floating Card in Center
    const cardX = 100;
    const cardY = 160;
    const cardW = W - 200; // 880
    const cardH = H - 360; // 990
    const cardR = 50;

    ctx.save();
    ctx.shadowColor = 'rgba(23, 23, 37, 0.04)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 15;
    
    ctx.beginPath();
    ctx.moveTo(cardX + cardR, cardY);
    ctx.lineTo(cardX + cardW - cardR, cardY);
    ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + cardR);
    ctx.lineTo(cardX + cardW, cardY + cardH - cardR);
    ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - cardR, cardY + cardH);
    ctx.lineTo(cardX + cardR, cardY + cardH);
    ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - cardR);
    ctx.lineTo(cardX, cardY + cardR);
    ctx.quadraticCurveTo(cardX, cardY, cardX + cardR, cardY);
    ctx.closePath();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = 'rgba(80, 84, 120, 0.1)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Font declarations
    const fontTitle = '"Inter", "Helvetica", "Arial", sans-serif';
    const fontBody = '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif';

    // 3. Card Title Block
    ctx.fillStyle = '#6E7180';
    ctx.font = `bold 24px ${fontTitle}`;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '5px';
    ctx.fillText('YOUR PLAYLIST FOR THIS MOMENT', W / 2, cardY + 80);

    ctx.fillStyle = '#171725';
    ctx.font = `bold 32px ${fontBody}`;
    ctx.letterSpacing = '0.5px';
    ctx.fillText(playlist.title, W / 2, cardY + 140);

    // Separator
    ctx.strokeStyle = 'rgba(80, 84, 120, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 200, cardY + 185);
    ctx.lineTo(W / 2 + 200, cardY + 185);
    ctx.stroke();

    // 4. Render Tracks List
    const trackX = cardX + 60;
    const trackW = cardW - 120; // 760
    const startY = cardY + 230;
    const rowH = 115;

    playlist.tracks.forEach((track, index) => {
      const { song, role } = track;
      const currentY = startY + index * (rowH + 20);

      // Draw subtle row outline card
      ctx.fillStyle = 'rgba(248, 249, FD, 0.6)';
      ctx.beginPath();
      ctx.roundRect?.(trackX, currentY, trackW, rowH, 20);
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(80, 84, 120, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Number box
      ctx.fillStyle = '#EBEFFD';
      ctx.beginPath();
      ctx.roundRect?.(trackX + 25, currentY + rowH / 2 - 25, 50, 50, 12);
      ctx.fill();

      ctx.fillStyle = '#B9A7FF';
      ctx.font = `bold 22px ${fontTitle}`;
      ctx.textAlign = 'center';
      ctx.fillText(String(index + 1).padStart(2, '0'), trackX + 50, currentY + rowH / 2 + 8);

      // Song Meta Details
      const groupName = song.group === 'equal-love' ? '＝LOVE' : song.group === 'not-equal-me' ? '≠ME' : song.group === 'nearly-equal-joy' ? '≒JOY' : 'イコノイジョイ';
      
      // Group name & Role badge
      ctx.textAlign = 'left';
      ctx.font = `bold 16px ${fontBody}`;
      ctx.fillStyle = '#6E7180';
      ctx.fillText(groupName, trackX + 105, currentY + 38);

      // Draw role badge text
      ctx.font = `bold 14px ${fontBody}`;
      ctx.fillStyle = '#B9A7FF';
      ctx.fillText(`[ ${role} ]`, trackX + 115 + ctx.measureText(groupName).width, currentY + 38);

      // Track Title
      ctx.fillStyle = '#171725';
      ctx.font = `bold 24px ${fontBody}`;
      ctx.fillText(song.title, trackX + 105, currentY + 78);
    });

    // 5. Footer tags
    ctx.fillStyle = 'rgba(80, 84, 120, 0.04)';
    const tagBarY = cardY + cardH - 100;
    const tagBarH = 65;
    const barX = cardX + 50;
    const barW = cardW - 100;
    ctx.beginPath();
    ctx.roundRect?.(barX, tagBarY, barW, tagBarH, 15);
    ctx.fill();

    ctx.fillStyle = '#6E7180';
    ctx.font = `500 19px ${fontBody}`;
    ctx.textAlign = 'center';
    
    const dateStr = new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const tagText = `${dateStr}  |  ${getTimeLabel(timeOfDay)}  |  天気: ${getWeatherLabel(weather)}  |  気分: ${getMoodLabel(mood)}  |  季節: ${getSeasonLabel(season)}`;
    ctx.fillText(tagText, W / 2, tagBarY + 41);

    // 6. Brand URL Info
    ctx.fillStyle = '#171725';
    ctx.font = `300 20px ${fontTitle}`;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '12px';
    ctx.fillText('IKONOIJOY TUNE', W / 2, H - 120);

    ctx.fillStyle = '#6E7180';
    ctx.font = `light 14px ${fontTitle}`;
    ctx.letterSpacing = '3px';
    ctx.fillText('ikonoijoy-tune.web.app', W / 2, H - 75);

    // Save download
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `ikonoijoy-playlist-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setGenerating(false);
    }, 500);
  };

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} className="hidden" />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={drawAndDownload}
        disabled={generating}
        className="flex items-center justify-center gap-2 h-13 px-6 rounded-2xl bg-white border border-[rgba(80,84,120,0.12)] text-[#171725] text-xs font-semibold shadow-sm hover:border-[#B9A7FF]/40 active:bg-slate-50 smooth-transition disabled:opacity-75 cursor-pointer w-full"
      >
        {generating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#B9A7FF]" />
            画像を生成中...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-[#B9A7FF]" />
            結果を保存する
          </>
        )}
      </motion.button>
    </div>
  );
}
