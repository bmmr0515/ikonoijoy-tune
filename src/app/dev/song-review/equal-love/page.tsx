'use client';

import React, { useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, ShieldAlert, Music, HelpCircle, User, Users, ExternalLink } from 'lucide-react';
import { equalLoveSongs } from '../../../../data/songs/equal-love';
import { calculateScores, QuizAnswers, MoodAnswer } from '../../../../utils/tuneEngine';

export default function DevSongReviewPage() {
  // Enforce development environment block
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) {
    notFound();
  }

  // Dynamic 300 simulation check
  const simulationResults = useMemo(() => {
    const recommendedCounts: Record<string, number> = {};
    const moods: MoodAnswer[] = ['energetic', 'hype', 'calm', 'sad', 'romantic', 'motivated', 'cute', 'playful'];
    const scenes = ['home', 'commute', 'study', 'drive', 'live', 'sleep', 'getting_ready'];
    const weathers = ['sunny', 'cloudy', 'rainy', 'snowy', 'hot', 'cold'];
    const times = ['morning', 'daytime', 'evening', 'night'];
    const seasons = ['spring', 'summer', 'autumn', 'winter'];

    for (let i = 0; i < 300; i++) {
      const mood = moods[Math.floor(Math.random() * moods.length)];
      const scene = scenes[Math.floor(Math.random() * scenes.length)];
      const weather = weathers[Math.floor(Math.random() * weathers.length)];
      const timeOfDay = times[Math.floor(Math.random() * times.length)];
      const season = seasons[Math.floor(Math.random() * seasons.length)];

      const results = calculateScores({
        mood,
        scene,
        weather,
        timeOfDay,
        season,
        group: 'love'
      });

      if (results.length > 0) {
        const topSongId = results[0].id;
        recommendedCounts[topSongId] = (recommendedCounts[topSongId] || 0) + 1;
      }
    }
    return recommendedCounts;
  }, []);

  // Compute stats
  const stats = useMemo(() => {
    const total = equalLoveSongs.length;
    const recommended = equalLoveSongs.filter(s => s.enabledForRecommendation).length;
    const needsReview = equalLoveSongs.filter(s => s.factualData.verificationStatus === 'needs-review').length;
    const groupCount = equalLoveSongs.filter(s => s.category === 'group').length;
    const unitCount = equalLoveSongs.filter(s => s.category === 'unit').length;
    const soloCount = equalLoveSongs.filter(s => s.category === 'solo').length;

    const missingRecommendation = equalLoveSongs.filter(s => 
      !s.recommendation?.recommendationText || s.recommendation.recommendationText.trim().length === 0
    ).length;

    const insufficientTags = equalLoveSongs.filter(s => 
      s.tags.moods.length === 0 || s.tags.situations.length === 0
    ).length;

    const lowConfidence = equalLoveSongs.filter(s => (s.analysisBasis?.confidence ?? 0) < 70).length;

    const neverRecommended = equalLoveSongs.filter(s => 
      s.enabledForRecommendation && !simulationResults[s.id]
    ).map(s => s.title);

    const overRecommended = Object.entries(simulationResults).filter(([_, count]) => 
      count >= 20
    ).length;

    return {
      total,
      recommended,
      needsReview,
      groupCount,
      unitCount,
      soloCount,
      missingRecommendation,
      insufficientTags,
      lowConfidence,
      neverRecommended,
      overRecommended
    };
  }, [simulationResults]);

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-[#1E293B] px-4 py-10 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Navigation Head */}
        <div className="flex items-center justify-between border-b pb-5 border-slate-200">
          <div className="flex items-center gap-4">
            <Link href="/debug" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-[10px] tracking-widest font-bold text-pink-500 uppercase block">
                DEVELOPER QA TOOL
              </span>
              <h1 className="text-2xl font-bold tracking-tight mt-0.5">
                ＝LOVE 楽曲カタログ査定 & 推薦品質レビュー
              </h1>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100 shadow-sm">
            QA Mode: equal-love
          </span>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-pink-50 rounded-xl text-pink-500"><Music className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">現在の登録曲数</span>
              <span className="text-xl font-bold text-slate-800">{stats.total} 曲</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500"><CheckCircle className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">推薦対象曲</span>
              <span className="text-xl font-bold text-slate-800">{stats.recommended} 曲</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500"><AlertTriangle className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">要確認曲数</span>
              <span className="text-xl font-bold text-slate-800">{stats.needsReview} 曲</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-xl text-red-500"><ShieldAlert className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">確信度低 (70未満)</span>
              <span className="text-xl font-bold text-slate-800">{stats.lowConfidence} 曲</span>
            </div>
          </div>
        </div>

        {/* Detailed counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">カテゴリー内訳</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold py-1 border-b">
                <span className="flex items-center gap-1.5 text-slate-600"><Users className="w-3.5 h-3.5" />全員曲:</span>
                <span>{stats.groupCount} 曲</span>
              </div>
              <div className="flex justify-between text-xs font-semibold py-1 border-b">
                <span className="flex items-center gap-1.5 text-slate-600"><User className="w-3.5 h-3.5" />ユニット曲:</span>
                <span>{stats.unitCount} 曲</span>
              </div>
              <div className="flex justify-between text-xs font-semibold py-1">
                <span className="flex items-center gap-1.5 text-slate-600"><User className="w-3.5 h-3.5" />ソロ曲:</span>
                <span>{stats.soloCount} 曲</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">データ記述チェック</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold py-1 border-b">
                <span className="text-slate-600">推薦文未設定数:</span>
                <span className={stats.missingRecommendation > 0 ? 'text-red-500 font-bold' : 'text-slate-700'}>
                  {stats.missingRecommendation} 曲
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold py-1">
                <span className="text-slate-600">タグ不足曲数:</span>
                <span className={stats.insufficientTags > 0 ? 'text-amber-500 font-bold' : 'text-slate-700'}>
                  {stats.insufficientTags} 曲
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">シミュレーション (300回中)</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold py-1 border-b">
                <span>一度も推薦されなかった曲数:</span>
                <span className="text-rose-600 font-bold">{stats.neverRecommended.length} 曲</span>
              </div>
              <div className="flex justify-between text-xs font-semibold py-1">
                <span>推薦されすぎている曲数 (20回以上):</span>
                <span className="text-amber-600 font-bold">{stats.overRecommended} 曲</span>
              </div>
            </div>
          </div>
        </div>

        {/* Never Recommended Songs Info Panel */}
        {stats.neverRecommended.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-5 rounded-2xl shadow-xs">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              一度も1位推薦されなかった曲 ({stats.neverRecommended.length} 曲)
            </h3>
            <p className="text-xs opacity-90 mt-1 flex flex-wrap gap-2">
              {stats.neverRecommended.join(', ')}
            </p>
          </div>
        )}

        {/* Catalog Table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-slate-800">
            楽曲データ詳細 ({equalLoveSongs.length} 曲)
          </h2>

          <div className="flex flex-col gap-4">
            {equalLoveSongs.map((song) => {
              const count = simulationResults[song.id] || 0;
              return (
                <div key={song.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-4 shadow-xs">
                  {/* Title Bar */}
                  <div className="flex justify-between items-start border-b pb-3 border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {(song.category || 'GROUP').toUpperCase()}
                        </span>
                        <span className="text-[9px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                          1位推薦: {count}回
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-800 mt-1.5">{song.title}</h3>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        初出: {song.factualData.releaseTitle} ({song.factualData.releaseDate})
                      </span>
                    </div>

                    <div className="text-[10px] flex flex-col items-end gap-1 font-semibold">
                      <span className={`px-2 py-0.5 rounded ${
                        song.enabledForRecommendation 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {song.enabledForRecommendation ? '推薦対象' : '非推薦'}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${
                        song.factualData.verificationStatus === 'verified'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}>
                        {song.factualData.verificationStatus}
                      </span>
                    </div>
                  </div>

                  {/* Fact Block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-400 text-[10px] block uppercase mb-1">FACTUAL DATA</span>
                      <div className="flex flex-col gap-1 text-slate-600">
                        <div><span className="font-bold">センター:</span> {song.factualData.centerMembers?.join(', ') || 'needs-review'}</div>
                        <div className="truncate"><span className="font-bold">参加メンバー:</span> {song.factualData.participatingMembers?.join(', ') || 'needs-review'}</div>
                        <div className="truncate"><span className="font-bold">確信度:</span> {song.analysisBasis?.confidence ?? 0}% ({song.analysisBasis?.interpretationNotes})</div>
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-slate-400 text-[10px] block uppercase mb-1">VERIFICATION SOURCES</span>
                      <div className="flex flex-col gap-1 max-h-20 overflow-y-auto pr-1">
                        {song.factualData.verifiedSources?.map((src, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[10px] text-slate-500 border-b pb-0.5 last:border-0">
                            <span className="font-bold text-slate-700">{src.field}:</span>
                            <a href={src.url} target="_blank" rel="noreferrer" className="text-pink-500 truncate max-w-40 hover:underline flex items-center gap-0.5">
                              {src.note || 'Official Source'} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scores & Tags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-bold text-slate-400 text-[10px] block uppercase mb-1">SCORES</span>
                      <div className="grid grid-cols-5 gap-1 text-[9px] bg-slate-50 p-2 rounded-xl border border-slate-100 font-mono">
                        {Object.entries(song.scores).map(([k, v]) => (
                          <div key={k} className="flex justify-between items-center px-1">
                            <span className="text-slate-400 truncate mr-0.5">{k}:</span>
                            <span className="font-bold text-slate-700">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-slate-400 text-[10px] block uppercase mb-1">TAG SUMMARY</span>
                      <div className="flex flex-wrap gap-1 text-[9px]">
                        {song.tags.moods.map(t => <span key={t} className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700">{t}</span>)}
                        {song.tags.situations.map(t => <span key={t} className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">{t}</span>)}
                        {song.tags.weather.map(t => <span key={t} className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">{t}</span>)}
                        {song.tags.seasons.map(t => <span key={t} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">{t}</span>)}
                      </div>
                    </div>
                  </div>

                  {/* Impression & Recommendation Text */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs flex flex-col gap-3">
                    <div>
                      <span className="font-bold text-slate-700 text-[10px] block mb-0.5">💬 曲紹介 (Song Impression)</span>
                      <p className="text-slate-500 leading-relaxed text-justify">{song.recommendation.songImpression}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 text-[10px] block mb-0.5">💬 推薦理由 (Recommendation Text)</span>
                      <p className="text-slate-500 leading-relaxed text-justify">{song.recommendation.recommendationText}</p>
                    </div>

                    {song.recommendationVariants && song.recommendationVariants.length > 0 && (
                      <div className="border-t border-slate-200/50 pt-2 flex flex-col gap-2">
                        <span className="font-bold text-slate-700 text-[10px] block">✨ バリエーション ({song.recommendationVariants.length})</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {song.recommendationVariants.map((v, i) => (
                            <div key={i} className="bg-white p-2.5 rounded-lg border border-slate-200/50 text-[11px]">
                              <span className="font-bold text-pink-500 text-[9px] uppercase tracking-wider block mb-0.5">IF: {v.condition}</span>
                              <p className="text-slate-500 leading-relaxed">{v.text}</p>
                            </div>
                          ))}
                        </div>
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
