'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, X, Music } from 'lucide-react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';
import { Song, songs } from '../../data/songs';
import { getEffectiveNeedsReview } from '../../utils/reviewHelper';
import { getProductionApprovedSongIds } from '../../utils/approvedSongs';

// Normalize search query matching
function normalizeSearchText(text: string): string {
  let normalized = text.toLowerCase();
  normalized = normalized.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
  normalized = normalized.replace(/[「」『』]/g, '');
  normalized = normalized.replace(/[\s　]/g, '');
  normalized = normalized.replace(/[＝=－\-＿_]/g, '')
    .replace(/[！!？?]/g, '')
    .replace(/[““””"'’`‘]/g, '')
    .replace(/[（）()［］[\]]/g, '')
    .replace(/[・•]/g, '')
    .replace(/[ー〜~]/g, '');
  return normalized;
}

export default function SongsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSongId, setExpandedSongId] = useState<string | null>(null);
  const [reviewedSongIds, setReviewedSongIds] = useState<string[]>(() => {
    if (process.env.NODE_ENV === 'production') {
      return getProductionApprovedSongIds();
    }
    return [];
  });

  // Fetch verified reviews on mount to dynamically update verification state in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    fetch('/api/dev/song-review')
      .then(res => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data: any[]) => {
        const reviewedIds = data.filter((r: any) => r.reviewed).map((r: any) => r.songId);
        setReviewedSongIds(reviewedIds);
      })
      .catch(() => {
        setReviewedSongIds(getProductionApprovedSongIds());
      });
  }, []);

  // Filter states
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterMood, setFilterMood] = useState<string>('all');
  const [filterTime, setFilterTime] = useState<string>('all');
  const [filterWeather, setFilterWeather] = useState<string>('all');
  const [filterScene, setFilterScene] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSeason, setFilterSeason] = useState<string>('all');
  const [filterMember, setFilterMember] = useState<string>('all');

  const moodOptions = [
    { value: 'all', label: 'すべての気分' },
    { value: 'energetic', label: '元気になりたい' },
    { value: 'hype', label: '高まりたい' },
    { value: 'calm', label: '落ち着きたい' },
    { value: 'sad', label: '泣きたい' },
    { value: 'romantic', label: '恋を感じたい' },
    { value: 'cute', label: 'かわいい世界に浸りたい' },
    { value: 'playful', label: '楽しく遊びたい' },
    { value: 'support', label: '背中を押してほしい' },
  ];

  const timeOptions = [
    { value: 'all', label: 'すべての時間' },
    { value: 'morning', label: '朝' },
    { value: 'afternoon', label: '昼' },
    { value: 'evening', label: '夕方' },
    { value: 'night', label: '夜・深夜' },
  ];

  const weatherOptions = [
    { value: 'all', label: 'すべての天気' },
    { value: 'sunny', label: '晴れ' },
    { value: 'cloudy', label: '曇り' },
    { value: 'rainy', label: '雨' },
    { value: 'snowy', label: '雪' },
    { value: 'hot', label: '暑い日' },
    { value: 'cold', label: '寒い日' },
  ];

  const sceneOptions = [
    { value: 'all', label: 'すべての場面' },
    { value: 'home', label: '部屋でゆっくり' },
    { value: 'commute', label: '移動中' },
    { value: 'study', label: '作業・勉強' },
    { value: 'drive', label: 'ドライブ・散歩' },
    { value: 'live', label: 'ライブ前' },
    { value: 'sleep', label: '眠る前' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'すべてのカテゴリ' },
    { value: 'group', label: '全員曲' },
    { value: 'unit', label: 'ユニット曲' },
    { value: 'solo', label: 'ソロ曲' },
  ];

  const seasonOptions = [
    { value: 'all', label: 'すべての季節' },
    { value: 'spring', label: '春' },
    { value: 'summer', label: '夏' },
    { value: 'autumn', label: '秋' },
    { value: 'winter', label: '冬' },
  ];

  // Dynamic members list for favorite filter dropdown
  const memberOptions = useMemo(() => {
    const memberSet = new Set<string>();
    songs.forEach((song) => {
      song.factualData.centerMembers?.forEach((m) => {
        if (m && m !== 'needs-review') memberSet.add(m);
      });
      song.factualData.participatingMembers?.forEach((m) => {
        if (m && m !== 'needs-review') memberSet.add(m);
      });
    });
    return [
      { value: 'all', label: 'すべてのメンバー' },
      ...Array.from(memberSet).sort().map((m) => ({ value: m, label: m })),
    ];
  }, []);

  // Tag filter mapping lists
  const moodMap: Record<string, string[]> = {
    energetic: ['happy', 'motivated'],
    hype: ['excited', 'happy'],
    calm: ['calm', 'healing'],
    sad: ['sad', 'lonely', 'nostalgic'],
    romantic: ['romantic'],
    cute: ['cute'],
    playful: ['playful'],
    support: ['motivated', 'confident', 'healing'],
  };

  const sceneMap: Record<string, string[]> = {
    home: ['relaxing'],
    commute: ['commute', 'walking'],
    study: ['study', 'work'],
    drive: ['driving', 'walking'],
    live: ['before_live', 'after_live'],
    sleep: ['before_sleep'],
  };

  const timeMap: Record<string, string[]> = {
    morning: ['morning', 'morning_routine'],
    afternoon: ['daytime'],
    evening: ['evening'],
    night: ['night', 'late_night'],
  };

  const handleToggleExpand = (id: string) => {
    setExpandedSongId(expandedSongId === id ? null : id);
  };

  // Filter matching logic
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      // Skip disabled songs, non-song records, and Overture tracks
      if (song.enabled === false || (song as any).reason === 'overture' || (song.recordType && song.recordType !== 'song')) {
        return false;
      }

      // 1. Text Search matching title or members
      const members = [
        ...(song.factualData.centerMembers || []),
        ...(song.factualData.participatingMembers || [])
      ];
      const query = normalizeSearchText(searchQuery);
      const normTitle = normalizeSearchText(song.title);
      if (
        searchQuery &&
        !normTitle.includes(query) &&
        !members.some(m => normalizeSearchText(m).includes(query))
      ) {
        return false;
      }

      // 2. Group filter
      if (filterGroup !== 'all' && song.group !== filterGroup) {
        return false;
      }

      // 3. Category filter
      if (filterCategory !== 'all' && song.category !== filterCategory) {
        return false;
      }

      // 4. Mood tag filter
      if (filterMood !== 'all') {
        const targets = moodMap[filterMood] || [];
        const matches = song.tags.moods.some((m) => targets.includes(m));
        if (!matches) return false;
      }

      // 5. Time filter
      if (filterTime !== 'all') {
        const targets = timeMap[filterTime] || [];
        const matches = song.tags.timeOfDay.some((t) => targets.includes(t));
        if (!matches) return false;
      }

      // 6. Weather filter
      if (filterWeather !== 'all' && !song.tags.weather.includes(filterWeather as any)) {
        return false;
      }

      // 7. Scene filter
      if (filterScene !== 'all') {
        const targets = sceneMap[filterScene] || [];
        const matches = song.tags.situations.some((s) => targets.includes(s));
        if (!matches) return false;
      }

      // 8. Season filter
      if (filterSeason !== 'all' && !song.tags.seasons.includes(filterSeason as any)) {
        return false;
      }

      // 9. Favorite member filter
      if (filterMember !== 'all') {
        const isCenter = song.factualData.centerMembers?.includes(filterMember);
        const isPart = song.factualData.participatingMembers?.includes(filterMember);
        if (!isCenter && !isPart) return false;
      }

      return true;
    });
  }, [searchQuery, filterGroup, filterCategory, filterMood, filterTime, filterWeather, filterScene, filterSeason, filterMember]);

  const getGroupName = (group: string) => {
    switch (group) {
      case 'equal-love': return '＝LOVE';
      case 'not-equal-me': return '≠ME';
      case 'nearly-equal-joy': return '≒JOY';
      case 'joint': return 'イコノイジョイ';
      default: return '';
    }
  };

  const getGroupBadgeClass = (group: string) => {
    switch (group) {
      case 'equal-love': return 'bg-[#FFF0F5] text-[#F9A8D4] border-[#FFE4EE]';
      case 'not-equal-me': return 'bg-[#EFF6FF] text-[#93C5FD] border-[#DBEAFE]';
      case 'nearly-equal-joy': return 'bg-[#ECFDF5] text-[#9FE7D7] border-[#D1FAE5]';
      case 'joint': return 'bg-[#FAF5FF] text-[#D8B4FE] border-[#F3E8FF]';
      default: return '';
    }
  };

  const getMoodLabel = (m: string) => {
    const mapping: Record<string, string> = {
      happy: 'ハッピー',
      excited: '高まり',
      calm: '落ち着き',
      sad: '切ない',
      lonely: '孤独',
      romantic: '甘い恋',
      motivated: '前向き',
      nostalgic: 'エモい',
      confident: '自信',
      healing: '癒やし',
    };
    return mapping[m] || m;
  };

  const getSituationLabel = (s: string) => {
    const mapping: Record<string, string> = {
      commute: '通勤・通学',
      study: '勉強',
      work: '仕事',
      walking: '散歩',
      driving: 'ドライブ',
      relaxing: 'リラックス',
      before_sleep: '眠る前',
      before_live: 'ライブ前',
      after_live: 'ライブ後',
      morning_routine: '朝の準備',
    };
    return mapping[s] || s;
  };

  const getTimeLabel = (t: string) => {
    const mapping: Record<string, string> = {
      morning: '朝',
      daytime: '昼',
      evening: '夕方',
      night: '夜',
      late_night: '深夜',
    };
    return mapping[t] || t;
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
    return mapping[w] || w;
  };

  const getSeasonLabel = (s: string) => {
    const mapping: Record<string, string> = {
      spring: '春',
      summer: '夏',
      autumn: '秋',
      winter: '冬',
      all_seasons: 'オールシーズン',
    };
    return mapping[s] || s;
  };

  const handleResetFilters = () => {
    setFilterGroup('all');
    setFilterMood('all');
    setFilterTime('all');
    setFilterWeather('all');
    setFilterScene('all');
    setFilterCategory('all');
    setFilterSeason('all');
    setFilterMember('all');
    setSearchQuery('');
  };

  return (
    <>
      <AppHeader showBack={false} />

      <main className="flex-1 flex flex-col justify-start overflow-y-auto pb-28">
        {/* Search bar & filter trigger */}
        <div className="p-4 bg-white/40 border-b border-[rgba(80,84,120,0.06)] flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#6E7180]" />
              <input
                type="text"
                placeholder="曲名、またはメンバー名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-[rgba(80,84,120,0.12)] text-xs text-[#171725] focus:outline-none focus:border-[#B9A7FF] smooth-transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-xs text-[#6E7180]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center smooth-transition cursor-pointer ${
                showFilters || filterMood !== 'all' || filterTime !== 'all' || filterWeather !== 'all' || filterScene !== 'all' || filterCategory !== 'all' || filterSeason !== 'all' || filterMember !== 'all'
                  ? 'border-[#B9A7FF] bg-[#B9A7FF]/10 text-[#171725]'
                  : 'border-[rgba(80,84,120,0.12)] bg-white text-[#6E7180]'
              }`}
              aria-label="フィルター展開"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Group Filter chips */}
          <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {[
              { value: 'all', label: 'すべて' },
              { value: 'equal-love', label: '＝LOVE' },
              { value: 'not-equal-me', label: '≠ME' },
              { value: 'nearly-equal-joy', label: '≒JOY' },
              { value: 'joint', label: 'イコノイジョイ' },
            ].map((g) => (
              <button
                key={g.value}
                onClick={() => setFilterGroup(g.value)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide border shrink-0 smooth-transition cursor-pointer ${
                  filterGroup === g.value
                    ? 'bg-[#171725] text-white border-[#171725]'
                    : 'bg-white border-[rgba(80,84,120,0.12)] text-[#6E7180] hover:border-[#B9A7FF]/35'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Expandable filters dropdown drawer */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-white/70 backdrop-blur-md rounded-2xl border border-[rgba(80,84,120,0.08)] p-4 flex flex-col gap-3 mt-1.5 shadow-inner"
              >
                {/* Select menus */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-[#6E7180] uppercase tracking-wider">気分</label>
                    <select
                      value={filterMood}
                      onChange={(e) => setFilterMood(e.target.value)}
                      className="h-9 px-2.5 rounded-lg border border-[rgba(80,84,120,0.12)] bg-white text-xs text-[#171725]"
                    >
                      {moodOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-[#6E7180] uppercase tracking-wider">場面</label>
                    <select
                      value={filterScene}
                      onChange={(e) => setFilterScene(e.target.value)}
                      className="h-9 px-2.5 rounded-lg border border-[rgba(80,84,120,0.12)] bg-white text-xs text-[#171725]"
                    >
                      {sceneOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-[#6E7180] uppercase tracking-wider">時間帯</label>
                    <select
                      value={filterTime}
                      onChange={(e) => setFilterTime(e.target.value)}
                      className="h-9 px-2.5 rounded-lg border border-[rgba(80,84,120,0.12)] bg-white text-xs text-[#171725]"
                    >
                      {timeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-[#6E7180] uppercase tracking-wider">天気</label>
                    <select
                      value={filterWeather}
                      onChange={(e) => setFilterWeather(e.target.value)}
                      className="h-9 px-2.5 rounded-lg border border-[rgba(80,84,120,0.12)] bg-white text-xs text-[#171725]"
                    >
                      {weatherOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                    <label className="text-[9px] font-bold text-[#6E7180] uppercase tracking-wider">カテゴリー</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="h-9 px-2.5 rounded-lg border border-[rgba(80,84,120,0.12)] bg-white text-xs text-[#171725]"
                    >
                      {categoryOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 col-span-1">
                    <label className="text-[9px] font-bold text-[#6E7180] uppercase tracking-wider">季節</label>
                    <select
                      value={filterSeason}
                      onChange={(e) => setFilterSeason(e.target.value)}
                      className="h-9 px-2.5 rounded-lg border border-[rgba(80,84,120,0.12)] bg-white text-xs text-[#171725]"
                    >
                      {seasonOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 col-span-1">
                    <label className="text-[9px] font-bold text-[#6E7180] uppercase tracking-wider">推しメン</label>
                    <select
                      value={filterMember}
                      onChange={(e) => setFilterMember(e.target.value)}
                      className="h-9 px-2.5 rounded-lg border border-[rgba(80,84,120,0.12)] bg-white text-xs text-[#171725]"
                    >
                      {memberOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>

                {/* Reset Filters button */}
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] text-center font-bold text-[#B9A7FF] hover:underline mt-2 self-center cursor-pointer"
                >
                  条件をすべてリセットする
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Songs Count */}
        <div className="px-4 py-2 flex justify-between items-center text-[10px] font-semibold text-[#6E7180] tracking-wider uppercase bg-[#F8F9FD]/40">
          <span>Song List</span>
          <span>{filteredSongs.length} songs found</span>
        </div>

        {/* Songs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-4 max-w-[1200px] mx-auto w-full items-start">
          <AnimatePresence>
            {filteredSongs.map((song) => {
              const isExpanded = expandedSongId === song.id;
              const groupLabel = getGroupName(song.group);
              const badgeClass = getGroupBadgeClass(song.group);

              return (
                <motion.div
                  key={song.id}
                  layout
                  className="bg-white/80 backdrop-blur-md rounded-[20px] border border-[rgba(80,84,120,0.08)] shadow-xs overflow-hidden flex flex-col min-h-[110px] justify-between"
                >
                  {/* Collapsed Header click trigger */}
                  <div
                    onClick={() => handleToggleExpand(song.id)}
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none h-full flex-1"
                  >
                    <div className="flex-1 min-w-0 flex flex-col gap-1.5 h-full justify-between">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${badgeClass}`}>
                          {groupLabel}
                        </span>
                        
                        {/* Major Mood Chips (Max 2 for layout constraint) */}
                        {!getEffectiveNeedsReview(song, reviewedSongIds) && song.tags.moods.slice(0, 2).map((m) => (
                          <span key={m} className="text-[8px] font-semibold text-[#6E7180] bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                            #{getMoodLabel(m)}
                          </span>
                        ))}

                        {/* Major Situation Chips (Max 1 for layout constraint) */}
                        {!getEffectiveNeedsReview(song, reviewedSongIds) && song.tags.situations.slice(0, 1).map((s) => (
                          <span key={s} className="text-[8px] font-medium text-[#B9A7FF] bg-[#B9A7FF]/10 px-1.5 py-0.5 rounded-md shrink-0">
                            {getSituationLabel(s)}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-sm font-semibold text-[#171725] truncate mt-1">
                        {song.title}
                      </h3>

                      {/* Display energy and brightness stats */}
                      {!getEffectiveNeedsReview(song, reviewedSongIds) && (
                        <div className="flex items-center gap-3 mt-1 text-[8px] text-[#6E7180] font-bold">
                          <div className="flex items-center gap-0.5">
                            <span>ENERGY:</span>
                            <span className="text-[#171725]">{song.scores.energy}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <span>BRIGHTNESS:</span>
                            <span className="text-[#171725]">{song.scores.brightness}</span>
                          </div>
                        </div>
                      )}

                    </div>

                    <div className="text-[#6E7180] shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded detail section */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 border-t border-[rgba(80,84,120,0.04)] flex flex-col gap-4 pt-3.5 bg-slate-50/20"
                    >
                      {getEffectiveNeedsReview(song, reviewedSongIds) ? (
                        <div className="flex flex-col gap-2 py-4 text-center">
                          <p className="text-xs text-[#6E7180] font-medium">
                            楽曲情報を確認中です
                          </p>
                          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] mt-2 text-[#6E7180]/80">
                            {song.factualData.releaseTitle && (
                              <div>
                                <span className="font-bold text-[#6E7180]/60">初出: </span>
                                <span>{song.factualData.releaseTitle}</span>
                              </div>
                            )}
                            {song.factualData.releaseDate && (
                              <div>
                                <span className="font-bold text-[#6E7180]/60">発売日: </span>
                                <span>{song.factualData.releaseDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Explanatory description */}
                          <p className="text-xs text-[#6E7180] leading-relaxed text-justify px-1">
                            {song.recommendation.recommendationText}
                          </p>

                          {/* Detailed tag systems */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] border-t border-b border-[rgba(80,84,120,0.04)] py-3 px-1">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-[#6E7180]/70 uppercase tracking-widest text-[8px]">おすすめの気分</span>
                              <span className="font-medium text-[#171725]">
                                {song.tags.moods.map(m => getMoodLabel(m)).join(', ')}
                              </span>
                            </div>

                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-[#6E7180]/70 uppercase tracking-widest text-[8px]">おすすめの場面</span>
                              <span className="font-medium text-[#171725]">
                                {song.tags.situations.map(s => getSituationLabel(s)).join(', ')}
                              </span>
                            </div>

                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-[#6E7180]/70 uppercase tracking-widest text-[8px]">おすすめの時間帯</span>
                              <span className="font-medium text-[#171725]">
                                {song.tags.timeOfDay.map(t => getTimeLabel(t)).join(', ')}
                              </span>
                            </div>

                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-[#6E7180]/70 uppercase tracking-widest text-[8px]">おすすめの天気</span>
                              <span className="font-medium text-[#171725]">
                                {song.tags.weather.map(w => getWeatherLabel(w)).join(', ')}
                              </span>
                            </div>

                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-[#6E7180]/70 uppercase tracking-widest text-[8px]">おすすめの季節</span>
                              <span className="font-medium text-[#171725]">
                                {song.tags.seasons.map(s => getSeasonLabel(s)).join(', ')}
                              </span>
                            </div>

                            {song.factualData.centerMembers && song.factualData.centerMembers.length > 0 && (
                              <div className="flex flex-col gap-0.5">
                                <span className="font-semibold text-[#6E7180]/70 uppercase tracking-widest text-[8px]">センター</span>
                                <span className="font-medium text-[#171725] truncate">
                                  {song.factualData.centerMembers.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Suggestions on how to listen */}
                          <div className="bg-[#F8F9FD] p-3 rounded-xl border border-[rgba(80,84,120,0.06)] text-[10px] text-[#6E7180] leading-relaxed">
                            <span className="font-bold text-[#171725] block mb-1">💡 おすすめの聴き方</span>
                            {song.recommendation.listeningSuggestion}
                          </div>

                          {/* Launch diagnosis button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/tune?auto=true&songId=${song.id}`);
                            }}
                            className="w-full h-10 rounded-xl bg-[#171725] hover:bg-black/90 text-white text-xs font-semibold flex items-center justify-center gap-1.5 smooth-transition cursor-pointer"
                          >
                            <Music className="w-3.5 h-3.5" />
                            この曲を条件に近い曲として診断する
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}

                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* No results placeholder */}
          {filteredSongs.length === 0 && (
            <div className="text-center py-12 px-6 flex flex-col gap-3.5 items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#6E7180]">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#171725] font-semibold">条件に合う曲が見つかりませんでした。</p>
                <p className="text-[10px] text-[#6E7180] leading-relaxed mt-0.5">フィルター条件を緩めるか、キーワードを変更してください。</p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-white border border-[rgba(80,84,120,0.12)] text-[10px] font-bold text-[#B9A7FF] cursor-pointer"
              >
                フィルターをリセット
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
