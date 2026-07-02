export interface SongReviewStatus {
  songId: string;
  group: string;
  checks: {
    impressionIsAccurate: boolean;
    tagsAreAccurate: boolean;
    seasonHasEvidence: boolean;
    recommendationFits: boolean;
    noOverstatement: boolean;
    copyIsDistinct: boolean;
    rankingFeelsNatural: boolean;
  };
  reviewed: boolean;
  reviewedAt?: string;
  reviewerNote?: string;
}

export function getEffectiveNeedsReview(
  song: { id: string; needsReview?: boolean },
  reviewedSongIds: string[] = []
): boolean {
  return !!song.needsReview && !reviewedSongIds.includes(song.id);
}
