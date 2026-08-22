import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim();

    if (!q || q.length < 2) {
      return NextResponse.json({ products: [], categories: [] });
    }

    const products = await db.product.findMany({
      where: {
        isActive: true,
        OR: [
          { titleUz: { contains: q, mode: 'insensitive' } },
          { titleRu: { contains: q, mode: 'insensitive' } },
          { descriptionUz: { contains: q, mode: 'insensitive' } },
          { descriptionRu: { contains: q, mode: 'insensitive' } },
          { brand: { name: { contains: q, mode: 'insensitive' } } },
          { collection: { name: { contains: q, mode: 'insensitive' } } },
          {
            variants: {
              some: {
                OR: [
                  { sku: { contains: q, mode: 'insensitive' } },
                  { nameUz: { contains: q, mode: 'insensitive' } },
                  { nameRu: { contains: q, mode: 'insensitive' } },
                  { colorNameUz: { contains: q, mode: 'insensitive' } },
                  { colorNameRu: { contains: q, mode: 'insensitive' } },
                ],
              },
            },
          },
        ],
      },
      include: {
        category: true,
        collection: true,
        variants: {
          include: {
            price: true,
            inventory: true,
            images: true,
          },
        },
        images: true,
      },
      take: 8,
    });

    const categories = await db.category.findMany({
      where: {
        isActive: true,
        OR: [
          { nameUz: { contains: q, mode: 'insensitive' } },
          { nameRu: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 4,
    });

    return NextResponse.json({ products, categories });
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to perform search' } }, { status: 500 });
  }
}
