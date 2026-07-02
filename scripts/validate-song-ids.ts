import * as fs from 'fs';
import * as path from 'path';
import { songs } from '../src/data/songs';
import { songIdMigrations } from '../src/data/catalog/song-id-migrations';

const registryPath = path.join(__dirname, '../src/data/catalog/song-id-registry.json');

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

function runIdValidation() {
  console.log('🏁 Starting track ID audits validation...');
  let failed = false;

  // 1. Load registry
  if (!fs.existsSync(registryPath)) {
    console.error('❌ Validation Error: song-id-registry.json does not exist!');
    process.exit(1);
  }
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const registryMap = new Map<string, any>(registry.map((r: any) => [r.id, r]));

  // 2. Validate current songs ID rules
  const seenIds = new Set<string>();
  const seenGroupTitles = new Set<string>();

  songs.forEach(song => {
    const { id, title, group } = song;

    // Check temp prefix rules
    if (id.includes('auto-track-') || id.includes('auto-musicvideo-')) {
      console.error(`❌ Validation Error: Auto-generated temporary ID format detected: [${id}] (Song: ${title})`);
      failed = true;
    }

    // Check unique ID
    if (seenIds.has(id)) {
      console.error(`❌ Validation Error: Duplicate song ID inside active songs list: [${id}] (Song: ${title})`);
      failed = true;
    }
    seenIds.add(id);

    // Check unique title per group
    const norm = normalizeTitle(title);
    const groupTitleKey = `${group}:${norm}`;
    if (seenGroupTitles.has(groupTitleKey)) {
      console.error(`❌ Validation Error: Duplicate normalized title within same group detected: [${title}] (${group})`);
      failed = true;
    }
    seenGroupTitles.add(groupTitleKey);

    // Cross-ref with registry
    const registryItem = registryMap.get(id);
    if (!registryItem) {
      console.error(`❌ Validation Error: Song ID [${id}] (${title}) is missing from the ID registry!`);
      failed = true;
    } else {
      if (registryItem.title !== title) {
        console.error(`❌ Validation Error: Title mismatch in ID registry for [${id}]: DB Title: "${title}", Registry Title: "${registryItem.title}"`);
        failed = true;
      }
      if (registryItem.group !== group) {
        console.error(`❌ Validation Error: Group mismatch in ID registry for [${id}]: DB Group: "${group}", Registry Group: "${registryItem.group}"`);
        failed = true;
      }
    }

    // 2.5 New verification validations
    // Rule 1: recordType !== "song" item must not be enabled for recommendation
    if (song.recordType && song.recordType !== 'song' && song.enabledForRecommendation === true) {
      console.error(`❌ Validation Error: Non-song record [${id}] (${title}) must have enabledForRecommendation set to false!`);
      failed = true;
    }

    // Rule 3 & 4: music_video and making_video must have relatedSongId pointing to a real "song" record
    if (song.recordType === 'music_video' || song.recordType === 'making_video') {
      if (!song.relatedSongId) {
        console.error(`❌ Validation Error: Video record [${id}] (${title}) must have relatedSongId!`);
        failed = true;
      } else {
        const parent = songs.find(s => s.id === song.relatedSongId);
        if (!parent) {
          console.error(`❌ Validation Error: relatedSongId [${song.relatedSongId}] on [${id}] does not exist in songs list!`);
          failed = true;
        } else if (parent.recordType !== 'song') {
          console.error(`❌ Validation Error: relatedSongId [${song.relatedSongId}] on [${id}] must refer to a song record type! (Target recordType: ${parent.recordType})`);
          failed = true;
        }
      }
    }

    // Rule 5: official confirmed songs (needsReview !== true) must have verification sourceUrl
    const whitelistPathVal = path.join(__dirname, '../src/data/catalog/verified-song-whitelist.json');
    if (fs.existsSync(whitelistPathVal)) {
      const whitelist = JSON.parse(fs.readFileSync(whitelistPathVal, 'utf-8'));
      const wlEntry = whitelist.find((w: any) => w.title === title && w.group === group);
      const isOfficialSong = song.recordType === 'song';
      
      if (isOfficialSong && song.needsReview !== true) {
        const sourceUrl = wlEntry?.verification?.sourceUrl;
        if (!sourceUrl || sourceUrl.trim() === '') {
          console.error(`❌ Validation Error: Official song [${id}] (${title}) is set to needsReview: false, but has no sourceUrl in whitelist verification!`);
          failed = true;
        }
      }
      
      // Rule 5.5: sourceUrlのないsongはneedsReviewをtrueにする
      if (isOfficialSong && (!wlEntry?.verification?.sourceUrl || wlEntry.verification.sourceUrl.trim() === '')) {
        if (song.needsReview !== true) {
          console.error(`❌ Validation Error: Song [${id}] (${title}) has no verification sourceUrl, so needsReview must be true!`);
          failed = true;
        }
      }
    }

    // Rule 6: quarantineReason exists must have enabledForRecommendation set to false
    if (song.quarantineReason && song.enabledForRecommendation !== false) {
      console.log(`song: ${JSON.stringify(song)}`);
      console.error(`❌ Validation Error: Quarantined record [${id}] (${title}) must have enabledForRecommendation set to false!`);
      failed = true;
    }

    // Rule 7: enabledForRecommendation: true, needsReview: false, recordType === "song" must have valid recommendation metadata (Warnings only, no build blocking)
    if (song.recordType === 'song' && song.enabledForRecommendation === true && song.needsReview !== true) {
      const hasValidMeta = song.scores && typeof song.scores.energy === 'number' &&
                           song.tags && Array.isArray(song.tags.moods) && song.tags.moods.length > 0 &&
                           song.recommendation && typeof song.recommendation.recommendationText === 'string' && song.recommendation.recommendationText.trim() !== '' &&
                           song.analysisBasis && typeof song.analysisBasis.confidence === 'number' && song.analysisBasis.confidence > 0;
      if (!hasValidMeta) {
        console.warn(`⚠️ Validation Warning: Song [${id}] (${title}) is enabled for recommendation but has incomplete metadata!`);
      }
    }
  });

  // 3. Check legacy ID migrations rules
  const migrationSourceIds = new Set<string>();
  const migrationTargetIds = new Set<string>();

  Object.entries(songIdMigrations).forEach(([oldId, stableId]) => {
    // Check oldId duplication
    if (migrationSourceIds.has(oldId)) {
      console.error(`❌ Validation Error: Duplicate migration source detected: [${oldId}]`);
      failed = true;
    }
    migrationSourceIds.add(oldId);

    // Verify stableId actually exists in the current registry/songs list
    if (!seenIds.has(stableId)) {
      console.error(`❌ Validation Error: Migration target ID [${stableId}] does not exist in current database songs list!`);
      failed = true;
    }

    // Check legacy temp ID format still present in active DB
    if (seenIds.has(oldId)) {
      console.error(`❌ Validation Error: Legacy ID [${oldId}] is still active in database! It must be replaced by its stable ID [${stableId}].`);
      failed = true;
    }
  });

  if (failed) {
    console.error('❌ Validation Failed: Song ID quality violations found.');
    process.exit(1);
  } else {
    console.log('✅ Validation Succeeded: All track IDs pass stability checks!');
    process.exit(0);
  }
}

runIdValidation();
