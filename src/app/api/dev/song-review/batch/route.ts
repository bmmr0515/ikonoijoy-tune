import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return Response.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const batch = searchParams.get('batch') || '01';
    
    // Validate batch format
    if (!/^\d{2}$/.test(batch)) {
      return NextResponse.json({ error: 'Invalid batch format' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), `reports/review-batch-${batch}.json`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Batch file not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    console.error('Failed to read review batch:', error);
    return NextResponse.json({ error: 'Failed to read review batch' }, { status: 500 });
  }
}
