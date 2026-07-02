import * as fs from 'fs';
import * as path from 'path';

// Define structures
type VerifiedSongEntry = {
  id: string;
  title: string;
  normalizedTitle: string;
  group: 'equal-love' | 'not-equal-me' | 'nearly-equal-joy' | 'ikonoijoy' | 'joint';
  officialReleaseTitle: string;
  officialReleaseDate?: string;
  officialSourceUrl: string;
  verifiedAt: string;
  sourceReleaseType?: string;
  verification?: {
    sourceType: string;
    sourceUrl: string;
    verifiedTitle: string;
    verifiedGroup: string;
    verifiedAt: string;
  };
};

type QuarantinedSong = {
  title: string;
  group: string;
  originalData: any;
  reason: 'not-in-official-whitelist';
  quarantinedAt: string;
};

type SongWhitelistAudit = {
  verifiedSongs: {
    equalLove: number;
    notEqualMe: number;
    nearlyEqualJoy: number;
    ikonoijoy: number;
  };
  quarantinedSongs: {
    title: string;
    group: string;
    reason: string;
  }[];
  titleCorrections: {
    before: string;
    after: string;
    officialSourceUrl: string;
  }[];
  duplicateSongs: string[];
};

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

const whitelistPath = '/Users/moriyasuretsu/Desktop/IKONOIJOY TUNE/src/data/catalog/verified-song-whitelist.json';
const rawWhitelist = fs.readFileSync(whitelistPath, 'utf-8');
const whitelist: VerifiedSongEntry[] = JSON.parse(rawWhitelist);

// Whitelist Duplicate Checks
// 1. Same group + normalizedTitle duplicate check
const groupTitleKeys = new Set<string>();
whitelist.forEach(w => {
  const norm = normalizeTitle(w.normalizedTitle || w.title);
  const key = `${w.group}:${norm}`;
  if (groupTitleKeys.has(key)) {
    console.error(`❌ 検証失敗: ホワイトリスト重複エラー: グループ [${w.group}] 内でタイトル "${w.title}" (${norm}) が重複しています。`);
    verificationFailed = true;
  }
  groupTitleKeys.add(key);
});

// 2. Same sourceUrl + verifiedTitle duplicate check (multiple IDs)
const urlTitleKeys = new Map<string, string>(); // url:title -> id
whitelist.forEach(w => {
  const url = w.verification?.sourceUrl;
  const verifiedTitle = w.verification?.verifiedTitle || w.title;
  if (url && url.trim() !== '') {
    const key = `${url}:${verifiedTitle}`;
    if (urlTitleKeys.has(key) && urlTitleKeys.get(key) !== w.id) {
      console.error(`❌ 検証失敗: ホワイトリスト重複エラー: 同一の公式ソースURL "${url}" とタイトル "${verifiedTitle}" の組み合わせが、異なるID [${urlTitleKeys.get(key)}] と [${w.id}] に存在します。`);
      verificationFailed = true;
    }
    urlTitleKeys.set(key, w.id);
  }
});

// 3. Same song title in multiple groups (requires explicit permit list / joint check)
const titleToGroups = new Map<string, string[]>();
whitelist.forEach(w => {
  const norm = normalizeTitle(w.normalizedTitle || w.title);
  const current = titleToGroups.get(norm) || [];
  current.push(w.group);
  titleToGroups.set(norm, current);
});

titleToGroups.forEach((groupList, norm) => {
  if (groupList.length > 1) {
    if (groupList.includes('joint')) {
      console.error(`❌ 検証失敗: ホワイトリスト重複エラー: 合同曲 (joint) の "${norm}" が単独グループ [${groupList.filter(g => g !== 'joint').join(', ')}] にも登録されています。`);
      verificationFailed = true;
    }
  }
});
const songsDir = '/Users/moriyasuretsu/Desktop/IKONOIJOY TUNE/src/data/songs';
const equalLoveSongsDir = path.join(songsDir, 'equal-love');
const notEqualMeFile = path.join(songsDir, 'not-equal-me.ts');
const nearlyEqualJoyFile = path.join(songsDir, 'nearly-equal-joy.ts');
const catalogPath = '/Users/moriyasuretsu/Desktop/IKONOIJOY TUNE/src/data/catalog/equal-love-catalog.json';

const audit: SongWhitelistAudit = {
  verifiedSongs: { equalLove: 0, notEqualMe: 0, nearlyEqualJoy: 0, ikonoijoy: 0 },
  quarantinedSongs: [],
  titleCorrections: [],
  duplicateSongs: []
};

const quarantinedList: QuarantinedSong[] = [];
const quarantinedPath = '/Users/moriyasuretsu/Desktop/IKONOIJOY TUNE/src/data/catalog/quarantine/unverified-songs.json';
if (fs.existsSync(quarantinedPath)) {
  try {
    const rawQ = fs.readFileSync(quarantinedPath, 'utf-8');
    const qList = JSON.parse(rawQ);
    quarantinedList.push(...qList);
  } catch (e) {
    // start fresh if corrupted
  }
}

let verificationFailed = false;

// We use separate sets to trace TS database file songs vs JSON catalog metadata songs
const processedTSKeys = new Set<string>();
const processedCatalogKeys = new Set<string>();
const processedAllGroups = new Map<string, string>(); // normalizedTitle -> group to detect cross-group overlaps

// Helper to disable song in file content string
function disableSongInFileContent(content: string, songId: string): string {
  const idRegex = new RegExp(`id:\\s*['"]${songId}['"]|["']id["']:\\s*["']${songId}["']`);
  const match = content.match(idRegex);
  if (!match || match.index === undefined) return content;

  const subContentStart = match.index;
  const subContent = content.substring(subContentStart, subContentStart + 2000);

  let modifiedSub = subContent
    .replace(/(["']enabled["']:\s*)true/, '$1false')
    .replace(/(enabled:\s*)true/, '$1false')
    .replace(/(["']enabledForRecommendation["']:\s*)true/, '$1false')
    .replace(/(enabledForRecommendation:\s*)true/, '$1false');

  if (!modifiedSub.includes('needsReview')) {
    if (modifiedSub.includes('enabledForRecommendation')) {
      modifiedSub = modifiedSub.replace(/(enabledForRecommendation:\s*false,?)/, '$1\n    needsReview: true,');
      modifiedSub = modifiedSub.replace(/("enabledForRecommendation":\s*false,?)/, '$1\n    "needsReview": true,');
    } else {
      modifiedSub = modifiedSub.replace(/(enabled:\s*false,?)/, '$1\n    needsReview: true,');
      modifiedSub = modifiedSub.replace(/("enabled":\s*false,?)/, '$1\n    "needsReview": true,');
    }
  } else {
    modifiedSub = modifiedSub
      .replace(/(needsReview:\s*)false/, '$1true')
      .replace(/(["']needsReview["']:\s*)false/, '$1true');
  }

  return content.substring(0, subContentStart) + modifiedSub + content.substring(subContentStart + 2000);
}

// Check target song entries
function checkSong(song: { id: string; title: string; group: string; originalData: any }, filePath: string, isJson: boolean) {
  // Skip checks for disabled or quarantined songs
  if (song.originalData.enabled === false) {
    return;
  }

  const normTitle = normalizeTitle(song.title);
  const matched = whitelist.find(w => normalizeTitle(w.normalizedTitle || w.title) === normTitle && w.group === song.group);

  // 1. Overture rule: Overture must not be enabled as a normal song
  if (normTitle === 'overture') {
    if (song.originalData.enabled !== false || song.originalData.enabledForRecommendation !== false) {
      console.error(`❌ 検証失敗: Overture [${song.title}] が通常楽曲として有効化されています。推薦・通常一覧から除外してください。`);
      verificationFailed = true;
    }
  }

  // 2. Placeholder/TBA rule
  if (song.title.includes('未定') || song.title.toLowerCase().includes('tba') || song.title.includes('タイトル未定')) {
    console.error(`❌ 検証失敗: 「タイトル未定」などの仮タイトル曲が登録されています: [${song.title}]`);
    verificationFailed = true;
  }

  // 3. Cover songs rule: Cover songs must not be registered
  const lowTitle = song.title.toLowerCase();
  if (lowTitle.includes('cover') || lowTitle.includes('カバー') || (song.originalData.notes && song.originalData.notes.toLowerCase().includes('cover'))) {
    console.error(`❌ 検証失敗: カバー曲が登録されています: [${song.title}]`);
    verificationFailed = true;
  }

  if (!matched) {
    console.error(`❌ 検証失敗: ホワイトリストに存在しない楽曲 [${song.title}] (グループ: ${song.group}) が ${filePath} に検出されました。`);
    verificationFailed = true;

    // Add to quarantine list
    if (!quarantinedList.some(q => q.title === song.title && q.group === song.group)) {
      quarantinedList.push({
        title: song.title,
        group: song.group,
        originalData: song.originalData,
        reason: 'not-in-official-whitelist',
        quarantinedAt: new Date().toISOString()
      });
    }

    audit.quarantinedSongs.push({
      title: song.title,
      group: song.group,
      reason: 'not-in-official-whitelist'
    });

    // Disable in file content if enabled
    if (song.originalData.enabled !== false || song.originalData.enabledForRecommendation !== false) {
      console.log(`⚠️ 自動無効化 & 隔離処理を実行中: ${song.title}`);
      let fileText = fs.readFileSync(filePath, 'utf-8');
      if (isJson) {
        const json = JSON.parse(fileText);
        const target = json.find((j: any) => j.id === song.id);
        if (target) {
          target.enabled = false;
          target.enabledForRecommendation = false;
          target.needsReview = true;
        }
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf-8');
      } else {
        const updatedText = disableSongInFileContent(fileText, song.id);
        fs.writeFileSync(filePath, updatedText, 'utf-8');
      }
    }
    return;
  }

  // 4. sourceReleaseType validation: Must exist and be an audio-only release type
  const allowedSourceTypes = ['single', 'album', 'mini-album', 'digital-single', 'digital-release'];
  const sourceReleaseType = (matched as any).sourceReleaseType;
  if (!sourceReleaseType || !allowedSourceTypes.includes(sourceReleaseType)) {
    console.error(`❌ 検証失敗: 楽曲 [${song.title}] に適正な音源作品種別(sourceReleaseType)が定義されていない、またはDVD/BD由来です。データ: ${sourceReleaseType}`);
    verificationFailed = true;
  }

  // Check group mapping matches whitelist exactly
  if (matched.group !== song.group) {
    console.error(`❌ 検証失敗: 楽曲 [${song.title}] のグループ不一致。データ: ${song.group}, ホワイトリスト: ${matched.group}`);
    verificationFailed = true;
  }

  // Check exact spelling matching
  if (matched.title !== song.title) {
    console.error(`❌ 検証失敗: 楽曲表記の不一致。データ: "${song.title}", ホワイトリスト: "${matched.title}"`);
    verificationFailed = true;
    audit.titleCorrections.push({
      before: song.title,
      after: matched.title,
      officialSourceUrl: matched.officialSourceUrl
    });
  }

  // Check duplicate song entries within the same database stream
  const duplicateKey = `${song.group}:${song.title}`;
  const trackingSet = isJson ? processedCatalogKeys : processedTSKeys;

  if (trackingSet.has(duplicateKey)) {
    console.error(`❌ 検証失敗: 重複登録された楽曲を検出: [${song.title}] (グループ: ${song.group}) [${isJson ? 'JSON Catalog' : 'TS Song'}]`);
    verificationFailed = true;
    if (!audit.duplicateSongs.includes(song.title)) {
      audit.duplicateSongs.push(song.title);
    }
  } else {
    trackingSet.add(duplicateKey);
  }

  // Check joint-group duplicates & multi-group registrations
  // (A song cannot be enabled in multiple groups, except for verified joint songs in ikonoijoy catalog)
  const crossGroupMatch = processedAllGroups.get(normTitle);
  if (crossGroupMatch && crossGroupMatch !== song.group) {
    // Both are individual groups (e.g. equal-love / not-equal-me / nearly-equal-joy) -> multiple group leakage!
    if (song.originalData.enabled !== false && song.originalData.reason !== 'overture') {
      console.error(`❌ 検証失敗: 同一曲 [${song.title}] が複数グループ (${crossGroupMatch} と ${song.group}) へ通常登録されています。`);
      verificationFailed = true;
    }
  } else {
    if (song.originalData.enabled !== false && song.originalData.reason !== 'overture') {
      processedAllGroups.set(normTitle, song.group);
    }
  }

  // Check Instrumental inclusion
  if (lowTitle.includes('inst') || lowTitle.includes('instrumental') || lowTitle.includes('off vocal')) {
    console.error(`❌ 検証失敗: Instrumental音源の混入を検出: [${song.title}]`);
    verificationFailed = true;
  }

  // Audit verified metrics count
  if (!isJson && song.originalData.enabled !== false && song.originalData.reason !== 'overture') {
    if (song.group === 'equal-love') audit.verifiedSongs.equalLove++;
    else if (song.group === 'not-equal-me') audit.verifiedSongs.notEqualMe++;
    else if (song.group === 'nearly-equal-joy') audit.verifiedSongs.nearlyEqualJoy++;
    else if (song.group === 'ikonoijoy') audit.verifiedSongs.ikonoijoy++;
  }
}


// Load TS files
function scanTSDataFile(filePath: string, group: string) {
  try {
    const rawExports = require(filePath);
    const songsArray: any[] = Object.values(rawExports)[0] as any[];
    songsArray.forEach(song => {
      checkSong({
        id: song.id,
        title: song.title,
        group: song.group || group,
        originalData: song
      }, filePath, false);
    });
  } catch (e) {
    console.error(`Error importing ${filePath}:`, e);
    verificationFailed = true;
  }
}

// 1. Scan =LOVE split TS files
if (fs.existsSync(equalLoveSongsDir)) {
  const files = fs.readdirSync(equalLoveSongsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  files.forEach(file => {
    scanTSDataFile(path.join(equalLoveSongsDir, file), 'equal-love');
  });
}

// 2. Scan not-equal-me and nearly-equal-joy TS files
if (fs.existsSync(notEqualMeFile)) scanTSDataFile(notEqualMeFile, 'not-equal-me');
if (fs.existsSync(nearlyEqualJoyFile)) scanTSDataFile(nearlyEqualJoyFile, 'nearly-equal-joy');

// 3. Scan equal-love-catalog.json
if (fs.existsSync(catalogPath)) {
  const content = fs.readFileSync(catalogPath, 'utf-8');
  const catalog = JSON.parse(content);
  catalog.forEach((item: any) => {
    checkSong({
      id: item.id,
      title: item.title,
      group: item.group,
      originalData: item
    }, catalogPath, true);
  });
}

// 3.5 Extended song ID validation on loaded array
const allDatabaseSongIds = new Set<string>();
const songsModule = require('../src/data/songs');
const songsList: any[] = songsModule.songs;

songsList.forEach(s => {
  if (!s.id) {
    console.error(`❌ 検証失敗: 楽曲 ID が空です: [${s.title}]`);
    verificationFailed = true;
  } else {
    // Check format
    if (s.id.trim() !== s.id) {
      console.error(`❌ 検証失敗: 楽曲 ID の前後に空白があります: [${s.id}]`);
      verificationFailed = true;
    }
    const idRegex = /^[a-zA-Z0-9\-_]+$/;
    if (!idRegex.test(s.id)) {
      console.error(`❌ 検証失敗: 楽曲 ID に不正な文字が含まれています: [${s.id}]`);
      verificationFailed = true;
    }
    // Check uniqueness
    if (allDatabaseSongIds.has(s.id)) {
      console.error(`❌ 検証失敗: 重複する楽曲 ID を検出しました: [${s.id}] (曲名: ${s.title})`);
      verificationFailed = true;
    }
    allDatabaseSongIds.add(s.id);
  }
});

// Verify review JSON, test fixture, and approved generated IDs exist in database
const reviewFilePathVal = '/Users/moriyasuretsu/Desktop/IKONOIJOY TUNE/src/data/reviews/song-review-status.json';
if (fs.existsSync(reviewFilePathVal)) {
  try {
    const rawVal = fs.readFileSync(reviewFilePathVal, 'utf-8');
    const reviewsVal = JSON.parse(rawVal);
    reviewsVal.forEach((r: any) => {
      if (!allDatabaseSongIds.has(r.songId)) {
        console.error(`❌ 検証失敗: レビューJSON内の ID [${r.songId}] は楽曲データベースに存在しません。`);
        verificationFailed = true;
      }
    });
  } catch (e) {}
}

const fixtureFilePathVal = '/Users/moriyasuretsu/Desktop/IKONOIJOY TUNE/tests/fixtures/song-review-status.test.json';
if (fs.existsSync(fixtureFilePathVal)) {
  try {
    const rawVal = fs.readFileSync(fixtureFilePathVal, 'utf-8');
    const reviewsVal = JSON.parse(rawVal);
    reviewsVal.forEach((r: any) => {
      if (!allDatabaseSongIds.has(r.songId)) {
        console.error(`❌ 検証失敗: テスト用 fixture JSON内の ID [${r.songId}] は楽曲データベースに存在しません。`);
        verificationFailed = true;
      }
    });
  } catch (e) {}
}

const generatedFilePathVal = '/Users/moriyasuretsu/Desktop/IKONOIJOY TUNE/src/data/reviews/approved-song-ids.generated.ts';
if (fs.existsSync(generatedFilePathVal)) {
  try {
    const rawVal = fs.readFileSync(generatedFilePathVal, 'utf-8');
    // Extract strings using regex
    const matches = rawVal.match(/"([^"]+)"/g);
    if (matches) {
      matches.forEach((m: string) => {
        const id = m.replace(/"/g, '');
        if (!allDatabaseSongIds.has(id)) {
          console.error(`❌ 検証失敗: 自動生成ファイル(approved-song-ids.generated.ts)内の ID [${id}] は楽曲データベースに存在しません。`);
          verificationFailed = true;
        }
      });
    }
  } catch (e) {}
}

// Write Quarantine Output
const quarantineDir = path.dirname(quarantinedPath);
if (!fs.existsSync(quarantineDir)) {
  fs.mkdirSync(quarantineDir, { recursive: true });
}
fs.writeFileSync(quarantinedPath, JSON.stringify(quarantinedList, null, 2), 'utf-8');

// Write Audit Report
const reportPath = '/Users/moriyasuretsu/Desktop/IKONOIJOY TUNE/reports/song-whitelist-audit.json';
const reportDir = path.dirname(reportPath);
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}
fs.writeFileSync(reportPath, JSON.stringify(audit, null, 2), 'utf-8');

console.log('--------------------------------------------------');
console.log(`監査レポート出力先: ${reportPath}`);
console.log(`検証完了: ＝LOVE: ${audit.verifiedSongs.equalLove}曲, ≠ME: ${audit.verifiedSongs.notEqualMe}曲, ≒JOY: ${audit.verifiedSongs.nearlyEqualJoy}曲`);
console.log(`隔離曲数: ${audit.quarantinedSongs.length}曲`);
console.log(`表記不一致: ${audit.titleCorrections.length}曲`);
console.log(`重複検出: ${audit.duplicateSongs.length}曲`);
console.log('--------------------------------------------------');

if (verificationFailed) {
  console.error('❌ 検証失敗: ホワイトリスト不整合またはデータ品質違反が検出されました。');
  process.exit(1);
} else {
  console.log('✅ 検証成功: すべての楽曲データが公式ホワイトリストと一致しています。');
  process.exit(0);
}
