'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';
import { PlaylistResult } from '../utils/tuneEngine';
import FeedbackSection from './FeedbackSection';
import PlaylistShareImageGenerator from './PlaylistShareImageGenerator';

interface PlaylistResultCardProps {
  playlist: PlaylistResult;
  answers: {
    mood?: string;
    weather?: string;
    timeOfDay?: string;
    season?: string;
  };
  onReset: () => void;
}

export default function PlaylistResultCard({
  playlist,
  answers,
  onReset,
}: PlaylistResultCardProps) {
  const mood = answers.mood || 'none';
  const weather = answers.weather || 'sunny';
  const time = answers.timeOfDay || 'evening';
  const season = answers.season || 'all_seasons';

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

  const handleShare = () => {
    let tracksText = '';
    playlist.tracks.forEach((t, i) => {
      const groupName = t.song.group === 'equal-love' ? '＝LOVE' : t.song.group === 'not-equal-me' ? '≠ME' : t.song.group === 'nearly-equal-joy' ? '≒JOY' : 'イコノイジョイ';
      tracksText += `${i + 1}. ${t.song.title} (${groupName}) - ${t.role}\n`;
    });

    const text = `今の私にいちばん似合うイコノイジョイのプレイリスト：\n「${playlist.title}」を作りました！\n\n${tracksText}\n#IKONOIJOYTUNE #イコノイジョイ\n`;
    const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ikonoijoy-tune.web.app';
    const finalUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'はじまりの曲':
        return 'bg-blue-50 text-blue-500 border-blue-100';
      case '気分を深める曲':
        return 'bg-purple-50 text-purple-500 border-purple-100';
      case '中心になる曲':
        return 'bg-pink-50 text-pink-500 border-pink-100';
      case '少し風向きを変える曲':
        return 'bg-amber-50 text-amber-500 border-amber-100';
      case '余韻を残す曲':
        return 'bg-emerald-50 text-emerald-500 border-emerald-100';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-6"
    >
      <div className="text-center">
        <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase">
          YOUR PLAYLIST FOR THIS MOMENT
        </span>
        <h2 className="text-lg md:text-xl font-bold text-[#171725] tracking-wide mt-2 px-2 leading-snug">
          {playlist.title}
        </h2>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
        
        {/* Left Column: Playlist concept & tracks card */}
        <div className="flex flex-col gap-6 w-full">
          {/* Playlist description and reason */}
          {playlist.description && (
            <div className="bg-white/40 p-4 rounded-2xl border border-[rgba(80,84,120,0.06)] text-xs text-[#6E7180] leading-relaxed text-justify px-4">
              <span className="text-[9px] font-bold text-[#B9A7FF] uppercase tracking-wider block mb-1">選定コンセプト</span>
              <p>{playlist.description}</p>
            </div>
          )}

          {/* Playlist tracks container card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[28px] border border-[rgba(80,84,120,0.12)] shadow-lg p-5 flex flex-col gap-4">
            {playlist.tracks.map((track, i) => {
              const { song, role } = track;
              const groupName = song.group === 'equal-love' ? '＝LOVE' : song.group === 'not-equal-me' ? '≠ME' : song.group === 'nearly-equal-joy' ? '≒JOY' : 'イコノイジョイ';
              
              return (
                <div
                  key={song.id}
                  className="flex flex-col p-4 rounded-2xl bg-white/40 border border-[rgba(80,84,120,0.04)] shadow-2xs hover:bg-white/70 smooth-transition"
                >
                  {/* Header track meta details */}
                  <div className="flex items-start gap-3.5 w-full">
                    <div className="w-7 h-7 rounded-lg bg-[#F8F9FD] border border-[rgba(80,84,120,0.06)] text-[10px] font-title font-bold text-[#B9A7FF] flex items-center justify-center shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center flex-wrap gap-1.5">
                        <span className="text-[9px] font-semibold text-[#6E7180]">
                          {groupName}
                        </span>
                        <span
                          className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${getRoleBadgeStyle(
                            role
                          )}`}
                        >
                          {role}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#171725] mt-1">
                        {song.title}
                      </span>
                    </div>
                  </div>

                  {/* Selection reason (songImpression) */}
                  {song.recommendation?.songImpression && (
                    <div className="mt-2.5 pl-10.5 border-t border-[rgba(80,84,120,0.03)] pt-2">
                      <p className="text-[10px] text-[#6E7180] leading-relaxed text-justify">
                        {song.recommendation.songImpression}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile version controls (Only visible on lg:hidden) */}
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto lg:hidden pt-2 border-t border-slate-100">
            <PlaylistShareImageGenerator
              playlist={playlist}
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
                onClick={onReset}
                className="flex items-center justify-center gap-1.5 h-12 rounded-2xl bg-[#171725] text-white text-xs font-semibold shadow-sm hover:bg-black/95 smooth-transition cursor-pointer"
              >
                別のプレイリストを作る
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

        {/* Right Column: Conditions, tag list, action buttons, feedback (For Desktop layout) */}
        <div className="flex flex-col gap-6 w-full">
          
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
          </div>

          {/* Desktop version controls (Only visible on lg:flex) */}
          <div className="hidden lg:flex flex-col gap-3 w-full">
            <PlaylistShareImageGenerator
              playlist={playlist}
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
                onClick={onReset}
                className="flex items-center justify-center gap-1.5 h-12 rounded-2xl bg-[#171725] text-white text-xs font-semibold shadow-sm hover:bg-black/95 smooth-transition cursor-pointer"
              >
                別のプレイリストを作る
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

          {/* User Feedback */}
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
