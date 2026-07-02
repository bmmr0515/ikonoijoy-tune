import { equalLoveSongs } from './equal-love';
import { notEqualMeSongs } from './not-equal-me';
import { nearlyEqualJoySongs } from './nearly-equal-joy';
import { jointSongs } from './joint';
import { Song } from './types';
import whitelist from '../catalog/verified-song-whitelist.json';

export * from './types';

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[\s　]/g, '')
    .replace(/[＝=－\-＿_]/g, '')
    .replace(/[！!？?]/g, '')
    .replace(/[““””"'’`‘]/g, '')
    .replace(/[（）()［］[\]]/g, '')
    .replace(/[「」]/g, '')
    .replace(/[・•]/g, '')
    .replace(/[ー〜~]/g, '');
}

export function assertSongExistsInWhitelist(song: Song): void {
  if (song.enabled === false) return; // Skip check for disabled/quarantined/overture songs
  const normTitle = normalizeTitle(song.title);
  const matched = whitelist.find(
    w => normalizeTitle(w.normalizedTitle || w.title) === normTitle && w.group === song.group
  );
  if (!matched) {
    const errorMsg = `[Whitelist Violation] Song "${song.title}" (${song.group}) is not registered in the official verified whitelist.`;
    if (process.env.NODE_ENV === 'development') {
      throw new Error(errorMsg);
    } else {
      console.error(errorMsg);
    }
  }
}

const rawSongs: Song[] = [
  ...equalLoveSongs,
  ...notEqualMeSongs,
  ...nearlyEqualJoySongs,
  ...jointSongs
];

// Mandatory verification checks on load
rawSongs.forEach(assertSongExistsInWhitelist);

export const songs = rawSongs;
