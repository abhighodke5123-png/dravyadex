import { NextRequest, NextResponse } from 'next/server';
import { searchAndFilterDravyas, getDynamicFilterOptions } from '@/lib/database/repository';
import { FilterState } from '@/types/dravya';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '24', 10);
    const sortBy = (searchParams.get('sortBy') || 'relevance') as FilterState['sortBy'];

    const rasa = searchParams.getAll('rasa') as any[];
    const guna = searchParams.getAll('guna') as any[];
    const virya = searchParams.getAll('virya') as any[];
    const vipaka = searchParams.getAll('vipaka') as any[];
    const dosha = searchParams.getAll('dosha');
    const parts = searchParams.getAll('parts');
    const family = searchParams.getAll('family');
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const hasResearch = searchParams.get('hasResearch') === 'true';
    const hasCompounds = searchParams.get('hasCompounds') === 'true';

    const filters: Partial<FilterState> = {
      query,
      rasa,
      guna,
      virya,
      vipaka,
      dosha,
      parts,
      family,
      verifiedOnly,
      hasResearch,
      hasCompounds,
      sortBy,
    };

    const results = searchAndFilterDravyas(filters, page, limit);
    const filterOptions = getDynamicFilterOptions();

    return NextResponse.json({
      success: true,
      data: results.items,
      pagination: {
        total: results.total,
        page: results.page,
        totalPages: results.totalPages,
        limit: results.limit,
      },
      availableFilters: filterOptions,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch dravyas' },
      { status: 500 }
    );
  }
}
