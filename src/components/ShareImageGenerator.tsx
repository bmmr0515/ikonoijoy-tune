'use client';

import React, { useRef, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Song } from '../data/songs';

interface ShareImageGeneratorProps {
  song: Song;
  mood: string;
  weather: string;
  timeOfDay: string;
  season: string;
}

export default function ShareImageGenerator({
  song,
  mood,
  weather,
  timeOfDay,
  season,
}: ShareImageGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getGroupColors = (group: 'equal-love' | 'not-equal-me' | 'nearly-equal-joy' | 'joint') => {
    switch (group) {
      case 'equal-love':
        return ['#F9A8D4', '#B9A7FF', '#FCE7F3']; // Pink, Lavender, soft pink
      case 'not-equal-me':
        return ['#93C5FD', '#E2E8F0', '#DBEAFE']; // Skyblue, Silver-grey, soft blue
      case 'nearly-equal-joy':
        return ['#9FE7D7', '#FDE68A', '#ECFDF5']; // Mint, Yellow, soft emerald
      case 'joint':
        return ['#D8B4FE', '#818CF8', '#F3E8FF']; // Lavender, Indigo, Soft Lavender
      default:
        return ['#B9A7FF', '#93C5FD', '#F9A8D4']; // Lavender, Skyblue, Pink
    }
  };

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

    // 1. Draw dynamic abstract gradient background based on group colorway
    const colors = getGroupColors(song.group);
    
    // Fill background with a base gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#F8F9FD');
    bgGrad.addColorStop(1, '#E9ECF5');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Draw fuzzy glow balls for premium abstract texture
    // Orb 1
    const radialGrad1 = ctx.createRadialGradient(W * 0.25, H * 0.25, 50, W * 0.25, H * 0.25, 450);
    radialGrad1.addColorStop(0, colors[0] + '35'); // Add transparency (hex + 35 = 20% opacity)
    radialGrad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = radialGrad1;
    ctx.beginPath();
    ctx.arc(W * 0.25, H * 0.25, 450, 0, Math.PI * 2);
    ctx.fill();

    // Orb 2
    const radialGrad2 = ctx.createRadialGradient(W * 0.75, H * 0.75, 80, W * 0.75, H * 0.75, 550);
    radialGrad2.addColorStop(0, colors[1] + '30');
    radialGrad2.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = radialGrad2;
    ctx.beginPath();
    ctx.arc(W * 0.75, H * 0.75, 550, 0, Math.PI * 2);
    ctx.fill();

    // Orb 3 (Secondary decoration)
    const radialGrad3 = ctx.createRadialGradient(W * 0.5, H * 0.5, 30, W * 0.5, H * 0.5, 350);
    radialGrad3.addColorStop(0, colors[2] + '25');
    radialGrad3.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = radialGrad3;
    ctx.beginPath();
    ctx.arc(W * 0.5, H * 0.5, 350, 0, Math.PI * 2);
    ctx.fill();

    // Draw some subtle waveform lines to represent music in background
    ctx.strokeStyle = 'rgba(80, 84, 120, 0.05)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      let yOffset = H * 0.85 + i * 35;
      ctx.moveTo(0, yOffset);
      for (let x = 0; x <= W; x += 10) {
        let y = yOffset + Math.sin((x / 140) + i) * 20;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // 2. Draw Translucent White Floating Card in Center
    const cardX = 100;
    const cardY = 160;
    const cardW = W - 200; // 880
    const cardH = H - 360; // 990
    const cardR = 50; // Rounded corners radius

    ctx.save();
    ctx.shadowColor = 'rgba(23, 23, 37, 0.05)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 15;
    
    // Draw rounded rect path
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

    // Draw card border
    ctx.strokeStyle = 'rgba(80, 84, 120, 0.1)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3. Render Card Content (Texts)
    // Setup Font Families
    const fontTitle = '"Inter", "Helvetica", "Arial", sans-serif';
    const fontBody = '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif';

    // Subtitle on Card Header
    ctx.fillStyle = '#6E7180';
    ctx.font = `bold 24px ${fontTitle}`;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '5px';
    ctx.fillText('YOUR TUNE FOR THIS MOMENT', W / 2, cardY + 80);

    // Separator line
    ctx.strokeStyle = 'rgba(80, 84, 120, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 120, cardY + 115);
    ctx.lineTo(W / 2 + 120, cardY + 115);
    ctx.stroke();

    // 4. Large Abstract Album Art (Mini gradient box inside the card for visual balance)
    const artW = 400;
    const artH = 400;
    const artX = W / 2 - artW / 2;
    const artY = cardY + 160;
    const artR = 30;

    ctx.save();
    // Clip rounded rect path
    ctx.beginPath();
    ctx.moveTo(artX + artR, artY);
    ctx.lineTo(artX + artW - artR, artY);
    ctx.quadraticCurveTo(artX + artW, artY, artX + artW, artY + artR);
    ctx.lineTo(artX + artW, artY + artH - artR);
    ctx.quadraticCurveTo(artX + artW, artY + artH, artX + artW - artR, artY + artH);
    ctx.lineTo(artX + artR, artY + artH);
    ctx.quadraticCurveTo(artX, artY + artH, artX, artY + artH - artR);
    ctx.lineTo(artX, artY + artR);
    ctx.quadraticCurveTo(artX, artY, artX + artR, artY);
    ctx.closePath();
    ctx.clip();

    // Fill Album art with dynamic gradient
    const artGrad = ctx.createLinearGradient(artX, artY, artX + artW, artY + artH);
    artGrad.addColorStop(0, colors[0]);
    artGrad.addColorStop(0.5, colors[2]);
    artGrad.addColorStop(1, colors[1]);
    ctx.fillStyle = artGrad;
    ctx.fillRect(artX, artY, artW, artH);
    
    // Draw abstract geometric glass bubble overlay inside art
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(artX + artW * 0.3, artY + artH * 0.3, 110, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.restore();

    // 5. Group Name & Song Title
    const groupName = song.group === 'equal-love' ? '＝LOVE' : song.group === 'not-equal-me' ? '≠ME' : song.group === 'nearly-equal-joy' ? '≒JOY' : 'イコノイジョイ';
    ctx.fillStyle = '#6E7180';
    ctx.font = `600 22px ${fontBody}`;
    ctx.letterSpacing = '1px';
    ctx.fillText(groupName, W / 2, artY + artH + 60);

    ctx.fillStyle = '#171725';
    ctx.font = `bold 42px ${fontBody}`;
    ctx.letterSpacing = '0.5px';
    // Handle very long song names with ellipsis or size check if needed (most fit within 880px)
    ctx.fillText(song.title, W / 2, artY + artH + 120);

    // 6. Recommendation Reason (Fold text into multiple lines)
    ctx.fillStyle = '#6E7180';
    ctx.font = `400 22px ${fontBody}`;
    ctx.textAlign = 'left';
    
    // Resolve variant recommendation text
    const getRecommendationText = () => {
      const variants = song.recommendationVariants || [];
      const targetConditions = [mood, weather, timeOfDay].filter(Boolean);
      const matched = variants.find(v => targetConditions.includes(v.condition));
      return matched ? matched.text : song.recommendation.recommendationText;
    };
    const reasonText = getRecommendationText();
    const maxTextW = cardW - 120; // 760
    const reasonX = W / 2 - maxTextW / 2;
    const reasonY = artY + artH + 185;
    
    // Helper function to draw multiline texts
    const words = reasonText.split('');
    let line = '';
    let currentY = reasonY;
    
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n];
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      
      if (testWidth > maxTextW && n > 0) {
        ctx.fillText(line, reasonX, currentY);
        line = words[n];
        currentY += 42; // line spacing
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, reasonX, currentY);

    // 7. Render Context tags in bottom row of the card
    ctx.fillStyle = 'rgba(80, 84, 120, 0.04)';
    const tagBarY = cardY + cardH - 100;
    const tagBarH = 65;
    
    // Rounded bar path for tags
    const barX = cardX + 50;
    const barW = cardW - 100;
    ctx.beginPath();
    ctx.roundRect?.(barX, tagBarY, barW, tagBarH, 15);
    ctx.fill();

    // Render tag texts
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

    // 8. Footer (Outside the white card)
    // Brand Logo Name on bottom left/center
    ctx.fillStyle = '#171725';
    ctx.font = `300 20px ${fontTitle}`;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '12px';
    ctx.fillText('IKONOIJOY TUNE', W / 2, H - 120);

    ctx.fillStyle = '#6E7180';
    ctx.font = `light 14px ${fontTitle}`;
    ctx.letterSpacing = '3px';
    ctx.fillText('ikonoijoy-tune.web.app', W / 2, H - 75);

    // 9. Trigger download after drawing is complete
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `ikonoijoy-tune-${song.id}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setGenerating(false);
    }, 500);
  };

  return (
    <div className="w-full flex justify-center">
      {/* Hidden working canvas */}
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
