'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, ShieldAlert, Music, Layers, RefreshCw, Check } from 'lucide-react';

export default function DevSongReviewDashboard() {
  const [activeBatch, setActiveBatch] = useState<string>('01');
  const [songs, setSongs] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, Record<string, boolean>>>({});
  const [confirmedSongs, setConfirmedSongs] = useState<Record<string, boolean>>({});
  const [loadingSongs, setLoadingSongs] = useState<Record<string, boolean>>({});
  const [loadingBatch, setLoadingBatch] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const checklistItems = [
    { key: 'impressionIsAccurate', label: '曲の雰囲気に違和感がない' },
    { key: 'tagsAreAccurate', label: '主要タグに違和感がない' },
    { key: 'seasonHasEvidence', label: '季節タグに根拠がある' },
    { key: 'recommendationFits', label: '推薦文が曲に合っている' },
    { key: 'noOverstatement', label: '強すぎる断定がない' },
    { key: 'copyIsDistinct', label: '他曲と文章が似すぎていない' },
    { key: 'rankingFeelsNatural', label: '推薦順位が不自然ではない' }
  ];

  const batches = ['01', '02', '03', '04'];

  // Load reviews status & active batch songs
  useEffect(() => {
    fetch('/api/dev/song-review')
      .then(res => {
        if (!res.ok) throw new Error('API failed to load review status');
        return res.json();
      })
      .then((data: any[]) => {
        const checksMap: Record<string, Record<string, boolean>> = {};
        const confirmedMap: Record<string, boolean> = {};
        data.forEach(item => {
          checksMap[item.songId] = item.checks;
          confirmedMap[item.songId] = item.reviewed;
        });
        setCheckedItems(checksMap);
        setConfirmedSongs(confirmedMap);
      })
      .catch(err => {
        console.error('Failed to load reviews:', err);
      });
  }, []);

  // Fetch songs when activeBatch changes
  useEffect(() => {
    setLoadingBatch(true);
    setErrorMsg('');
    fetch(`/api/dev/song-review/batch?batch=${activeBatch}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load batch songs');
        return res.json();
      })
      .then((data: any[]) => {
        setSongs(data);
      })
      .catch(err => {
        setErrorMsg('バッチデータの読み込みに失敗しました。');
        console.error(err);
      })
      .finally(() => {
        setLoadingBatch(false);
      });
  }, [activeBatch]);

  const handleCheck = async (songId: string, group: string, itemKey: string) => {
    const currentChecks = checkedItems[songId] || {};
    const newChecks = {
      ...currentChecks,
      [itemKey]: !currentChecks[itemKey]
    };

    setCheckedItems(prev => ({
      ...prev,
      [songId]: newChecks
    }));

    try {
      setLoadingSongs(prev => ({ ...prev, [songId]: true }));
      const res = await fetch('/api/dev/song-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songId,
          group,
          checks: newChecks
        })
      });

      if (!res.ok) {
        throw new Error('Save failed');
      }
      
      const resData = await res.json();
      setConfirmedSongs(prev => ({
        ...prev,
        [songId]: resData.status.reviewed
      }));
    } catch (err) {
      alert('チェック状態の保存に失敗しました。');
      // Rollback
      setCheckedItems(prev => ({
        ...prev,
        [songId]: currentChecks
      }));
    } finally {
      setLoadingSongs(prev => ({ ...prev, [songId]: false }));
    }
  };

  const handleConfirmSong = async (songId: string, group: string) => {
    const currentChecks = checkedItems[songId] || {};
    try {
      setLoadingSongs(prev => ({ ...prev, [songId]: true }));
      const res = await fetch('/api/dev/song-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songId,
          group,
          checks: currentChecks
        })
      });

      if (!res.ok) {
        throw new Error('Save failed');
      }

      const resData = await res.json();
      setConfirmedSongs(prev => ({
        ...prev,
        [songId]: resData.status.reviewed
      }));
    } catch (err) {
      alert('レビュー完了の保存に失敗しました。');
    } finally {
      setLoadingSongs(prev => ({ ...prev, [songId]: false }));
    }
  };

  const handleCancelConfirm = async (songId: string, group: string) => {
    const currentChecks = checkedItems[songId] || {};
    const resetChecks = { ...currentChecks };
    checklistItems.forEach(item => {
      resetChecks[item.key] = false;
    });

    try {
      setLoadingSongs(prev => ({ ...prev, [songId]: true }));
      const res = await fetch('/api/dev/song-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songId,
          group,
          checks: resetChecks
        })
      });

      if (!res.ok) {
        throw new Error('Save failed');
      }

      setCheckedItems(prev => ({ ...prev, [songId]: resetChecks }));
      setConfirmedSongs(prev => ({ ...prev, [songId]: false }));
    } catch (err) {
      alert('レビュー取り消しに失敗しました。');
    } finally {
      setLoadingSongs(prev => ({ ...prev, [songId]: false }));
    }
  };

  const isAllChecked = (songId: string) => {
    const songChecks = checkedItems[songId] || {};
    return checklistItems.every(item => songChecks[item.key]);
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'equal-love':
        return 'bg-pink-50 text-pink-600 border-pink-100';
      case 'not-equal-me':
        return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'nearly-equal-joy':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default:
        return 'bg-purple-50 text-purple-600 border-purple-100';
    }
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'info':
      default:
        return 'bg-sky-50 text-sky-700 border-sky-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334155] px-6 py-12 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Navigation Head */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 border-slate-200 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/debug" className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 transition shadow-xs">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-[10px] tracking-[0.2em] font-bold text-sky-600 uppercase block">
                DEVELOPER SYSTEM BOARD
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-slate-800">
                未承認曲人間レビュー基盤 Dashboard
              </h1>
            </div>
          </div>

          {/* Batch Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {batches.map(num => (
              <button
                key={num}
                onClick={() => setActiveBatch(num)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeBatch === num
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Batch {num}
              </button>
            ))}
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            {errorMsg}
          </div>
        )}

        {loadingBatch ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="w-8 h-8 text-sky-500 animate-spin" />
            <span className="ml-3 text-slate-500 font-bold text-sm">バッチデータをロード中...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                <Layers className="w-5 h-5 text-slate-400" />
                レビュー対象楽曲 (Batch {activeBatch}: {songs.length}曲)
              </h2>
              <span className="text-xs text-slate-400 font-bold">
                ※ 本バッチは一時保存状態でレビュー結果が保存され、自動本番承認はされません。
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {songs.map((song) => {
                const isApproved = confirmedSongs[song.id];
                const hasFlags = song.reviewFlags && song.reviewFlags.length > 0;

                return (
                  <div key={song.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col gap-5 shadow-xs transition hover:shadow-sm">
                    {/* Header */}
                    <div className="flex justify-between items-start border-b pb-4 border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase ${getGroupColor(song.group)}`}>
                            {song.group}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            ID: {song.id}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-lg text-slate-800 mt-2">{song.title}</h3>
                      </div>

                      <div className="text-[10px] flex flex-col items-end gap-1.5 font-bold">
                        <span className={`px-2.5 py-0.5 rounded-full ${
                          song.enabledForRecommendation 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {song.enabledForRecommendation ? '推薦対象' : '非推薦 (トリプルデート等)'}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full ${
                          isApproved
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {isApproved ? 'レビュークリア (一時保存中)' : '要レビュー (needs_review)'}
                        </span>
                      </div>
                    </div>

                    {/* Flags Alert Block */}
                    {hasFlags && (
                      <div className="bg-slate-50 border border-slate-200 text-slate-900 p-4.5 rounded-2xl flex flex-col gap-2">
                        <h4 className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 text-slate-500" />
                          システム警告フラグ ({song.reviewFlags.length}件検出)
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {song.reviewFlags.map((item: any, idx: number) => (
                            <span key={idx} className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded flex items-center gap-1 ${getSeverityBadgeClass(item.severity)}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {item.flag} ({item.severity})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scores & Tags Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Scores */}
                      <div>
                        <span className="font-bold text-slate-400 text-[10px] block uppercase mb-1.5 tracking-wider">SCORES</span>
                        <div className="grid grid-cols-5 gap-1.5 text-[9px] bg-slate-50 p-3 rounded-2xl border border-slate-100 font-mono">
                          {Object.entries(song.scores).map(([k, v]) => (
                            <div key={k} className="flex justify-between items-center px-1">
                              <span className="text-slate-400 mr-0.5 truncate">{k}:</span>
                              <span className="font-extrabold text-slate-700">{String(v)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <span className="font-bold text-slate-400 text-[10px] block uppercase mb-1.5 tracking-wider">TAGS</span>
                        <div className="flex flex-wrap gap-1 text-[9px] max-h-20 overflow-y-auto">
                          {song.tags.moods.map((t: string) => <span key={t} className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">{t}</span>)}
                          {song.tags.situations.map((t: string) => <span key={t} className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">{t}</span>)}
                          {song.tags.weather.map((t: string) => <span key={t} className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100">{t}</span>)}
                          {song.tags.timeOfDay.map((t: string) => <span key={t} className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">{t}</span>)}
                          {song.tags.seasons.map((t: string) => <span key={t} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">{t}</span>)}
                          {song.tags.themes.map((t: string) => <span key={t} className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">{t}</span>)}
                          {song.tags.tempos.map((t: string) => <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">{t}</span>)}
                          {song.tags.playlistRoles.map((t: string) => <span key={t} className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100">{t}</span>)}
                        </div>
                      </div>
                    </div>

                    {/* Recommendation Details */}
                    <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 text-xs flex flex-col gap-3.5">
                      <div>
                        <span className="font-bold text-slate-800 text-[10px] block mb-0.5">💬 曲紹介 (Song Impression)</span>
                        <p className="text-slate-500 leading-relaxed">{song.recommendation.songImpression}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-bold text-slate-800 text-[10px] block mb-0.5">👍 推薦対象者 (Recommended For)</span>
                          <p className="text-slate-500 leading-relaxed">{song.recommendation.recommendedFor}</p>
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 text-[10px] block mb-0.5">✨ 推薦シチュエーション (Recommended Situation)</span>
                          <p className="text-slate-500 leading-relaxed">{song.recommendation.recommendedSituation}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-bold text-slate-800 text-[10px] block mb-0.5">⚠️ 不向きなシチュエーション (Not Recommended Situation)</span>
                          <p className="text-slate-500 leading-relaxed">{song.recommendation.notRecommendedSituation}</p>
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 text-[10px] block mb-0.5">🎤 推薦文言 (Recommendation Text)</span>
                          <p className="text-slate-500 leading-relaxed">{song.recommendation.recommendationText}</p>
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-[10px] block mb-0.5">🎧 リスニング提案 (Listening Suggestion)</span>
                        <p className="text-slate-500 leading-relaxed">{song.recommendation.listeningSuggestion}</p>
                      </div>

                      {/* Recommendation Variants */}
                      {song.recommendationVariants && song.recommendationVariants.length > 0 && (
                        <div className="border-t border-slate-200/60 pt-3 flex flex-col gap-2">
                          <span className="font-extrabold text-slate-700 text-[10px] block">💡 条件付きレコメンドバリエーション</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {song.recommendationVariants.map((v: any, i: number) => (
                              <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] shadow-2xs">
                                <span className="font-bold text-sky-500 text-[9px] uppercase tracking-wider block mb-0.5">IF: {v.condition} ({v.conditionType})</span>
                                <p className="text-slate-500 leading-relaxed">{v.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Analysis Basis */}
                      {song.analysisBasis && (
                        <div className="border-t border-slate-200/60 pt-3 text-[11px]">
                          <span className="font-extrabold text-slate-700 text-[10px] block mb-0.5">📊 査定根拠 & 確信度 ({song.analysisBasis.confidence || 0}%)</span>
                          <p className="text-slate-400 font-medium italic">{song.analysisBasis.interpretationNotes || '判定ノートなし'}</p>
                        </div>
                      )}
                    </div>

                    {/* Human Quality Review Checklist */}
                    {!isApproved ? (
                      <div className="bg-amber-50/40 p-4.5 rounded-2xl border border-amber-100 text-xs flex flex-col gap-3">
                        <span className="font-bold text-amber-800 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                          人間による品質レビューチェックリスト (すべての項目にチェックを入れてください)
                        </span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-slate-700 font-medium">
                          {checklistItems.map(item => (
                            <label key={item.key} className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={checkedItems[song.id]?.[item.key] || false}
                                disabled={loadingSongs[song.id]}
                                onChange={() => handleCheck(song.id, song.group, item.key)}
                                className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 w-3.5 h-3.5 cursor-pointer"
                              />
                              <span>{item.label}</span>
                            </label>
                          ))}
                        </div>

                        <button
                          disabled={!isAllChecked(song.id) || loadingSongs[song.id]}
                          onClick={() => handleConfirmSong(song.id, song.group)}
                          className={`w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold transition-all mt-2 flex items-center justify-center gap-1.5 ${
                            isAllChecked(song.id) && !loadingSongs[song.id]
                              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md cursor-pointer'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          {loadingSongs[song.id] ? '保存中...' : 'レビュー完了 (一時保存)'}
                        </button>
                      </div>
                    ) : (
                      <div className="bg-emerald-50/60 p-4.5 rounded-2xl border border-emerald-100 text-xs flex flex-col gap-3">
                        <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          <span>本バッチのレビュー完了として一時保存されました</span>
                        </div>
                        <button
                          disabled={loadingSongs[song.id]}
                          onClick={() => handleCancelConfirm(song.id, song.group)}
                          className="py-1.5 px-3 rounded-lg border border-red-200 text-red-600 bg-red-50/50 hover:bg-red-50 hover:text-red-700 font-bold transition text-[10px] self-start cursor-pointer disabled:opacity-50"
                        >
                          {loadingSongs[song.id] ? '保存中...' : 'レビューを取り消す'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
