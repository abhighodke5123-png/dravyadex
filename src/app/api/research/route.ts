import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getResearchPapers() {
  const possiblePaths = [
    path.join(process.cwd(), 'data', 'seed', 'research.json'),
    path.join(process.cwd(), 'dravyadex', 'data', 'seed', 'research.json'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    }
  }
  return [];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') || '').toLowerCase().trim();
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const papers = getResearchPapers();

    let filtered = papers;
    if (query) {
      filtered = papers.filter((p: any) => {
        const text = `${p.title || ''} ${p.journal || ''} ${(p.authors || []).join(' ')}`.toLowerCase();
        return text.includes(query);
      });
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      data: filtered.slice(0, limit),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching research citations' },
      { status: 500 }
    );
  }
}
