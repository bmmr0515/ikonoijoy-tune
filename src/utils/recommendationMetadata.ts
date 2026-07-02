import { Song } from '../data/songs';

export type MissingMetadataDetails = {
  missingScores: string[];
  missingTags: string[];
  missingRecommendation: string[];
  missingRecommendationVariants: string[];
  missingAnalysisBasis: string[];
};

export function isPlaceholderText(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  // Trim spaces, remove punctuation, and convert to lowercase
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[、。・！？!?\s:]/g, ''); // also strip colons

  // Exact-only matches to prevent false positives in normal descriptions
  const exactPlaceholders = [
    '仮',
    '準備中'
  ];
  if (exactPlaceholders.includes(normalized)) {
    return true;
  }

  const partialPlaceholders = [
    '確認中',
    '未設定',
    '未入力',
    'todo',
    'tbd'
  ];

  return partialPlaceholders.some(p => normalized.includes(p));
}

export function getMissingRecommendationMetadata(
  song: Song
): MissingMetadataDetails {
  const missingScores: string[] = [];
  const reqScores = [
    'energy',
    'brightness',
    'sadness',
    'cuteness',
    'power',
    'calmness',
    'romance',
    'liveHype',
    'nostalgia',
    'emotionalIntensity'
  ];
  reqScores.forEach(k => {
    if ((song.scores as any)[k] === undefined) {
      missingScores.push(k);
    }
  });

  const missingTags: string[] = [];
  const reqTags = [
    'moods',
    'situations',
    'weather',
    'timeOfDay',
    'seasons',
    'themes',
    'tempos',
    'playlistRoles'
  ];
  reqTags.forEach(k => {
    const val = song.tags ? (song.tags as any)[k] : undefined;
    if (!Array.isArray(val)) {
      missingTags.push(k);
    } else if (k !== 'weather' && val.length === 0) {
      missingTags.push(k);
    }
  });

  const missingRecommendation: string[] = [];
  const reqRecs = [
    'songImpression',
    'recommendedFor',
    'recommendedSituation',
    'notRecommendedSituation',
    'recommendationText',
    'listeningSuggestion'
  ];
  reqRecs.forEach(k => {
    const val = song.recommendation ? (song.recommendation as any)[k] : undefined;
    if (typeof val !== 'string' || val.trim() === '' || isPlaceholderText(val)) {
      missingRecommendation.push(k);
    }
  });

  const missingRecommendationVariants: string[] = [];
  if (!song.recommendationVariants || song.recommendationVariants.length === 0) {
    missingRecommendationVariants.push('recommendationVariants');
  } else {
    song.recommendationVariants.forEach((v, idx) => {
      if (v.conditionType === undefined) {
        missingRecommendationVariants.push(`variant[${idx}].conditionType`);
      }
      if (typeof v.text !== 'string' || v.text.trim() === '' || isPlaceholderText(v.text)) {
        missingRecommendationVariants.push(`variant[${idx}].text`);
      }
    });
  }

  const missingAnalysisBasis: string[] = [];
  if (!song.analysisBasis) {
    missingAnalysisBasis.push('analysisBasis');
  } else {
    if (
      typeof song.analysisBasis.interpretationNotes !== 'string' ||
      song.analysisBasis.interpretationNotes.trim() === '' ||
      isPlaceholderText(song.analysisBasis.interpretationNotes)
    ) {
      missingAnalysisBasis.push('interpretationNotes');
    }
    if (typeof song.analysisBasis.confidence !== 'number') {
      missingAnalysisBasis.push('confidence');
    }
  }

  return {
    missingScores,
    missingTags,
    missingRecommendation,
    missingRecommendationVariants,
    missingAnalysisBasis
  };
}

export function hasValidRecommendationMetadata(
  song: Song
): boolean {
  const details = getMissingRecommendationMetadata(song);
  return (
    details.missingScores.length === 0 &&
    details.missingTags.length === 0 &&
    details.missingRecommendation.length === 0 &&
    details.missingRecommendationVariants.length === 0 &&
    details.missingAnalysisBasis.length === 0
  );
}
