export interface NonSongContent {
  id: string;
  title: string;
  group: string;
  contentType: "music_video" | "making_video" | "event_video" | "variety_video" | "live_video" | "documentary_video" | "other_video";
  originalSourceFile: string;
  relatedSongId: string | null;
  enabledForRecommendation: false;
  rawSongData: any;
}

export const nonSongContents: NonSongContent[] = [
  {
    "id": "joy-denwabango-oshiete-mv",
    "title": "電話番号教えて！Music Video",
    "group": "nearly-equal-joy",
    "contentType": "music_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": "joy-denwabango-oshiete",
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-denwabango-oshiete-mv",
      "title": "電話番号教えて！Music Video",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "電話番号教えて！[CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/44/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "電話番号教えて！[CD+DVD/Type A]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/44/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/44/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "music_video",
      "relatedSongId": "joy-denwabango-oshiete"
    }
  },
  {
    "id": "joy-denwabango-oshiete-making",
    "title": "電話番号教えて！メイキング映像",
    "group": "nearly-equal-joy",
    "contentType": "making_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": "joy-denwabango-oshiete",
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-denwabango-oshiete-making",
      "title": "電話番号教えて！メイキング映像",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "電話番号教えて！[CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/44/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "電話番号教えて！[CD+DVD/Type A]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/44/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/44/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "making_video",
      "relatedSongId": "joy-denwabango-oshiete"
    }
  },
  {
    "id": "joy-enjoybu-yokohama-2",
    "title": "ニアジョイ エンジョイ部 横浜★運試しツアー 後編",
    "group": "nearly-equal-joy",
    "contentType": "variety_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-enjoybu-yokohama-2",
      "title": "ニアジョイ エンジョイ部 横浜★運試しツアー 後編",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "電話番号教えて！[CD+DVD/Type C]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/46/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "電話番号教えて！[CD+DVD/Type C]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/46/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/46/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "variety_video"
    }
  },
  {
    "id": "joy-enjoybu-yokohama-1",
    "title": "ニアジョイ エンジョイ部 横浜★運試しツアー 前編",
    "group": "nearly-equal-joy",
    "contentType": "variety_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-enjoybu-yokohama-1",
      "title": "ニアジョイ エンジョイ部 横浜★運試しツアー 前編",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "電話番号教えて！[CD+DVD/Type B]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/45/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "電話番号教えて！[CD+DVD/Type B]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/45/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/45/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "variety_video"
    }
  },
  {
    "id": "joy-2024",
    "title": "イコノイジョイ大感謝祭2024 「ニアジョイ球技大会",
    "group": "nearly-equal-joy",
    "contentType": "event_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-2024",
      "title": "イコノイジョイ大感謝祭2024 「ニアジョイ球技大会",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "ブルーハワイレモン[CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/34/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "ブルーハワイレモン[CD+DVD/Type A]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/34/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/34/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "recordType": "variety_video",
      "quarantineReason": "non-song-video-content"
    }
  },
  {
    "id": "joy-enjoybu-osaka-1",
    "title": "ニアジョイ エンジョイ部〜大阪おもろいやんツアー",
    "group": "nearly-equal-joy",
    "contentType": "variety_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-enjoybu-osaka-1",
      "title": "ニアジョイ エンジョイ部〜大阪おもろいやんツアー",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "ブルーハワイレモン[CD+DVD/Type C]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/36/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "ブルーハワイレモン[CD+DVD/Type C]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/36/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/36/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "variety_video"
    }
  },
  {
    "id": "joy-enjoybu-osaka-2",
    "title": "ニアジョイ エンジョイ部〜大阪なんでやねんツアー",
    "group": "nearly-equal-joy",
    "contentType": "variety_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-enjoybu-osaka-2",
      "title": "ニアジョイ エンジョイ部〜大阪なんでやねんツアー",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "ブルーハワイレモン[CD+DVD/Type B]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/35/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "ブルーハワイレモン[CD+DVD/Type B]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/35/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/35/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "variety_video"
    }
  },
  {
    "id": "joy-enjoybu-lying-cat",
    "title": "ニアジョイ エンジョイ部 ～噓つきネコは誰だ？",
    "group": "nearly-equal-joy",
    "contentType": "variety_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-enjoybu-lying-cat",
      "title": "ニアジョイ エンジョイ部 ～噓つきネコは誰だ？",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "初恋シンデレラ[CD+DVD/Type C]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/29/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "初恋シンデレラ[CD+DVD/Type C]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/29/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/29/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "variety_video"
    }
  },
  {
    "id": "joy-cinderella-mv",
    "title": "初恋シンデレラ Music Video",
    "group": "nearly-equal-joy",
    "contentType": "music_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": "joy-cinderella",
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-cinderella-mv",
      "title": "初恋シンデレラ Music Video",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "初恋シンデレラ[CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/27/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "初恋シンデレラ[CD+DVD/Type A]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/27/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/27/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "music_video",
      "relatedSongId": "joy-cinderella"
    }
  },
  {
    "id": "joy-cinderella-making",
    "title": "初恋シンデレラ メイキング映像",
    "group": "nearly-equal-joy",
    "contentType": "making_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": "joy-cinderella",
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-cinderella-making",
      "title": "初恋シンデレラ メイキング映像",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "初恋シンデレラ[CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/27/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "初恋シンデレラ[CD+DVD/Type A]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/27/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/27/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "making_video",
      "relatedSongId": "joy-cinderella"
    }
  },
  {
    "id": "joy-joy1sttourabsolute-zepphanedatokyo",
    "title": "≒JOY 1st Tour「Absolute」＠Zepp Haneda (TOKYO)",
    "group": "nearly-equal-joy",
    "contentType": "live_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-joy1sttourabsolute-zepphanedatokyo",
      "title": "≒JOY 1st Tour「Absolute」＠Zepp Haneda (TOKYO)",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "体育館ディスコ [CD +BD/Type D]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/22/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "体育館ディスコ [CD +BD/Type D]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/22/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/22/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "recordType": "live_video",
      "quarantineReason": "non-song-video-content"
    }
  },
  {
    "id": "joy-enjoybu-lying-monkey",
    "title": "ニアジョイ エンジョイ部 ～噓つきサルは誰だ？",
    "group": "nearly-equal-joy",
    "contentType": "variety_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-enjoybu-lying-monkey",
      "title": "ニアジョイ エンジョイ部 ～噓つきサルは誰だ？",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "初恋シンデレラ[CD+DVD/Type B]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/28/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "初恋シンデレラ[CD+DVD/Type B]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/28/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/28/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "variety_video"
    }
  },
  {
    "id": "joy-kagaikatsudo-akadake",
    "title": "ニアジョイ課外活動 〜赤岳登山編〜",
    "group": "nearly-equal-joy",
    "contentType": "variety_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-kagaikatsudo-akadake",
      "title": "ニアジョイ課外活動 〜赤岳登山編〜",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "きっと、絶対、絶対 [CD+DVD/Type B]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/14/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "きっと、絶対、絶対 [CD+DVD/Type B]",
          "releaseType": "mini-album",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/14/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/14/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "variety_video"
    }
  },
  {
    "id": "joy-gym-disco-mv",
    "title": "体育館ディスコMusic Video",
    "group": "nearly-equal-joy",
    "contentType": "music_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": "joy-gym-disco",
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-gym-disco-mv",
      "title": "体育館ディスコMusic Video",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "体育館ディスコ [CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/19/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "体育館ディスコ [CD+DVD/Type A]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/19/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/19/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "music_video",
      "relatedSongId": "joy-gym-disco"
    }
  },
  {
    "id": "joy-gym-disco-making",
    "title": "体育館ディスコメイキング映像",
    "group": "nearly-equal-joy",
    "contentType": "making_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": "joy-gym-disco",
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-gym-disco-making",
      "title": "体育館ディスコメイキング映像",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "体育館ディスコ [CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/19/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "体育館ディスコ [CD+DVD/Type A]",
          "releaseType": "single",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/19/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/19/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "making_video",
      "relatedSongId": "joy-gym-disco"
    }
  },
  {
    "id": "joy-kitto-aoi-mv",
    "title": "きっと、青い Music Video",
    "group": "nearly-equal-joy",
    "contentType": "music_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": null,
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-kitto-aoi-mv",
      "title": "きっと、青い Music Video",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "きっと、絶対、絶対 [CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/13/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "きっと、絶対、絶対 [CD+DVD/Type A]",
          "releaseType": "mini-album",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/13/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/13/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "music_video",
      "relatedSongId": "joy-kitto-aoi"
    }
  },
  {
    "id": "joy-rebel-mv",
    "title": "無謀人 Music Video",
    "group": "nearly-equal-joy",
    "contentType": "music_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": "joy-rebel",
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-rebel-mv",
      "title": "無謀人 Music Video",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "きっと、絶対、絶対 [CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/13/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "きっと、絶対、絶対 [CD+DVD/Type A]",
          "releaseType": "mini-album",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/13/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/13/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "music_video",
      "relatedSongId": "joy-rebel"
    }
  },
  {
    "id": "joy-rebel-making",
    "title": "無謀人 メイキング映像",
    "group": "nearly-equal-joy",
    "contentType": "making_video",
    "originalSourceFile": "src/data/songs/nearly-equal-joy.ts",
    "relatedSongId": "joy-rebel",
    "enabledForRecommendation": false,
    "rawSongData": {
      "id": "joy-rebel-making",
      "title": "無謀人 メイキング映像",
      "group": "nearly-equal-joy",
      "category": "unknown",
      "factualData": {
        "releaseTitle": "きっと、絶対、絶対 [CD+DVD/Type A]",
        "verificationStatus": "needs-review",
        "verifiedSources": [
          {
            "field": "title",
            "url": "https://nearly-equal-joy.jp/discography/detail/13/",
            "note": "Official Discography Page"
          }
        ]
      },
      "scores": {
        "energy": 3,
        "brightness": 3,
        "sadness": 3,
        "cuteness": 3,
        "power": 3,
        "calmness": 3,
        "romance": 3,
        "liveHype": 3
      },
      "tags": {
        "moods": [],
        "situations": [],
        "weather": [],
        "timeOfDay": [],
        "seasons": [],
        "themes": [],
        "tempos": [],
        "playlistRoles": []
      },
      "recommendation": {
        "songImpression": "楽曲情報を確認中です",
        "recommendedFor": "楽曲情報を確認中です",
        "recommendedSituation": "楽曲情報を確認中です",
        "notRecommendedSituation": "楽曲情報を確認中です",
        "recommendationText": "楽曲情報を確認中です",
        "listeningSuggestion": "楽曲情報を確認中です"
      },
      "recommendationVariants": [],
      "enabled": false,
      "enabledForRecommendation": false,
      "needsReview": true,
      "releases": [
        {
          "title": "きっと、絶対、絶対 [CD+DVD/Type A]",
          "releaseType": "mini-album",
          "officialSourceUrl": "https://nearly-equal-joy.jp/discography/detail/13/"
        }
      ],
      "verification": {
        "titleVerified": true,
        "releaseVerified": true,
        "categoryVerified": false,
        "sourceContainsExactTitle": true,
        "verifiedSources": [
          "https://nearly-equal-joy.jp/discography/detail/13/"
        ],
        "checkedAt": "2026-07-01T08:40:14.700Z"
      },
      "quarantineReason": "video-only-content",
      "recordType": "making_video",
      "relatedSongId": "joy-rebel"
    }
  }
];
