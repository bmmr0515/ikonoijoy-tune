import { allSongs } from '../data/songs';
import { nonSongContents } from '../data/content/non-song-content';
import { getProductionApprovedSongIds } from './approvedSongs';

export interface CatalogStats {
  totalContent: number;
  regularSongs: number;
  overtures: number;
  jointSongs: number;
  videoContent: number;
  recommendationEligibleSongs: number;
  approvedRegularSongs: number;
  remainingRegularSongs: number;
}

export function getCatalogStats(): CatalogStats {
  const approvedIds = getProductionApprovedSongIds();
  
  // 通常楽曲（recordType が song で、かつ合同曲でないもの）
  const regular = allSongs.filter(s => s.recordType === 'song' && s.id !== 'joint-triple-date');
  const overtures = allSongs.filter(s => s.recordType === 'overture');
  
  // 合同曲（id が joint-triple-date のもの）
  const joint = allSongs.filter(s => s.id === 'joint-triple-date');
  
  const videos = nonSongContents;

  const approved = regular.filter(s => approvedIds.includes(s.id));
  const remaining = regular.filter(s => !approvedIds.includes(s.id));

  return {
    totalContent: allSongs.length, // allSongs全体の件数 (通常楽曲 + overture + videos_in_allSongs) = 179
    regularSongs: regular.length, // 159通常楽曲
    overtures: overtures.length,
    jointSongs: joint.length, // 1 (joint-triple-date)
    videoContent: videos.length,
    recommendationEligibleSongs: regular.length,
    approvedRegularSongs: approved.length, // 69承認済み通常楽曲（合同曲を除く）
    remainingRegularSongs: remaining.length
  };
}
