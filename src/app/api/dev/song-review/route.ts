import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { songs } from '../../../../data/songs';

const reviewFilePath = path.join(process.cwd(), 'src/data/reviews/song-review-status.json');

// Ensure directory exists
function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not Found', { status: 404 });
  }

  try {
    if (!fs.existsSync(reviewFilePath)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(reviewFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Failed to read review status:', error);
    return NextResponse.json({ error: 'Failed to read review status' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not Found', { status: 404 });
  }

  try {
    const body = await request.json();
    const { songId, group, checks, reviewerNote } = body;

    if (!songId || !group || !checks) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Verify if songId exists in current song list
    const matchedSong = songs.find(s => s.id === songId);
    if (!matchedSong) {
      return NextResponse.json({ error: `Invalid song ID: ${songId}` }, { status: 400 });
    }

    // 2. Validate all 7 checklist keys exist and are boolean
    const checklistKeys = [
      'impressionIsAccurate',
      'tagsAreAccurate',
      'seasonHasEvidence',
      'recommendationFits',
      'noOverstatement',
      'copyIsDistinct',
      'rankingFeelsNatural'
    ];

    for (const key of checklistKeys) {
      if (typeof checks[key] !== 'boolean') {
        return NextResponse.json({ error: `Field '${key}' must be a boolean value` }, { status: 400 });
      }
    }

    const reviewed = checklistKeys.every(k => checks[k] === true);

    ensureDirectoryExistence(reviewFilePath);

    let reviews = [];
    if (fs.existsSync(reviewFilePath)) {
      const fileData = fs.readFileSync(reviewFilePath, 'utf8');
      try {
        reviews = JSON.parse(fileData);
      } catch (e) {
        reviews = [];
      }
    }

    const existingIdx = reviews.findIndex((r: any) => r.songId === songId);
    const newStatus = {
      songId,
      group,
      checks,
      reviewed,
      reviewedAt: reviewed ? new Date().toISOString() : undefined, // reviewedAt is always ISO String
      reviewerNote: reviewerNote || ''
    };

    if (existingIdx !== -1) {
      reviews[existingIdx] = newStatus;
    } else {
      reviews.push(newStatus);
    }

    // 3. Secure atomic write: write to temp first, then rename
    const tempPath = reviewFilePath + '.tmp';
    fs.writeFileSync(tempPath, JSON.stringify(reviews, null, 2), 'utf8');
    fs.renameSync(tempPath, reviewFilePath);

    return NextResponse.json({ success: true, status: newStatus });
  } catch (error) {
    console.error('Failed to write review status:', error);
    return NextResponse.json({ error: 'Failed to write review status' }, { status: 500 });
  }
}
