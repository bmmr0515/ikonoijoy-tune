import { approvedSongIds } from '../data/reviews/approved-song-ids.generated';

export function getProductionApprovedSongIds(): string[] {
  return [...approvedSongIds];
}
