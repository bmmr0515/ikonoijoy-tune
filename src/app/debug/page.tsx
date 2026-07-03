'use client';

import React, { useMemo } from 'react';
import { notFound } from 'next/navigation';
import { AlertTriangle, CheckCircle, ShieldAlert, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Song, songs } from '../../data/songs';

const VALID_MOODS = ['happy', 'excited', 'calm', 'sad', 'lonely', 'romantic', 'motivated', 'nostalgic', 'confident', 'healing'];
const VALID_SITUATIONS = ['commute', 'study', 'work', 'walking', 'driving', 'relaxing', 'before_sleep', 'before_live', 'after_live', 'morning_routine'];
const VALID_WEATHER = ['sunny', 'cloudy', 'rainy', 'snowy', 'hot', 'cold'];
const VALID_TIME = ['morning', 'daytime', 'evening', 'night', 'late_night'];
const VALID_SEASONS = ['spring', 'summer', 'autumn', 'winter', 'all_seasons'];
const VALID_THEMES = ['love', 'unrequited_love', 'breakup', 'friendship', 'youth', 'dream', 'challenge', 'self_acceptance', 'gratitude', 'memories'];
const VALID_TEMPOS = ['slow', 'medium', 'upbeat'];
const VALID_PLAYLIST_ROLES = ['opening', 'build_up', 'peak', 'change', 'cool_down', 'ending'];

interface ValidationResult {
  songId: string;
  songTitle: string;
  errors: string[];
}

export default function DebugSongsPage() {
  // Enforce development environment block
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) {
    notFound();
  }

  // Validate all songs in the database
  const validationResults = useMemo<ValidationResult[]>(() => {
    return songs.map((song) => {
      const errors: string[] = [];

      // 1. Validate Scores (must be 1-5 integer)
      Object.entries(song.scores).forEach(([scoreKey, val]) => {
        if (typeof val !== 'number') {
          errors.push(`スコア「${scoreKey}」は数値である必要があります。`);
        } else if (val < 1 || val > 5 || !Number.isInteger(val)) {
          errors.push(`スコア「${scoreKey}」が範囲外です（値: ${val}）。1〜5の整数で指定してください。`);
        }
      });

      // 2. Validate tag definitions
      song.tags.moods.forEach((t) => {
        if (!VALID_MOODS.includes(t)) {
          errors.push(`定義外のMoodタグ「${t}」が使用されています。`);
        }
      });
      song.tags.situations.forEach((t) => {
        if (!VALID_SITUATIONS.includes(t)) {
          errors.push(`定義外のSituationタグ「${t}」が使用されています。`);
        }
      });
      song.tags.weather.forEach((t) => {
        if (!VALID_WEATHER.includes(t)) {
          errors.push(`定義外のWeatherタグ「${t}」が使用されています。`);
        }
      });
      song.tags.timeOfDay.forEach((t) => {
        if (!VALID_TIME.includes(t)) {
          errors.push(`定義外のTimeOfDayタグ「${t}」が使用されています。`);
        }
      });
      song.tags.seasons.forEach((t) => {
        if (!VALID_SEASONS.includes(t)) {
          errors.push(`定義外のSeasonタグ「${t}」が使用されています。`);
        }
      });
      song.tags.themes.forEach((t) => {
        if (!VALID_THEMES.includes(t)) {
          errors.push(`定義外のThemeタグ「${t}」が使用されています。`);
        }
      });
      song.tags.tempos.forEach((t) => {
        if (!VALID_TEMPOS.includes(t)) {
          errors.push(`定義外のTempoタグ「${t}」が使用されています。`);
        }
      });
      song.tags.playlistRoles.forEach((t) => {
        if (!VALID_PLAYLIST_ROLES.includes(t)) {
          errors.push(`定義外のPlaylistRoleタグ「${t}」が使用されています。`);
        }
      });

      return {
        songId: song.id,
        songTitle: song.title,
        errors,
      };
    });
  }, []);

  const totalErrors = useMemo(() => {
    return validationResults.reduce((acc, r) => acc + r.errors.length, 0);
  }, [validationResults]);

  const getGroupLabel = (group: string) => {
    switch (group) {
      case 'equal-love': return '＝LOVE';
      case 'not-equal-me': return '≠ME';
      case 'nearly-equal-joy': return '≒JOY';
      case 'joint': return 'イコノイジョイ';
      default: return group;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-[#171725] px-4 py-8 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* Header navigation */}
        <div className="flex items-center justify-between border-b pb-4 border-[rgba(80,84,120,0.1)]">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl bg-white border border-[rgba(80,84,120,0.12)] text-[#6E7180] hover:text-[#171725] smooth-transition shadow-2xs">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase block">
                DEVELOPER TOOL
              </span>
              <h1 className="text-xl font-bold tracking-tight">
                楽曲データベース デバッグ & 検証画面
              </h1>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 border text-[#6E7180]">
            Development Env
          </span>
        </div>

        {/* General status panel */}
        <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
          totalErrors > 0 
            ? 'bg-rose-50 border-rose-200 text-rose-800' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {totalErrors > 0 ? (
            <ShieldAlert className="w-8 h-8 text-rose-500 shrink-0 animate-bounce" />
          ) : (
            <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
          )}
          <div>
            <h3 className="font-bold text-sm">
              {totalErrors > 0 ? 'データに警告・不整合が検出されました' : 'データベースは正常です'}
            </h3>
            <p className="text-xs opacity-90 mt-0.5">
              {totalErrors > 0 
                ? `現在、合計 ${totalErrors} 件の不整合が見つかりました。以下の赤枠の楽曲データをご確認ください。` 
                : 'すべてのスコア（1〜5）および使用されているタグは、定義に準拠しています。'}
            </p>
          </div>
        </div>

        {/* Validation Errors List (Only displayed when there are errors) */}
        {totalErrors > 0 && (
          <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-rose-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              検出されたエラー詳細
            </h2>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
              {validationResults
                .filter(r => r.errors.length > 0)
                .map(r => (
                  <div key={r.songId} className="text-xs border-b border-rose-100 pb-2 last:border-0 last:pb-0">
                    <span className="font-bold text-rose-700 block mb-1">【{r.songTitle}】</span>
                    <ul className="list-disc pl-5 flex flex-col gap-1 text-slate-700">
                      {r.errors.map((e, idx) => (
                        <li key={idx}>{e}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Interactive songs cards grid */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold text-[#171725] tracking-wide px-1">
            楽曲データ一覧 ({songs.length} 曲)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {songs.map((song) => {
              const result = validationResults.find(r => r.songId === song.id);
              const hasErr = result && result.errors.length > 0;

              return (
                <div
                  key={song.id}
                  className={`bg-white rounded-[24px] border p-5 flex flex-col gap-4 shadow-sm smooth-transition ${
                    hasErr ? 'border-rose-400 bg-rose-50/5' : 'border-[rgba(80,84,120,0.08)]'
                  }`}
                >
                  {/* Top card block */}
                  <div className="flex justify-between items-start border-b border-[rgba(80,84,120,0.05)] pb-3">
                    <div>
                      <span className="text-[9px] font-bold text-[#6E7180] bg-[#F8F9FD] border px-2 py-0.5 rounded-md">
                        {getGroupLabel(song.group)}
                      </span>
                      <h3 className="font-bold text-base text-[#171725] mt-1">{song.title}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 text-[9px] font-semibold">
                      <span className={`px-2 py-0.5 rounded-full border ${
                        song.enabled 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {song.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border ${
                        song.factualData.verificationStatus === 'verified' 
                          ? 'bg-blue-50 text-blue-600 border-blue-100' 
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {song.factualData.verificationStatus}
                      </span>
                    </div>
                  </div>

                  {/* 1. Scores block */}
                  <div>
                    <span className="text-[10px] font-bold text-[#6E7180] tracking-wider block mb-1">SCORE METRICS (1-5)</span>
                    <div className="grid grid-cols-4 gap-1.5 text-[10px] bg-[#F8F9FD] p-2.5 rounded-xl border border-[rgba(80,84,120,0.04)] font-mono">
                      {Object.entries(song.scores).map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center px-1">
                          <span className="text-[#6E7180] truncate text-[9px] mr-1">{k}:</span>
                          <span className="font-bold text-[#171725]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Tags block */}
                  <div>
                    <span className="text-[10px] font-bold text-[#6E7180] tracking-wider block mb-1.5">TAGS ARRAY</span>
                    <div className="flex flex-col gap-1.5 text-[9px]">
                      <div className="flex items-start gap-1">
                        <span className="font-bold text-[#6E7180] w-14 shrink-0 mt-0.5">Moods:</span>
                        <div className="flex flex-wrap gap-1">
                          {song.tags.moods.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="font-bold text-[#6E7180] w-14 shrink-0 mt-0.5">Scenes:</span>
                        <div className="flex flex-wrap gap-1">
                          {song.tags.situations.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="font-bold text-[#6E7180] w-14 shrink-0 mt-0.5">Weather:</span>
                        <div className="flex flex-wrap gap-1">
                          {song.tags.weather.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-100">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="font-bold text-[#6E7180] w-14 shrink-0 mt-0.5">Times:</span>
                        <div className="flex flex-wrap gap-1">
                          {song.tags.timeOfDay.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="font-bold text-[#6E7180] w-14 shrink-0 mt-0.5">Seasons:</span>
                        <div className="flex flex-wrap gap-1">
                          {song.tags.seasons.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="font-bold text-[#6E7180] w-14 shrink-0 mt-0.5">Themes:</span>
                        <div className="flex flex-wrap gap-1">
                          {song.tags.themes.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Recommendation block */}
                  <div className="bg-[#F8F9FD] p-3 rounded-xl border border-[rgba(80,84,120,0.04)] text-xs flex flex-col gap-2.5">
                    <div>
                      <span className="font-bold text-[#171725] text-[10px] block mb-0.5">📝 基本推薦文</span>
                      <p className="text-[#6E7180] leading-relaxed text-justify">{song.recommendation.recommendationText}</p>
                    </div>

                    {song.recommendationVariants && song.recommendationVariants.length > 0 && (
                      <div className="border-t border-slate-200/50 pt-2 flex flex-col gap-1.5">
                        <span className="font-bold text-[#171725] text-[10px] block">✨ バリエーション推薦文 ({song.recommendationVariants.length})</span>
                        {song.recommendationVariants.map((v, i) => (
                          <div key={i} className="bg-white/60 p-2 rounded-lg border border-[rgba(80,84,120,0.02)]">
                            <span className="font-bold text-[#B9A7FF] text-[9px] uppercase tracking-wider block mb-0.5">IF CONDITION: {v.condition}</span>
                            <p className="text-[#6E7180] text-[11px] leading-relaxed">{v.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>


                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
