import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryClient } from '@/components/catalog/CategoryClient';
import { storefrontService } from '@/services/storefront';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, category: categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const currentCategory = await storefrontService.getCategory(categorySlug, locale);
  if (!currentCategory) {
    notFound();
  }

  const allCategories = await storefrontService.getCategories(locale);
  const products = await storefrontService.getProducts(
    {
      categorySlug,
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
        <CategoryClient
          locale={locale}
          category={categorySlug}
          searchParams={resolvedSearchParams}
          initialProducts={products}
          categories={allCategories}
        />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
