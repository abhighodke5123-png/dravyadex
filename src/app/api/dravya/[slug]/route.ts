import { NextRequest, NextResponse } from 'next/server';
import { getDravyaBySlug, getRelatedDravyas } from '@/lib/database/repository';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const dravya = getDravyaBySlug(slug);

    if (!dravya) {
      return NextResponse.json(
        { success: false, error: `Dravya not found for slug: ${slug}` },
        { status: 404 }
      );
    }

    const related = getRelatedDravyas(dravya, 4);

    return NextResponse.json({
      success: true,
      data: dravya,
      related,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching dravya' },
      { status: 500 }
    );
  }
}
