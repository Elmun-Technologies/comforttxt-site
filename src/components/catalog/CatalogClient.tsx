'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryFilterSidebar } from '@/components/catalog/CategoryFilterSidebar';
import { SlidersHorizontal, PackageX } from 'lucide-react';

interface CatalogClientProps {
  locale: string;
  searchParams: Record<string, string | undefined>;
  initialProducts?: any[];
  categories?: any[];
}

export function CatalogClient({ locale, searchParams, initialProducts = [], categories = [] }: CatalogClientProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const selectedCategory = searchParams.category || '';
  const selectedSub = searchParams.sub || '';
  const selectedSort = searchParams.sort || 'newest';
  const minPrice = searchParams.minPrice || '';
  const maxPrice = searchParams.maxPrice || '';
  const inStock = searchParams.inStock === 'true';
  const searchQuery = searchParams.search || '';

  // Dynamic category filters
  const selectedTexture = searchParams.texture || '';
  const selectedFoamType = searchParams.foam_type || '';
  const selectedPowerType = searchParams.power_type || '';

  let products = [...initialProducts];

  if (selectedCategory) {
    products = products.filter((p) => p.categorySlug === selectedCategory);
  }

  if (selectedSub) {
    products = products.filter((p) =>
      p.specs.some((s: any) =>
        s.specValueUz.toLowerCase().includes(selectedSub.toLowerCase()) ||
        s.specValueRu.toLowerCase().includes(selectedSub.toLowerCase())
      )
    );
  }

  if (selectedTexture) {
    products = products.filter((p) =>
      p.specs.some((s: any) => s.specKey === 'texture' && s.specValueUz.toLowerCase().includes(selectedTexture.toLowerCase()))
    );
  }

  if (selectedFoamType) {
    products = products.filter((p) =>
      p.specs.some((s: any) => s.specKey === 'foam_type' && s.specValueUz.includes(selectedFoamType))
    );
  }

  if (selectedPowerType) {
    products = products.filter((p) =>
      p.specs.some((s: any) => s.specKey === 'power_type' && s.specValueUz.toLowerCase().includes(selectedPowerType.toLowerCase()))
    );
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    products = products.filter((p) =>
      (locale === 'ru' ? p.titleRu : p.titleUz).toLowerCase().includes(q) ||
      p.variants.some((v: any) => v.sku.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    const minP = parseFloat(minPrice);
    products = products.filter((p) => p.variants.some((v: any) => v.price >= minP));
  }

  if (maxPrice) {
    const maxP = parseFloat(maxPrice);
    products = products.filter((p) => p.variants.some((v: any) => v.price <= maxP));
  }

  if (inStock) {
    products = products.filter((p) => p.variants.some((v: any) => v.stock > 0));
  }

  if (selectedSort === 'price_asc') {
    products.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
  } else if (selectedSort === 'price_desc') {
    products.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
  }

  return (
    <>
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-heading tracking-tight">
          {locale === 'ru' ? 'Каталог Материалов' : 'Mahsulotlar Katalogi'}
        </h1>
        <p className="text-xs text-muted font-medium">
          {locale === 'ru'
            ? `Найдено ${products.length} позиций`
            : `${products.length} ta mahsulot topildi`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="hidden lg:block lg:col-span-1">
          <CategoryFilterSidebar locale={locale} categories={categories} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-surface p-3.5 rounded-2xl border border-border flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted">
                {locale === 'ru' ? 'Результатов:' : 'Natijalar:'}
              </span>
              <span className="bg-accent-light text-accent text-xs font-black px-2.5 py-0.5 rounded-full">
                {products.length}
              </span>
            </div>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 bg-secondary hover:bg-border text-heading px-3.5 py-2 rounded-xl text-xs font-bold transition"
            >
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span>{locale === 'ru' ? 'Фильтры' : 'Filterlar'}</span>
            </button>
          </div>

          {products.length === 0 ? (
            <div className="bg-surface rounded-2xl p-12 text-center border border-border shadow-xs my-8 space-y-4">
              <PackageX className="w-16 h-16 text-muted mx-auto stroke-1" />
              <h3 className="text-lg font-bold text-heading">
                {locale === 'ru' ? 'Товары не найдены' : 'Mahsulotlar topilmadi'}
              </h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                {locale === 'ru'
                  ? 'Попробуйте изменить параметры поиска или сбросить фильтры.'
                  : 'Qidiruv parametrlarini o\'zgartirishni yoki filterlarni tozalashni topshiramiz.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CategoryFilterSidebar
        locale={locale}
        categories={categories}
        isMobile
        isOpenMobile={mobileFilterOpen}
        onCloseMobile={() => setMobileFilterOpen(false)}
      />
    </>
  );
}
