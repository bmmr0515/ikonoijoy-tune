export type MoodTag =
  | 'happy'
  | 'excited'
  | 'calm'
  | 'sad'
  | 'lonely'
  | 'romantic'
  | 'motivated'
  | 'nostalgic'
  | 'confident'
  | 'healing'
  | 'playful'
  | 'cute'
  | 'bittersweet'
  | 'dramatic'
  | 'dreamy'
  | 'rebellious';

export type SituationTag =
  | 'commute'
  | 'study'
  | 'work'
  | 'walking'
  | 'driving'
  | 'relaxing'
  | 'before_sleep'
  | 'before_live'
  | 'after_live'
  | 'morning_routine'
  | 'getting_ready'
  | 'train_ride'
  | 'night_walk'
  | 'after_school'
  | 'celebration'
  | 'alone_time';

export type WeatherTag =
  | 'sunny'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'hot'
  | 'cold'
  | 'clear_night'
  | 'humid'
  | 'breezy';

export type TimeTag =
  | 'morning'
  | 'daytime'
  | 'evening'
  | 'night'
  | 'late_night';

export type SeasonTag =
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'
  | 'all_seasons';

export type ThemeTag =
  | 'love'
  | 'unrequited_love'
  | 'breakup'
  | 'friendship'
  | 'youth'
  | 'dream'
  | 'challenge'
  | 'self_acceptance'
  | 'gratitude'
  | 'memories'
  | 'jealousy'
  | 'longing'
  | 'independence'
  | 'farewell'
  | 'celebration'
  | 'identity'
  | 'promise';

export type TempoTag =
  | 'slow'
  | 'medium'
  | 'upbeat';

export type PlaylistRoleTag =
  | 'opening'
  | 'build_up'
  | 'peak'
  | 'change'
  | 'cool_down'
  | 'ending';

export type Song = {
  id: string;
  title: string;
  group: 'equal-love' | 'not-equal-me' | 'nearly-equal-joy' | 'joint';
  category?: 'group' | 'unit' | 'solo' | 'other' | 'unknown';

  factualData: {
    releaseDate?: string;
    releaseTitle?: string;
    centerMembers?: string[];
    participatingMembers?: string[];
    singingMembers?: string[];
    durationSeconds?: number;
    lyricist?: string;
    composer?: string;
    arranger?: string;
    verificationStatus: 'verified' | 'partially-verified' | 'needs-review';
    verifiedSources?: {
      field: 'title' | 'release' | 'center' | 'members' | 'youtube';
      url: string;
      note?: string;
    }[];
  };

  scores: {
    energy: number;
    brightness: number;
    sadness: number;
    cuteness: number;
    power: number;
    calmness: number;
    romance: number;
    liveHype: number;
    nostalgia?: number;
    emotionalIntensity?: number;
  };

  tags: {
    moods: MoodTag[];
    situations: SituationTag[];
    weather: WeatherTag[];
    timeOfDay: TimeTag[];
    seasons: SeasonTag[];
    themes: ThemeTag[];
    tempos: TempoTag[];
    playlistRoles: PlaylistRoleTag[];
  };

  recommendation: {
    songImpression?: string;
    recommendedFor: string;
    recommendedSituation: string;
    notRecommendedSituation: string;
    recommendationText: string;
    listeningSuggestion: string;
    otherDisplayText?: string;
  };

  recommendationVariants: {
    conditionType?: 'mood' | 'situation' | 'weather' | 'timeOfDay' | 'season';
    condition: string;
    text: string;
  }[];

  analysisBasis?: {
    interpretationNotes?: string;
    confidence: number;
  };

  enabled: boolean;
  enabledForRecommendation?: boolean;
  needsReview?: boolean;
  reason?: string;
  quarantineReason?: string;
  recordType?: 'song' | 'overture' | 'music_video' | 'making_video' | 'variety_video' | 'live_video' | 'fanclub_content' | 'unknown';
  contentType?: string;
  relatedSongId?: string;

  releases?: {
    title: string;
    releaseType: 'single' | 'album' | 'mini-album' | 'digital-single' | 'digital-release' | 'other';
    releaseDate?: string;
    trackNumber?: number;
    officialSourceUrl: string;
  }[];

  verification?: {
    titleVerified: boolean;
    releaseVerified: boolean;
    categoryVerified: boolean;
    sourceContainsExactTitle: boolean;
    verifiedSources: string[];
    checkedAt: string;
  };
  reviewRequirement?: ReviewRequirement;
};

export type ReviewRequirement =
  | 'human_approved'
  | 'needs_review'
  | 'legacy_curated';

