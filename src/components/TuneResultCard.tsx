'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Song } from '../data/songs';
import FeedbackSection from './FeedbackSection';
import ShareImageGenerator from './ShareImageGenerator';

interface TuneResultCardProps {
  song: Song;
  answers: {
    mood?: string;
    weather?: string;
    timeOfDay?: string;
    season?: string;
  };
  onReset: () => void;
  onNextSong?: (prevSongId: string) => void;
}

export default function TuneResultCard({ song, answers, onReset, onNextSong }: TuneResultCardProps) {
  const mood = answers.mood || 'none';
  const weather = answers.weather || 'sunny';
  const time = answers.timeOfDay || 'evening';
  const season = answers.season || 'all_seasons';

  // Dynamic abstract gradient mapping
  const getGradientStyle = (group: 'equal-love' | 'not-equal-me' | 'nearly-equal-joy' | 'joint', m: string, w: string) => {
    let c1 = '#B9A7FF'; // Lavender
    let c2 = '#93C5FD'; // Sky Blue
    let c3 = '#F9A8D4'; // Pink

    if (group === 'equal-love') {
      c1 = '#F9A8D4'; // Soft Pink
      c2 = '#B9A7FF'; // Lavender
      c3 = '#FFF0F5'; // Lavender-Blush
    } else if (group === 'not-equal-me') {
      c1 = '#93C5FD'; // Sky Blue
      c2 = '#CBD5E1'; // Silver/Grey
      c3 = '#EFF6FF'; // Ice Blue
    } else if (group === 'nearly-equal-joy') {
      c1 = '#9FE7D7'; // Mint
      c2 = '#FDE68A'; // Yellow
      c3 = '#F0FDF4'; // Soft Emerald
    } else if (group === 'joint') {
      c1 = '#D8B4FE'; // Lavender
      c2 = '#818CF8'; // Indigo
      c3 = '#FAF5FF'; // Soft purple
    }

    if (w === 'rainy' || w === 'snowy') {
      c3 = '#A5B4FC';
    } else if (w === 'cold') {
      c2 = '#93C5FD';
    }

    if (m === 'sad') {
      c2 = '#4F46E5';
    } else if (m === 'hype') {
      c1 = '#F87171';
    }

    return {
      background: `linear-gradient(135deg, ${c1} 0%, ${c3} 50%, ${c2} 100%)`,
    };
  };

  const getMoodEmoji = (m: string) => {
    const mapping: Record<string, string> = {
      energetic: '☀️ 元気',
      hype: '🔥 高まり',
      calm: '🍃 落ち着き',
      sad: '☔ 泣きたい',
      romantic: '💖 恋',
      support: '🍃 背中押し',
      motivated: '🔥 背中押し',
      cute: '🎀 かわいい',
      playful: '🎉 遊び心',
    };
    return mapping[m] || '🍃 気分';
  };

  const getWeatherEmoji = (w: string) => {
    const mapping: Record<string, string> = {
      sunny: '☀️ 晴れ',
      cloudy: '☁️ 曇り',
      rainy: '☔ 雨',
      snowy: '❄️ 雪',
      hot: '🌡️ 暑い日',
      cold: '❄️ 寒い日',
    };
    return mapping[w] || '☁️ 天気';
  };

  const getTimeEmoji = (t: string) => {
    const mapping: Record<string, string> = {
      morning: '🌅 朝',
      afternoon: '☀️ 昼',
      daytime: '☀️ 昼',
      evening: '🌆 夕方',
      night: '🌌 夜',
      late_night: '🌌 深夜',
    };
    return mapping[t] || '🌌 時間';
  };

  const getSeasonEmoji = (s: string) => {
    const mapping: Record<string, string> = {
      spring: '🌸 春',
      summer: '🌻 夏',
      autumn: '🍁 秋',
      winter: '❄️ 冬',
    };
    return mapping[s] || '🍂 通年';
  };

  const getGroupLabel = (g: string) => {
    if (g === 'equal-love') return '＝LOVE';
    if (g === 'not-equal-me') return '≠ME';
    if (g === 'nearly-equal-joy') return '≒JOY';
    if (g === 'joint') return 'イコノイジョイ';
    return '';
  };

  const getRecommendationText = () => {
    const variants = song.recommendationVariants || [];
    const targetConditions = [mood, weather, time, season].filter(Boolean) as string[];
    const matched = variants.find((v) => targetConditions.includes(v.condition));
    return matched ? matched.text : song.recommendation.recommendationText;
  };

  const handleShare = () => {
    const groupLabel = getGroupLabel(song.group);
    const text = `今の私にいちばん似合うイコノイジョイの楽曲は、\n${groupLabel}「${song.title}」でした！\n\n【気分】${getMoodEmoji(mood)}\n【天気】${getWeatherEmoji(weather)}\n【時間】${getTimeEmoji(time)}\n【季節】${getSeasonEmoji(season)}\n\n今のあなたに、いちばん似合う音楽を。\n`;
    
    const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ikonoijoy-tune.web.app';
    const finalUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=IKONOIJOYTUNE,イコノイジョイ`;
    
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const groupLabel = getGroupLabel(song.group);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-6"
    >
      <div className="text-center">
        <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase">
          YOUR TUNE FOR THIS MOMENT
        </span>
      </div>

      {/* Main Layout Grid: Responsive 2 Columns on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
        
        {/* Left Column: Artwork, Title, Impression, Buttons */}
        <div className="bg-white/80 backdrop-blur-md rounded-[28px] border border-[rgba(80,84,120,0.12)] shadow-lg p-6 flex flex-col items-center text-center">
          {/* Dynamic Abstract Album Art */}
          <div
            style={getGradientStyle(song.group, mood, weather)}
            className="w-full max-w-[340px] aspect-square rounded-[20px] shadow-inner mb-6 relative overflow-hidden flex items-center justify-center border border-white/40"
          >
            <div className="absolute inset-4 rounded-full border border-white/20 animate-pulse pointer-events-none" />
            <div className="absolute w-[80%] h-[80%] rounded-full bg-white/5 backdrop-blur-[2px] pointer-events-none" />
            <Sparkles className="w-8 h-8 text-white/40 absolute" />
          </div>

          {/* Group Name & Title */}
          <div className="flex flex-col items-center gap-1.5 mb-5">
            <span className="text-xs font-semibold text-[#6E7180] tracking-wide">
              {groupLabel}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#171725] px-2 leading-snug">
              {song.title}
            </h2>
          </div>

          {/* Primary text info for mobile & PC Left */}
          <div className="w-full text-left border-t border-[rgba(80,84,120,0.06)] pt-4 mb-4 flex flex-col gap-4">
            <div>
              <span className="text-[9px] font-bold text-[#B9A7FF] uppercase tracking-wider block mb-1">おすすめ理由</span>
              <p className="text-xs text-[#171725] leading-relaxed text-justify">
                {getRecommendationText()}
              </p>
            </div>

            {song.recommendation.songImpression && (
              <div>
                <span className="text-[9px] font-bold text-[#B9A7FF] uppercase tracking-wider block mb-1">曲の雰囲気</span>
                <p className="text-xs text-[#6E7180] leading-relaxed text-justify">
                  {song.recommendation.songImpression}
                </p>
              </div>
            )}
          </div>

          {/* Mobile version controls (Only visible on lg:hidden) */}
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto lg:hidden border-t border-slate-100 pt-4 mt-2">
            <ShareImageGenerator
              song={song}
              mood={mood}
              weather={weather}
              timeOfDay={time}
              season={season}
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-white border border-[rgba(80,84,120,0.12)] text-[#171725] text-xs font-semibold shadow-sm hover:border-[#B9A7FF]/40 active:bg-slate-50 smooth-transition cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#B9A7FF]" />
                シェアする
              </button>

              <button
                onClick={() => onNextSong?.(song.id)}
                className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#171725] text-white text-xs font-semibold shadow-sm hover:bg-black/95 smooth-transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#B9A7FF]" />
                別の一曲を見る
              </button>
            </div>

            <button
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 h-11 text-xs font-semibold text-[#6E7180] hover:text-[#171725] smooth-transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              もう一度診断する
            </button>
          </div>
        </div>

        {/* Right Column: Diagnostic conditions, listening tips, tag list, feedback (Only on Desktop side, or maps as continuation on Mobile) */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* PC Layout Specific Content Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[28px] border border-[rgba(80,84,120,0.12)] shadow-lg p-6 flex flex-col gap-5">
            {/* Diagnostic Conditions Display */}
            <div>
              <span className="text-[9px] font-bold text-[#B9A7FF] uppercase tracking-wider block mb-2.5">今回の診断条件</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5">
                <div className="bg-[#F8F9FD]/50 border border-slate-100 rounded-xl p-3 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#6E7180] font-semibold uppercase tracking-wider">Vibe</span>
                  <span className="text-xs font-bold text-[#171725]">{getMoodEmoji(mood)}</span>
                </div>
                <div className="bg-[#F8F9FD]/50 border border-slate-100 rounded-xl p-3 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#6E7180] font-semibold uppercase tracking-wider">Weather</span>
                  <span className="text-xs font-bold text-[#171725]">{getWeatherEmoji(weather)}</span>
                </div>
                <div className="bg-[#F8F9FD]/50 border border-slate-100 rounded-xl p-3 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#6E7180] font-semibold uppercase tracking-wider">Time</span>
                  <span className="text-xs font-bold text-[#171725]">{getTimeEmoji(time)}</span>
                </div>
                <div className="bg-[#F8F9FD]/50 border border-slate-100 rounded-xl p-3 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#6E7180] font-semibold uppercase tracking-wider">Season</span>
                  <span className="text-xs font-bold text-[#171725]">{getSeasonEmoji(season)}</span>
                </div>
              </div>
            </div>

            {/* Listening Suggestion */}
            {song.recommendation.listeningSuggestion && (
              <div className="border-t border-slate-100 pt-4">
                <span className="text-[9px] font-bold text-[#B9A7FF] uppercase tracking-wider block mb-1">おすすめの聴き方</span>
                <p className="text-xs text-[#6E7180] leading-relaxed text-justify font-medium">
                  💡 {song.recommendation.listeningSuggestion}
                </p>
              </div>
            )}

            {/* Tag List */}
            <div className="border-t border-slate-100 pt-4">
              <span className="text-[9px] font-bold text-[#B9A7FF] uppercase tracking-wider block mb-2">関連タグ</span>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-semibold">
                {song.tags.moods.map(t => <span key={t} className="px-2 py-1 rounded bg-purple-50 text-purple-700 border border-purple-100">{t}</span>)}
                {song.tags.situations.map(t => <span key={t} className="px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100">{t}</span>)}
                {song.tags.weather.map(t => <span key={t} className="px-2 py-1 rounded bg-amber-50 text-amber-700 border border-amber-100">{t}</span>)}
                {song.tags.seasons.map(t => <span key={t} className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">{t}</span>)}
              </div>
            </div>
          </div>

          {/* Desktop version controls (Only visible on lg:flex) */}
          <div className="hidden lg:flex flex-col gap-3 w-full">
            <ShareImageGenerator
              song={song}
              mood={mood}
              weather={weather}
              timeOfDay={time}
              season={season}
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-white border border-[rgba(80,84,120,0.12)] text-[#171725] text-xs font-semibold shadow-sm hover:border-[#B9A7FF]/40 active:bg-slate-50 smooth-transition cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#B9A7FF]" />
                シェアする
              </button>

              <button
                onClick={() => onNextSong?.(song.id)}
                className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#171725] text-white text-xs font-semibold shadow-sm hover:bg-black/95 smooth-transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#B9A7FF]" />
                別の一曲を見る
              </button>
            </div>

            <button
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 h-11 text-xs font-semibold text-[#6E7180] hover:text-[#171725] smooth-transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              もう一度診断する
            </button>
          </div>

          {/* User Match Feedback UI */}
          <FeedbackSection />

          {/* Footer disclaimer */}
          <p className="text-[10px] text-[#6E7180] text-center opacity-75 font-medium leading-relaxed px-4">
            楽曲は、お使いの音楽配信サービスで曲名を検索してお楽しみください。
          </p>
        </div>

      </div>
    </motion.div>
  );
}
