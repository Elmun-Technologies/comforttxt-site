import { NextRequest, NextResponse } from 'next/server';
import { storefrontService } from '@/services/storefront';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim() || '';
    const locale = searchParams.get('locale') || 'uz';

    if (!q || q.length < 2) {
      return NextResponse.json({
        products: [],
        categories: [],
        collections: [],
        suggestions: [],
        totalMatches: 0,
      });
    }

    const searchResult = await storefrontService.searchProducts(q, locale);

    return NextResponse.json({
      products: searchResult.products,
      categories: searchResult.categories,
      collections: searchResult.collections,
      suggestions: (searchResult as any).suggestions || [],
      totalMatches: searchResult.totalMatches,
    });
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to perform search' } },
      { status: 500 }
    );
  }
}
