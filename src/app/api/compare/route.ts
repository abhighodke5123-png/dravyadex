import { NextRequest, NextResponse } from 'next/server';
import { getCompareDravyas } from '@/lib/database/repository';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slugs = searchParams.getAll('slug');

    if (!slugs || slugs.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No slugs provided for comparison' },
        { status: 400 }
      );
    }

    const items = getCompareDravyas(slugs.slice(0, 3));

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error executing comparison' },
      { status: 500 }
    );
  }
}
