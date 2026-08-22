import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CatalogClient } from '@/components/catalog/CatalogClient';
import { storefrontService } from '@/services/storefront';

interface CatalogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string;
    collection?: string;
    sub?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    search?: string;
    texture?: string;
    foam_type?: string;
    power_type?: string;
  }>;
}

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  const categories = await storefrontService.getCategories(locale);
  const products = await storefrontService.getProducts(
    {
      categorySlug: resolvedSearchParams.category,
      collectionSlug: resolvedSearchParams.collection,
      subCategorySlug: resolvedSearchParams.sub,
      search: resolvedSearchParams.search,
      minPrice: resolvedSearchParams.minPrice ? parseFloat(resolvedSearchParams.minPrice) : undefined,
      maxPrice: resolvedSearchParams.maxPrice ? parseFloat(resolvedSearchParams.maxPrice) : undefined,
      stockOnly: resolvedSearchParams.inStock === 'true',
      texture: resolvedSearchParams.texture,
      foamType: resolvedSearchParams.foam_type,
      powerType: resolvedSearchParams.power_type,
      sort: resolvedSearchParams.sort as any,
    },
    locale
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <CatalogClient
          locale={locale}
          searchParams={resolvedSearchParams}
          initialProducts={products}
          categories={categories}
        />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
