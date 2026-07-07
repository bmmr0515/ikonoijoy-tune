import { Song, songs, ReviewRequirement, MoodTag } from '../data/songs';
import { hasValidRecommendationMetadata } from './recommendationMetadata';

export const MOOD_ANSWERS = [
  'energetic',
  'hype',
  'calm',
  'sad',
  'romantic',
  'cute',
  'playful',
  'support',
  'rebellious',
  'confident',
  'motivated',
  'nostalgic',
  'bittersweet',
  'healing',
  'excited'
] as const;

export type MoodAnswer = typeof MOOD_ANSWERS[number];

export function isMoodAnswer(value: unknown): value is MoodAnswer {
  return typeof value === 'string' && MOOD_ANSWERS.includes(value as MoodAnswer);
}

export const MOOD_TAG_MAP: Record<MoodAnswer, MoodTag[]> = {
  energetic: ['happy', 'motivated'],
  hype: ['excited', 'happy'],
  calm: ['calm', 'healing'],
  sad: ['sad', 'lonely', 'nostalgic'],
  romantic: ['romantic'],
  cute: ['cute'],
  playful: ['playful'],
  rebellious: ['rebellious', 'excited'],
  confident: ['confident', 'excited'],
  support: ['motivated', 'confident', 'healing'],
  motivated: ['motivated', 'confident', 'healing'],
  nostalgic: ['nostalgic'],
  bittersweet: ['bittersweet'],
  healing: ['healing'],
  excited: ['excited']
};

export interface QuizAnswers {
  mood?: MoodAnswer;
  scene?: string;
  timeOfDay?: string;
  weather?: string;
  group?: string;
  member?: string;
  energy?: string;
  season?: string; // added to match test conditions if set
  proposalType?: 'single' | 'playlist';
  randomSeed?: string;
}

export type ScoreBreakdown = {
  moodScore: number;
  sceneScore: number;
  timeScore: number;
  weatherScore: number;
  seasonScore: number;
  themeScore: number;
  energyScore: number;
  romanceOrCutenessAdjustment: number;
  diversityAdjustment: number;
  baseScore: number;
  finalScore: number;
};

export interface ScoredSong extends Song {
  score: number;
  baseScore: number;
  normalizedScore: number;
  diversityAdjustment: number;
  finalScore: number;
  breakdown?: ScoreBreakdown;
}

export interface PlaylistTrack {
  song: Song;
  role: 'はじまりの曲' | '気分を深める曲' | '中心になる曲' | '少し風向きを変える曲' | '余韻を残す曲';
}

export interface PlaylistResult {
  title: string;
  description: string;
  tracks: PlaylistTrack[];
}

// Map groups from quiz values to new Song schema values
const mapGroup = (g?: string): string | undefined => {
  if (g === 'love') return 'equal-love';
  if (g === 'me') return 'not-equal-me';
  if (g === 'joy') return 'nearly-equal-joy';
  return g;
};

// Map mood select values to Song tag values
const mapMoodToTags = (mood?: MoodAnswer | string): string[] => {
  if (!mood) return [];
  if (isMoodAnswer(mood)) {
    return MOOD_TAG_MAP[mood];
  }
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[TuneEngine] Unrecognized mood answer value: "${mood}"`);
  }
  return [];
};

// Map scene select values to Song tag values
const mapSceneToTags = (scene?: string): string[] => {
  switch (scene) {
    case 'home':
      return ['relaxing'];
    case 'commute':
      return ['commute', 'walking'];
    case 'study':
      return ['study', 'work'];
    case 'drive':
    case 'driving':
      return ['driving', 'walking'];
    case 'live':
    case 'before_live':
      return ['before_live', 'after_live'];
    case 'sleep':
      return ['before_sleep'];
    case 'getting_ready':
      return ['getting_ready'];
    case 'alone_time':
      return ['alone_time', 'relaxing'];
    case 'after_school':
      return ['after_school'];
    default:
      return [];
  }
};

// Map timeOfDay select values to Song tag values
const mapTimeToTags = (time?: string): string[] => {
  switch (time) {
    case 'morning':
      return ['morning', 'morning_routine'];
    case 'afternoon':
    case 'daytime':
      return ['daytime'];
    case 'evening':
      return ['evening'];
    case 'night':
      return ['night', 'late_night'];
    default:
      return [];
  }
};

// Map time of day or weather to season if not explicitly set
const resolveSeason = (answers: QuizAnswers): string | undefined => {
  if (answers.season) return answers.season;
  // Do not fall back to calendar seasons implicitly
  return undefined;
};

// Map mood or answers to themes for scoring boost
const mapThemesToScores = (answers: QuizAnswers): string[] => {
  const mappedThemes: string[] = [];
  const mood = answers.mood;

  if (mood === 'romantic') {
    mappedThemes.push('love', 'unrequited_love');
  }
  if (mood === 'sad') {
    mappedThemes.push('breakup', 'unrequited_love', 'memories');
  }
  if (mood === 'support' || mood === 'motivated') {
    mappedThemes.push('challenge', 'self_acceptance', 'gratitude', 'dream');
  }
  if (mood === 'energetic' || mood === 'hype') {
    mappedThemes.push('youth', 'friendship', 'dream');
  }

  return mappedThemes;
};

// Check weather from Open-Meteo
export async function getLiveWeather(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
    );
    if (!res.ok) throw new Error('Weather API fetch failed');
    const data = await res.json();
    const temp = data.current.temperature_2m;
    const code = data.current.weather_code;

    if (temp >= 30) return 'hot';
    if (temp <= 5) return 'cold';

    if (code === 0 || code === 1) return 'sunny';
    if (code === 2 || code === 3) return 'cloudy';
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rainy';
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snowy';

    return 'sunny';
  } catch (error) {
    console.error('Error fetching weather:', error);
    return 'sunny';
  }
}

// Simple deterministic PRNG based on MurmurHash3 hashing function
function seedRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507) | 0;
    h = Math.imul(h ^ h >>> 13, 3266489909) | 0;
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// Common recommendation helper functions
export { hasValidRecommendationMetadata };

export function getReviewRequirement(song: Song): ReviewRequirement {
  if (song.reviewRequirement) {
    return song.reviewRequirement;
  }

  if (song.needsReview === true) {
    return 'needs_review';
  }

  if (song.needsReview === false) {
    return 'legacy_curated';
  }

  return 'legacy_curated';
}

export function getEffectiveNeedsReview(song: Song, approvedSongIds: string[]): boolean {
  if (approvedSongIds.includes(song.id)) {
    return false;
  }

  const requirement = getReviewRequirement(song);
  return requirement === 'needs_review';
}

export function isRecommendationReady(song: Song, approvedSongIds: string[]): boolean {
  if (approvedSongIds && approvedSongIds.length > 0) {
    if (!approvedSongIds.includes(song.id)) {
      return false;
    }
  }

  return (
    song.recordType === 'song' &&
    song.enabled === true &&
    song.enabledForRecommendation === true &&
    hasValidRecommendationMetadata(song) &&
    getEffectiveNeedsReview(song, approvedSongIds) === false
  );
}

export type DiversityMode = 'default' | 'disabled' | 'seeded';

export type CalculateScoreOptions = {
  includeBreakdown?: boolean;
  diversityMode?: DiversityMode;
  sourceSongs?: readonly Song[];
};

// Matching logic
export function calculateScores(
  answers: QuizAnswers,
  history: string[] = [],
  reviewedSongIds: string[] = [],
  options?: CalculateScoreOptions
): ScoredSong[] {
  const targetGroup = mapGroup(answers.group);
  const targetMoodTags = mapMoodToTags(answers.mood);
  const targetSceneTags = mapSceneToTags(answers.scene);
  const targetTimeTags = mapTimeToTags(answers.timeOfDay);
  const resolvedTargetSeason = resolveSeason(answers);
  const targetThemes = mapThemesToScores(answers);

  const sourceSongs = options?.sourceSongs ?? songs;
  const scored = sourceSongs.map((song) => {
    const baseline: ScoredSong = {
      ...song,
      baseScore: 0,
      normalizedScore: 0,
      diversityAdjustment: 0,
      finalScore: -200,
      score: -200
    };

    if (!isRecommendationReady(song, reviewedSongIds)) {
      return baseline;
    }

    if (targetGroup && targetGroup !== 'all' && song.group !== targetGroup) {
      return baseline;
    }

    let baseScore = 0;
    let moodScore = 0;
    let sceneScore = 0;
    let timeScore = 0;
    let weatherScore = 0;
    let seasonScore = 0;
    let themeScore = 0;
    let energyScore = 0;

    // 2. Mood matching (Weight: 3.5)
    const moodMatch = song.tags.moods.some((m) => targetMoodTags.includes(m));
    if (moodMatch) {
      moodScore = 3.5;
      baseScore += 3.5;
    }

    // 3. Scene/Situation matching (Weight: 2.0)
    const sceneMatch = song.tags.situations.some((s) => targetSceneTags.includes(s));
    if (sceneMatch) {
      sceneScore = 2.0;
      baseScore += 2.0;
    }

    // 4. Time of Day matching (Weight: 1.5)
    const timeMatch = song.tags.timeOfDay.some((t) => targetTimeTags.includes(t));
    if (timeMatch) {
      timeScore = 1.5;
      baseScore += 1.5;
    }

    // 5. Weather matching (Weight: 1.5)
    if (answers.weather && song.tags.weather.includes(answers.weather as any)) {
      weatherScore = 1.5;
      baseScore += 1.5;
    }

    // 6. Season matching (Weight: 1.5)
    if (resolvedTargetSeason) {
      if (song.tags.seasons.includes(resolvedTargetSeason as any)) {
        seasonScore += 1.5;
      } else if (song.tags.seasons.includes('all_seasons')) {
        seasonScore += 0.5;
      }

      // 6.5 Pure Season Bonus (Weight: 0.8)
      if (
        song.tags.seasons.length === 1 &&
        song.tags.seasons.includes(resolvedTargetSeason as any)
      ) {
        seasonScore += 0.8;
      }
      baseScore += seasonScore;
    }

    // 7. Theme matching (Weight: 1.0)
    const themeMatchCount = song.tags.themes.filter((t) => targetThemes.includes(t)).length;
    if (themeMatchCount > 0) {
      themeScore = Math.min(1.5, themeMatchCount * 0.5);
      baseScore += themeScore;
    }

    // 8. Oshi Member matching (Weight: 3.0)
    if (answers.member && song.factualData.centerMembers?.includes(answers.member)) {
      baseScore += 3.0;
    } else if (answers.member && song.factualData.participatingMembers?.includes(answers.member)) {
      baseScore += 1.0;
    }

    // 9. Energy matching (Weight: 1.5)
    if (answers.energy) {
      if (answers.energy === 'high' && song.scores.energy >= 4) {
        energyScore = 1.5;
        baseScore += 1.5;
      } else if (answers.energy === 'low' && song.scores.energy <= 3) {
        energyScore = 1.5;
        baseScore += 1.5;
      }
    }

    // Compute normalizedScore (baseScore + specific mood adjustments + winter multi-condition bonus)
    let normalizedScore = baseScore;

    // Winter multi-condition bonus
    let winterBonus = 0;
    const winterAnsSeason = resolvedTargetSeason === 'winter';
    const winterAnsWeather = answers.weather === 'cold' || answers.weather === 'snowy';
    const winterAnsMood = answers.mood === 'romantic' || answers.mood === 'sad';
    const winterAnsTime = answers.timeOfDay === 'evening' || answers.timeOfDay === 'night';

    let winterUserMatches = 0;
    if (winterAnsSeason) winterUserMatches++;
    if (winterAnsWeather) winterUserMatches++;
    if (winterAnsMood) winterUserMatches++;
    if (winterAnsTime) winterUserMatches++;

    if (winterUserMatches >= 3) {
      let songWinterMatch = 0;
      if (song.tags.seasons.includes('winter')) songWinterMatch++;
      if (song.tags.weather.includes('cold') || song.tags.weather.includes('snowy')) songWinterMatch++;
      if (song.tags.moods.some((m) => ['romantic', 'sad', 'nostalgic'].includes(m))) songWinterMatch++;
      if (song.tags.timeOfDay.some((t) => ['evening', 'night'].includes(t))) songWinterMatch++;

      if (songWinterMatch >= 3) {
        winterBonus = 0.8;
        normalizedScore += 0.8;
      }
    }

    // Specific Mood Score Adjustments (romance / cuteness)
    let romanceOrCutenessAdjustment = 0;
    if (answers.mood === 'romantic') {
      romanceOrCutenessAdjustment = song.scores.romance * 0.4;
      normalizedScore += romanceOrCutenessAdjustment;
    } else if (answers.mood === 'cute') {
      romanceOrCutenessAdjustment = song.scores.cuteness * 0.4;
      normalizedScore += romanceOrCutenessAdjustment;
    }

    // Compute diversityAdjustment (random noise)
    let diversityAdjustment = 0;
    const diversityMode = options?.diversityMode ?? 'default';

    if (diversityMode === 'disabled') {
      diversityAdjustment = 0;
    } else if (diversityMode === 'seeded') {
      if (!answers.randomSeed) {
        throw new Error('[TuneEngine] randomSeed is required when diversityMode is "seeded"');
      }
      const nextRandom = seedRandom(answers.randomSeed + song.id);
      diversityAdjustment = nextRandom() * 0.2;
    } else {
      // default behavior
      const isTestEnv = process.env.NODE_ENV === 'test' || (typeof window !== 'undefined' && (window as any).isTestingEnv);
      if (answers.randomSeed) {
        const nextRandom = seedRandom(answers.randomSeed + song.id);
        diversityAdjustment = nextRandom() * 0.2;
      } else if (isTestEnv) {
        diversityAdjustment = 0;
      } else {
        diversityAdjustment = Math.random() * 0.2;
      }
    }

    // Compute finalScore
    let finalScore = normalizedScore + diversityAdjustment;

    if (history.includes(song.id)) {
      finalScore -= 2.0;
    }

    const breakdown: ScoreBreakdown = {
      moodScore,
      sceneScore,
      timeScore,
      weatherScore,
      seasonScore: seasonScore + winterBonus,
      themeScore,
      energyScore,
      romanceOrCutenessAdjustment,
      diversityAdjustment,
      baseScore,
      finalScore
    };

    const scoredSong: ScoredSong = {
      ...song,
      baseScore,
      normalizedScore,
      diversityAdjustment,
      finalScore,
      score: finalScore
    };

    if (options?.includeBreakdown) {
      scoredSong.breakdown = breakdown;
    }

    return scoredSong;
  });

  return scored
    .filter((s) => s.score > -150)
    .sort((a, b) => {
      // 1. finalScoreの高い順
      if (Math.abs(b.score - a.score) > 1e-9) {
        return b.score - a.score;
      }
      // 2. baseScoreの高い順
      if (Math.abs(b.baseScore - a.baseScore) > 1e-9) {
        return b.baseScore - a.baseScore;
      }
      // 3. confidenceの高い順
      const aConf = a.analysisBasis?.confidence ?? 0;
      const bConf = b.analysisBasis?.confidence ?? 0;
      if (bConf !== aConf) {
        return bConf - aConf;
      }
      // 4. song.idの昇順
      return a.id.localeCompare(b.id);
    });
}

export function matchSingleSong(answers: QuizAnswers, history: string[] = [], reviewedSongIds: string[] = []): Song {
  const list = calculateScores(answers, history, reviewedSongIds);
  
  if (list.length === 0) {
    // Fallback: Choose any approved active song from the database
    const approvedSongs = songs.filter(s => isRecommendationReady(s, reviewedSongIds));
    if (approvedSongs.length > 0) {
      return approvedSongs[Math.floor(Math.random() * approvedSongs.length)];
    }
    // Deep fallback to any non-review legacy song just in case
    const legacySongs = songs.filter(s => s.enabled && !s.needsReview);
    return legacySongs.length > 0 ? legacySongs[0] : songs[0];
  }
  
  return list[0];
}

export function generatePlaylist(answers: QuizAnswers, history: string[] = [], reviewedSongIds: string[] = []): PlaylistResult {
  const list = calculateScores(answers, history, reviewedSongIds);
  const activeSongs = list.filter(s => s.enabled);
  
  const count = activeSongs.length >= 5 ? 5 : activeSongs.length;
  const selectedSongs = activeSongs.slice(0, count);

  // Sort by energy to create a musical curve
  const sortedByEnergy = [...selectedSongs].sort((a, b) => a.scores.energy - b.scores.energy);
  const tracks: PlaylistTrack[] = [];

  // Match roles to the tracks
  const mapRoleLabel = (role: string): any => {
    switch (role) {
      case 'opening': return 'はじまりの曲';
      case 'build_up': return '気分を深める曲';
      case 'peak': return '中心になる曲';
      case 'change': return '少し風向きを変える曲';
      case 'cool_down':
      case 'ending':
      default:
        return '余韻を残す曲';
    }
  };

  if (selectedSongs.length === 5) {
    const highest = sortedByEnergy[4];
    const lowest = sortedByEnergy[0];
    const secondLowest = sortedByEnergy[1];
    const middle = sortedByEnergy[2];
    const secondHighest = sortedByEnergy[3];

    tracks.push({ song: secondHighest, role: mapRoleLabel(secondHighest.tags.playlistRoles[0] || 'opening') });
    tracks.push({ song: secondLowest, role: mapRoleLabel(secondLowest.tags.playlistRoles[0] || 'build_up') });
    tracks.push({ song: highest, role: mapRoleLabel(highest.tags.playlistRoles[0] || 'peak') });
    tracks.push({ song: middle, role: mapRoleLabel(middle.tags.playlistRoles[0] || 'change') });
    tracks.push({ song: lowest, role: mapRoleLabel(lowest.tags.playlistRoles[0] || 'ending') });
  } else if (selectedSongs.length === 4) {
    const highest = sortedByEnergy[3];
    const lowest = sortedByEnergy[0];
    const middleLow = sortedByEnergy[1];
    const middleHigh = sortedByEnergy[2];

    tracks.push({ song: middleHigh, role: mapRoleLabel(middleHigh.tags.playlistRoles[0] || 'opening') });
    tracks.push({ song: middleLow, role: mapRoleLabel(middleLow.tags.playlistRoles[0] || 'build_up') });
    tracks.push({ song: highest, role: mapRoleLabel(highest.tags.playlistRoles[0] || 'peak') });
    tracks.push({ song: lowest, role: mapRoleLabel(lowest.tags.playlistRoles[0] || 'ending') });
  } else if (selectedSongs.length === 3) {
    const highest = sortedByEnergy[2];
    const middle = sortedByEnergy[1];
    const lowest = sortedByEnergy[0];

    tracks.push({ song: lowest, role: mapRoleLabel(lowest.tags.playlistRoles[0] || 'opening') });
    tracks.push({ song: middle, role: mapRoleLabel(middle.tags.playlistRoles[0] || 'build_up') });
    tracks.push({ song: highest, role: mapRoleLabel(highest.tags.playlistRoles[0] || 'peak') });
  } else if (selectedSongs.length === 2) {
    const highest = sortedByEnergy[1];
    const lowest = sortedByEnergy[0];

    tracks.push({ song: lowest, role: mapRoleLabel(lowest.tags.playlistRoles[0] || 'opening') });
    tracks.push({ song: highest, role: mapRoleLabel(highest.tags.playlistRoles[0] || 'peak') });
  } else if (selectedSongs.length === 1) {
    const highest = sortedByEnergy[0];
    tracks.push({ song: highest, role: mapRoleLabel(highest.tags.playlistRoles[0] || 'peak') });
  }

  // Dynamic Title

  const moodLabel = getMoodLabel(answers.mood);
  const weatherLabel = getWeatherLabel(answers.weather);
  const timeLabel = getTimeLabel(answers.timeOfDay);

  let title = '';
  if (weatherLabel && timeLabel) {
    title = `${weatherLabel}の${timeLabel}に、${moodLabel}ための${selectedSongs.length}曲`;
  } else if (timeLabel) {
    title = `${timeLabel}に、${moodLabel}ための${selectedSongs.length}曲`;
  } else {
    title = `今の気分で、${moodLabel}ための${selectedSongs.length}曲`;
  }

  const moodDesc = getMoodLabel(answers.mood);
  const timeDesc = getTimeLabel(answers.timeOfDay) ? `${getTimeLabel(answers.timeOfDay)}の空気` : '今の気分';
  const description = `${timeDesc}に寄り添いながら、${moodDesc}ために厳選された楽曲プレイリストです。なだらかなメロディとエネルギーの曲線を繋いだ構成で、心地よい余韻をお届けします。`;

  return { title, description, tracks };
}

function getMoodLabel(mood?: string): string {
  switch (mood) {
    case 'energetic':
      return '元気になる';
    case 'hype':
      return '気持ちを高める';
    case 'calm':
      return 'ゆっくり落ち着く';
    case 'sad':
      return '涙をこぼして浸る';
    case 'romantic':
      return '甘酸っぱい恋を感じる';
    case 'support':
    case 'motivated':
      return '少しだけ前を向く';
    default:
      return '心地よい時間を過ごす';
  }
}

function getWeatherLabel(weather?: string): string {
  switch (weather) {
    case 'sunny':
      return '晴れた空';
    case 'cloudy':
      return '曇り空';
    case 'rainy':
      return '雨の降る日';
    case 'snowy':
      return '白く染まる雪のひ';
    case 'hot':
      return '暑い夏の日';
    case 'cold':
      return '肌寒い日';
    default:
      return '';
  }
}

function getTimeLabel(time?: string): string {
  switch (time) {
    case 'morning':
      return 'さわやかな朝';
    case 'afternoon':
    case 'daytime':
      return 'うららかな昼下がり';
    case 'evening':
      return '放課後の夕暮れ';
    case 'night':
      return '静まりかえった夜';
    default:
      return '';
  }
}
