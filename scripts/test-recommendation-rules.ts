import { songs, Song } from '../src/data/songs';
import { MoodTag } from '../src/data/songs/types';
import {
  calculateScores,
  isRecommendationReady,
  hasValidRecommendationMetadata,
  getReviewRequirement,
  getEffectiveNeedsReview,
  isMoodAnswer,
  MOOD_ANSWERS,
  MOOD_TAG_MAP,
  MoodAnswer,
  QuizAnswers
} from '../src/utils/tuneEngine';
import {
  getMissingRecommendationMetadata,
  isPlaceholderText
} from '../src/utils/recommendationMetadata';
import { songIdMigrations } from '../src/data/catalog/song-id-migrations';
import { questionsData } from '../src/data/questions';
import * as fs from 'fs';
import * as path from 'path';

const songIdRegistry = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../src/data/catalog/song-id-registry.json'),
    'utf8'
  )
) as { id: string; title: string; group: string }[];

console.log('🏁 Running Strict Type-Safe Recommendation Engine Rule Tests...');
let testFailed = false;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    testFailed = true;
  } else {
    console.log(`✅ Passed: ${message}`);
  }
}

function createValidTestSong(overrides: Partial<Song>): Song {
  return {
    id: 'test-song-id',
    title: 'テスト曲',
    group: 'not-equal-me',
    category: 'group',
    factualData: {
      releaseDate: '2026-07-02',
      verificationStatus: 'verified'
    },
    scores: {
      energy: 3,
      brightness: 3,
      sadness: 3,
      cuteness: 3,
      power: 3,
      calmness: 3,
      romance: 3,
      liveHype: 3,
      nostalgia: 3,
      emotionalIntensity: 3
    },
    tags: {
      moods: ['happy'],
      situations: ['walking'],
      weather: ['sunny'],
      timeOfDay: ['morning'],
      seasons: ['spring'],
      themes: ['love'],
      tempos: ['medium'],
      playlistRoles: ['build_up']
    },
    recommendation: {
      songImpression: 'テスト印象',
      recommendedFor: 'テスト対象者',
      recommendedSituation: 'テスト状況',
      notRecommendedSituation: 'テスト非推奨状況',
      recommendationText: 'テスト推薦文',
      listeningSuggestion: 'テスト提案'
    },
    recommendationVariants: [
      {
        conditionType: 'timeOfDay',
        condition: 'morning',
        text: 'テストバリアント'
      },
      {
        conditionType: 'situation',
        condition: 'walking',
        text: 'テストバリアント2'
      }
    ],
    enabled: true,
    enabledForRecommendation: true,
    needsReview: false,
    analysisBasis: {
      interpretationNotes: 'テスト解釈',
      confidence: 90
    },
    releases: [],
    verification: {
      titleVerified: true,
      releaseVerified: true,
      categoryVerified: true,
      sourceContainsExactTitle: true,
      verifiedSources: [],
      checkedAt: '2026-07-02T00:00:00Z'
    },
    recordType: 'song',
    ...overrides
  };
}

// 1. undefinedはlegacy_curatedへ分類されること
const mockLegacyCurated = createValidTestSong({
  needsReview: undefined
});
assert(getReviewRequirement(mockLegacyCurated) === 'legacy_curated', 'needsReview: undefined is classified as legacy_curated');

// 2. legacy_curatedはhumanApproved数に含まれないこと
assert(getReviewRequirement(mockLegacyCurated) !== 'human_approved', 'legacy_curated is not classified as human_approved');

// 3. legacy_curated かつ Strict完成済みなら推薦可能であること
const mockLegacyComplete = createValidTestSong({
  id: 'test-legacy-complete',
  needsReview: undefined
});
assert(hasValidRecommendationMetadata(mockLegacyComplete) === true, 'mock legacy complete has valid strict metadata');
assert(isRecommendationReady(mockLegacyComplete, []) === true, 'legacy_curated + strictComplete is recommendation ready without approved IDs');

// 4. legacy_curated でも Strict不完全なら推薦不可であること
const mockLegacyIncomplete = createValidTestSong({
  id: 'test-legacy-incomplete',
  needsReview: undefined,
  recommendation: {
    songImpression: '楽曲情報を確認中です',
    recommendedFor: '楽曲情報を確認中です',
    recommendedSituation: '楽曲情報を確認中です',
    notRecommendedSituation: '楽曲情報を確認中です',
    recommendationText: '楽曲情報を確認中です',
    listeningSuggestion: '楽曲情報を確認中です'
  }
});
assert(hasValidRecommendationMetadata(mockLegacyIncomplete) === false, 'mock legacy incomplete lacks strict metadata');
assert(isRecommendationReady(mockLegacyIncomplete, []) === false, 'legacy_curated + strictIncomplete is NOT recommendation ready');

// 5. needs_reviewは承認IDなしでは推薦不可、ありで推薦可能であること
const mockNeedsReview = createValidTestSong({
  id: 'test-needs-review',
  reviewRequirement: 'needs_review',
  needsReview: true
});
assert(getReviewRequirement(mockNeedsReview) === 'needs_review', 'mock song is needs_review');
assert(isRecommendationReady(mockNeedsReview, []) === false, 'needs_review mock song is NOT ready without approved ID');
assert(isRecommendationReady(mockNeedsReview, ['test-needs-review']) === true, 'needs_review mock song is ready with approved ID');

// 6. questions.tsの全mood値がMoodAnswerとして有効であることを検証
const questionsMoods = questionsData.quick
  .find(q => q.id === 'mood')
  ?.options.map(o => o.value) || [];

assert(questionsMoods.length > 0, 'questions.ts quick mood options exist');
questionsMoods.forEach(val => {
  assert(isMoodAnswer(val) === true, `questions.ts mood value "${val}" is valid MoodAnswer`);
});

// 7. MOOD_ANSWERSの全値にMOOD_TAG_MAPが存在することを検証
MOOD_ANSWERS.forEach(val => {
  assert(MOOD_TAG_MAP[val] !== undefined, `MOOD_TAG_MAP contains entry for "${val}"`);
});

// 8. 開発用QAの全シミュレーションシナリオがQuizAnswersへ型適合し、as anyが無いことを静的に検証
// We read page.tsx files and verify they don't contain "as any" for mood parameter
const equalLovePath = path.join(__dirname, '../src/app/dev/song-review/equal-love/page.tsx');
const nearlyJoyPath = path.join(__dirname, '../src/app/dev/song-review/nearly-equal-joy/page.tsx');

if (fs.existsSync(equalLovePath)) {
  const content = fs.readFileSync(equalLovePath, 'utf8');
  assert(!content.includes('mood: mood as any'), 'equal-love/page.tsx contains no "mood as any"');
  assert(!content.includes('as any') || !content.includes('mood'), 'equal-love/page.tsx does not use "as any" for mood values');
}
if (fs.existsSync(nearlyJoyPath)) {
  const content = fs.readFileSync(nearlyJoyPath, 'utf8');
  assert(!content.includes('mood: mood as any'), 'nearly-equal-joy/page.tsx contains no "mood as any"');
  assert(!content.includes('as any') || !content.includes('mood'), 'nearly-equal-joy/page.tsx does not use "as any" for mood values');
}

// 9. 不正な URL mood は validation で弾かれる（undefined）こと、正式な mood は復元されること
assert(isMoodAnswer('invalid-mood') === false, '"invalid-mood" is rejected by validator');
assert(isMoodAnswer('energetic') === true, '"energetic" is accepted by validator');

// 10. Test song creator helper for isolation
function createValidTestSong(id: string, moods: MoodTag[]): Song {
  return {
    id,
    title: `Test Song ${id}`,
    group: 'not-equal-me',
    recordType: 'song',
    factualData: {
      releaseDate: '2026-07-02',
      verificationStatus: 'needs-review'
    },
    scores: {
      energy: 3,
      brightness: 3,
      sadness: 3,
      cuteness: 3,
      power: 3,
      calmness: 3,
      romance: 3,
      liveHype: 3,
      nostalgia: 3,
      emotionalIntensity: 3
    },
    tags: {
      moods,
      situations: ['walking'],
      weather: ['sunny'],
      timeOfDay: ['daytime'],
      seasons: ['all_seasons'],
      themes: ['love'],
      tempos: ['medium'],
      playlistRoles: ['build_up']
    },
    recommendation: {
      songImpression: 'テスト用の楽曲印象説明文言です。',
      recommendedFor: 'テスト用おすすめ対象文言です。',
      recommendedSituation: 'テスト用おすすめシチュエーション文言です。',
      notRecommendedSituation: 'テスト用非推奨シチュエーション文言です。',
      recommendationText: 'テスト用の詳細な推薦テキスト文言です。',
      listeningSuggestion: 'テスト用のリスニング提案文言です。'
    },
    recommendationVariants: [
      {
        conditionType: 'mood',
        condition: moods[0] || 'happy',
        text: 'テスト用のバリアント推薦テキスト文言です。'
      }
    ],
    enabled: true,
    enabledForRecommendation: true,
    reviewRequirement: 'needs_review',
    needsReview: true,
    analysisBasis: {
      interpretationNotes: 'テスト用の解釈ノート文言です。',
      confidence: 100
    }
  };
}

function getMoodScoreFor(moodInput: MoodAnswer | string, testSong: Song) {
  const list = calculateScores(
    { proposalType: 'single', group: 'all', mood: moodInput as any },
    [],
    [testSong.id],
    { includeBreakdown: true, sourceSongs: [testSong] }
  );
  const found = list.find(s => s.id === testSong.id);
  return found?.breakdown?.moodScore ?? 0;
}

// 保存しておく
const beforeIds = songs.map(song => song.id);

// Verification of all MoodAnswers mapping using test songs (no skipping, no global mutation)
let testedMoodCount = 0;
MOOD_ANSWERS.forEach(mood => {
  const mappedTags = MOOD_TAG_MAP[mood];
  assert(mappedTags && mappedTags.length > 0, `MoodAnswer "${mood}" has no mapped tags`);

  const testSongId = `test-mood-${mood}`;
  const testSong = createValidTestSong(testSongId, [mappedTags[0]]);

  // 1. Verify correct mapping scores 3.5
  const score = getMoodScoreFor(mood, testSong);
  assert(score === 3.5, `MoodAnswer "${mood}" yields 3.5 moodScore for matching tag`);

  // 2. Verify non-matching tag scores 0
  const nonMatchingTag = mappedTags[0] === 'sad' ? 'happy' as MoodTag : 'sad' as MoodTag;
  const testSongNonMatchingId = `test-mood-nonmatch-${mood}`;
  const testSongNonMatching = createValidTestSong(testSongNonMatchingId, [nonMatchingTag]);

  const scoreNonMatch = getMoodScoreFor(mood, testSongNonMatching);
  assert(scoreNonMatch === 0, `MoodAnswer "${mood}" yields 0 moodScore for non-matching tag`);

  testedMoodCount++;
});

assert(testedMoodCount === MOOD_ANSWERS.length, 'All MoodAnswers are verified');

// Typos and invalid values should yield 0 moodScore
const typoSongId = 'test-typo-validation';
const typoSong = createValidTestSong(typoSongId, ['nostalgic', 'bittersweet', 'healing']);
assert(getMoodScoreFor('nostaligic', typoSong) === 0, 'typo "nostaligic" gets 0');
assert(getMoodScoreFor('bitersweet', typoSong) === 0, 'typo "bitersweet" gets 0');
assert(getMoodScoreFor('healng', typoSong) === 0, 'typo "healng" gets 0');

// カタログ非破壊テストの事後検証
const afterIds = songs.map(song => song.id);
assert(
  beforeIds.length === afterIds.length && beforeIds.every((id, idx) => id === afterIds[idx]),
  'Catalog songs array must remain untouched after tests'
);
console.log('✅ Passed: Catalog array is completely untouched');

// 10b. Placeholder detection validation
assert(isPlaceholderText('確認中です') === true, 'Exact match placeholder detected');
assert(isPlaceholderText('現在確認中です') === true, 'Partial match placeholder detected');
assert(isPlaceholderText('TODO') === true, 'Uppercase placeholder normalized and detected');
assert(isPlaceholderText('TODO: 後で記入') === true, 'Colon prefix placeholder detected');
assert(isPlaceholderText('仮') === true, 'Exact "仮" placeholder detected');
assert(isPlaceholderText('仮テキスト') === false, 'Partial "仮" text is NOT placeholder');
assert(isPlaceholderText('未設定。') === true, 'Punctuation placeholder normalized and detected');
assert(isPlaceholderText('仮面') === false, '"仮面" is not placeholder');
assert(isPlaceholderText('予定') === false, '"予定" is not placeholder');

// 10c. Seed reproducibility and diversity adjustment validation (NODE_ENV independent)
const queryBase = {
  group: 'all',
  mood: 'motivated' as const,
  scene: 'study',
  timeOfDay: 'morning',
  weather: 'sunny',
  proposalType: 'single' as const
};

// 1. Same seed yields identical adjustments
const seedA1 = calculateScores(
  { ...queryBase, randomSeed: 'test-seed-a' },
  [],
  [],
  { includeBreakdown: true, diversityMode: 'seeded' }
);
const seedA2 = calculateScores(
  { ...queryBase, randomSeed: 'test-seed-a' },
  [],
  [],
  { includeBreakdown: true, diversityMode: 'seeded' }
);

assert(seedA1.length === seedA2.length, 'Seeded results length matches');
seedA1.forEach((song, idx) => {
  const match = seedA2.find(s => s.id === song.id);
  assert(match !== undefined, `Song "${song.id}" exists in both runs`);
  assert(song.diversityAdjustment === match!.diversityAdjustment, `diversityAdjustment matches for "${song.id}"`);
});

// 2. Different seed changes diversityAdjustment for at least 1 song
const seedB = calculateScores(
  { ...queryBase, randomSeed: 'test-seed-b' },
  [],
  [],
  { includeBreakdown: true, diversityMode: 'seeded' }
);
let hasDifference = false;
seedA1.forEach(song => {
  const match = seedB.find(s => s.id === song.id);
  if (match && song.diversityAdjustment !== match.diversityAdjustment) {
    hasDifference = true;
  }
});
assert(hasDifference, 'At least one song diversityAdjustment changes between different seeds');

// 3. No seed yields exactly 0 adjustment under diversityMode: 'disabled'
const noSeed = calculateScores(
  { ...queryBase },
  [],
  [],
  { includeBreakdown: true, diversityMode: 'disabled' }
);
noSeed.forEach(song => {
  assert(song.diversityAdjustment === 0, `No-seed in disabled env yields 0 adjustment for "${song.id}"`);
});

// 4. Seeded run yields at least one non-zero adjustment
let hasNonZero = false;
seedA1.forEach(song => {
  if (song.diversityAdjustment !== 0) {
    hasNonZero = true;
  }
});
assert(hasNonZero, 'At least one song diversityAdjustment is non-zero when randomSeed is provided with seeded mode');

// 11. breakdown presence options
const withBreakdown = calculateScores({ proposalType: 'single', group: 'all' }, [], [], { includeBreakdown: true });
const withoutBreakdown = calculateScores({ proposalType: 'single', group: 'all' }, [], [], { includeBreakdown: false });

assert(withBreakdown.length > 0 && withBreakdown[0].breakdown !== undefined, 'breakdown is included when includeBreakdown is true');
assert(withoutBreakdown.length > 0 && withoutBreakdown[0].breakdown === undefined, 'breakdown is omitted when includeBreakdown is false');

// 12. Fixture ID audits and dynamic counts validation
const fixtureIds = [
  'joy-concept', 'joy-fragile', 'joy-lion', 'joy-sweet16', 'joy-cinderella',
  'joy-gym-disco', 'joy-rebel', 'joy-nevergiveup', 'joy-peach', 'joy-dream',
  'me-mahoroba-asterisk', 'me-chocolate-melancholy', 'me-hanakami-short', 'me-peonies', 'me-kimi-wa-kono-natsu-koi-wo-suru'
];

// Validate fixture IDs against registry, catalog and migrations
fixtureIds.forEach(fid => {
  const song = songs.find(s => s.id === fid);
  assert(song !== undefined, `fixture ID "${fid}" exists in catalog`);
  if (song) {
    assert(typeof song.title === 'string' && song.title.length > 0, `fixture ID "${fid}" has valid title: "${song.title}"`);
  }

  // Registry validation
  const inRegistry = songIdRegistry.some(r => r.id === fid);
  assert(inRegistry, `fixture ID "${fid}" exists in song-id-registry.json`);

  // Migration source check
  const isMigrationSource = songIdMigrations[fid] !== undefined;
  assert(!isMigrationSource, `fixture ID "${fid}" is not a migration source`);
});

// Duplicates check
const uniqueFixtureIds = new Set(fixtureIds);
assert(uniqueFixtureIds.size === fixtureIds.length, 'fixture ID list has no duplicate IDs');

// Check no old/generic ID formatting
fixtureIds.forEach(fid => {
  assert(!fid.includes('song-'), `fixture ID "${fid}" is stable (no old song- prefix)`);
});

// Dynamic song completion counts checks
const songTracks = songs.filter(s => s.recordType === 'song');
const completeSongs = songTracks.filter(hasValidRecommendationMetadata);
const incompleteSongs = songTracks.filter(s => !hasValidRecommendationMetadata(s));

// Dynamic sum match
assert(
  completeSongs.length + incompleteSongs.length === songTracks.length,
  'sum of complete and incomplete song counts matches total catalog song count'
);

// Dynamic intersection/duplicate ID check
const completeIds = new Set(completeSongs.map(s => s.id));
let hasIntersection = false;
for (const song of incompleteSongs) {
  if (completeIds.has(song.id)) {
    hasIntersection = true;
  }
}
assert(!hasIntersection, 'complete and incomplete song ID sets have no intersection');

// Dynamic incomplete songs field validation: must have at least one missing field
let allIncompleteHaveMissing = true;
incompleteSongs.forEach(s => {
  const missing = getMissingRecommendationMetadata(s);
  const totalMissing =
    missing.missingScores.length +
    missing.missingTags.length +
    missing.missingRecommendation.length +
    missing.missingRecommendationVariants.length +
    missing.missingAnalysisBasis.length;
  if (totalMissing === 0) {
    allIncompleteHaveMissing = false;
  }
});
assert(allIncompleteHaveMissing, 'all incomplete songs have at least one missing metadata field');

// Dynamic complete songs field validation: must have no missing fields
let allCompleteHaveNoMissing = true;
completeSongs.forEach(s => {
  const missing = getMissingRecommendationMetadata(s);
  const totalMissing =
    missing.missingScores.length +
    missing.missingTags.length +
    missing.missingRecommendation.length +
    missing.missingRecommendationVariants.length +
    missing.missingAnalysisBasis.length;
  if (totalMissing > 0) {
    allCompleteHaveNoMissing = false;
  }
});
assert(allCompleteHaveNoMissing, 'all complete songs have no missing metadata fields');

// Incomplete list ID duplicates check
const incompleteIds = incompleteSongs.map(s => s.id);
const uniqueIncompleteIds = new Set(incompleteIds);
assert(uniqueIncompleteIds.size === incompleteIds.length, 'incomplete song IDs list contains no duplicate IDs');

if (testFailed) {
  console.error('❌ Recommendation engine rule tests failed!');
  process.exit(1);
} else {
  console.log('🎉 All recommendation engine rule tests passed successfully!');
  process.exit(0);
}
