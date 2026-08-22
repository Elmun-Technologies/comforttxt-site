import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryClient } from '@/components/catalog/CategoryClient';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, category } = await params;
  const resolvedSearchParams = await searchParams;

  const dbCategories = await db.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }
    }
  });

  const dbProducts = await db.product.findMany({
    where: {
      isActive: true,
      category: { slug: category },
    },
    include: {
      category: true,
      specifications: { include: { definition: true } },
      variants: {
        where: { isActive: true },
        include: { price: true, inventory: true, images: true },
      },
      images: true,
    },
  });

  const formattedProducts = dbProducts.map((p) => {
    const mainVar = p.variants[0];
    const image = mainVar?.images[0]?.url || p.images[0]?.url || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop';

    return {
      id: p.id,
      titleUz: p.titleUz,
      titleRu: p.titleRu,
      slug: p.slug,
      descriptionUz: p.descriptionUz,
      descriptionRu: p.descriptionRu,
      categorySlug: p.category.slug,
      unitType: p.unitType.toLowerCase(),
      isFeatured: p.isFeatured,
      isBestSeller: p.isPopular,
      specs: p.specifications.map((s) => ({
        specKey: s.definition.key,
        specValueUz: s.value,
        specValueRu: s.value,
      })),
      variants: p.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        nameUz: v.nameUz || p.titleUz,
        nameRu: v.nameRu || p.titleRu,
        colorHex: v.colorHex || '#000000',
        colorName: locale === 'ru' ? (v.colorNameRu || 'Цвет') : (v.colorNameUz || 'Rang'),
        price: v.price?.retailPrice || 0,
        wholesalePrice: v.price?.wholesalePrice || v.price?.retailPrice || 0,
        stock: Number(v.inventory?.onHand || 0),
        images: v.images.length > 0 ? v.images.map((img) => img.url) : [image],
      })),
    };
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <CategoryClient
          locale={locale}
          category={category}
          searchParams={resolvedSearchParams}
          initialProducts={formattedProducts as any}
          categories={dbCategories as any}
        />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
