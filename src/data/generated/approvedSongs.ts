import { approvedSongIds } from '../reviews/approved-song-ids.generated';

export const approvedSongs = approvedSongIds;
export function getApprovedSongs() {
  return [...approvedSongs];
}
