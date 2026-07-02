import { Song } from './types';

export const jointSongs: Song[] = [
  {
    id: 'joint-triple-date',
    title: 'トリプルデート',
    group: 'joint',
    category: 'group',
    factualData: {
      releaseDate: '2022-07-03',
      releaseTitle: 'イコノイジョイ 2022',
      verificationStatus: 'verified',
      verifiedSources: [
        {
          field: 'title',
          url: 'https://equal-love.jp/news/detail/5312',
          note: 'Official Joint Release News'
        }
      ]
    },
    scores: {
      energy: 0,
      brightness: 0,
      sadness: 0,
      cuteness: 0,
      power: 0,
      calmness: 0,
      romance: 0,
      liveHype: 0
    },
    tags: {
      moods: [],
      situations: [],
      weather: [],
      timeOfDay: [],
      seasons: [],
      themes: [],
      tempos: [],
      playlistRoles: []
    },
    recommendation: {
      recommendedFor: '',
      recommendedSituation: '',
      notRecommendedSituation: '',
      recommendationText: '',
      listeningSuggestion: ''
    },
    recommendationVariants: [],
    analysisBasis: {
      interpretationNotes: '',
      confidence: 1
    },
    enabled: true,
    enabledForRecommendation: false,
    needsReview: true,
    recordType: 'song',
    verification: {
      titleVerified: true,
      releaseVerified: true,
      categoryVerified: true,
      sourceContainsExactTitle: true,
      verifiedSources: [
        'https://equal-love.jp/news/detail/5312'
      ],
      checkedAt: '2026-07-01T11:48:42.000Z'
    }
  }
];
