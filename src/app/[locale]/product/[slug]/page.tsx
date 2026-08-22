import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailClient } from '@/components/pdp/ProductDetailClient';
import { ProductCard } from '@/components/product/ProductCard';

interface PDPProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProductDetailPage({ params }: PDPProps) {
  const { locale, slug } = await params;

  const dbProduct = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      brand: true,
      collection: true,
      specifications: {
        include: { definition: true },
      },
      variants: {
        where: { isActive: true },
        include: { price: true, inventory: true, images: true },
      },
      images: true,
    },
  });

  if (!dbProduct || !dbProduct.isActive) {
    notFound();
  }

  // Format to Product model expected by PDP UI
  const mainVar = dbProduct.variants[0];
  const mainImage = mainVar?.images[0]?.url || dbProduct.images[0]?.url || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop';

  const specsMap: Record<string, string> = {};
  dbProduct.specifications.forEach((s) => {
    specsMap[s.definition.key] = s.value;
  });

  const formattedProduct = {
    id: dbProduct.id,
    titleUz: dbProduct.titleUz,
    titleRu: dbProduct.titleRu,
    slug: dbProduct.slug,
    descriptionUz: dbProduct.descriptionUz,
    descriptionRu: dbProduct.descriptionRu,
    categorySlug: dbProduct.category.slug,
    collectionSlug: dbProduct.collection?.slug,
    unitType: dbProduct.unitType.toLowerCase(),
    isFeatured: dbProduct.isFeatured,
    isBestSeller: dbProduct.isPopular,
    specs: specsMap,
    variants: dbProduct.variants.map((v) => ({
      id: v.id,
      sku: v.sku,
      nameUz: v.nameUz || dbProduct.titleUz,
      nameRu: v.nameRu || dbProduct.titleRu,
      colorHex: v.colorHex || '#000000',
      colorName: locale === 'ru' ? (v.colorNameRu || 'Цвет') : (v.colorNameUz || 'Rang'),
      price: v.price?.retailPrice || 0,
      wholesalePrice: v.price?.wholesalePrice || v.price?.retailPrice || 0,
      stock: Number(v.inventory?.onHand || 0),
      minQtyStep: Number(v.quantityStep || (dbProduct.unitType === 'METER' ? 0.5 : 1)),
      images: v.images.length > 0 ? v.images.map((img) => img.url) : [mainImage],
    })),
  };

  const relatedDbProducts = await db.product.findMany({
    where: {
      categoryId: dbProduct.categoryId,
      id: { not: dbProduct.id },
      isActive: true,
    },
    include: {
      category: true,
      variants: {
        where: { isActive: true },
        include: { price: true, inventory: true, images: true },
      },
      images: true,
    },
    take: 4,
  });

  const formattedRelated = relatedDbProducts.map((p) => {
    const v0 = p.variants[0];
    const img0 = v0?.images[0]?.url || p.images[0]?.url || mainImage;
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
        images: v.images.length > 0 ? v.images.map((img) => img.url) : [img0],
      })),
    };
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full space-y-12">
        <ProductDetailClient product={formattedProduct as any} locale={locale} />

        {formattedRelated.length > 0 && (
          <div className="border-t border-border pt-12 space-y-6">
            <h2 className="text-2xl font-black text-heading tracking-tight">
              {locale === 'ru' ? 'Похожие Товары' : 'O\'xshash Mahsulotlar'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {formattedRelated.map((rp) => (
                <ProductCard key={rp.id} product={rp as any} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer locale={locale} />
    </div>
  );
}
