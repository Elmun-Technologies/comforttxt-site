import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FavoritesClient } from '@/components/favorites/FavoritesClient';
import { db } from '@/lib/db';

interface FavoritesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { locale } = await params;

  const dbProducts = await db.product.findMany({
    where: { isActive: true },
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
      categorySlug: p.category?.slug,
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
        minQtyStep: Number(v.quantityStep || (p.unitType === 'METER' ? 0.5 : 1)),
        images: v.images.length > 0 ? v.images.map((img) => img.url) : [image],
      })),
    };
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <FavoritesClient allProducts={formattedProducts as any} locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
