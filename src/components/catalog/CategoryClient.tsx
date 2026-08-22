'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryFilterSidebar } from '@/components/catalog/CategoryFilterSidebar';
import { SlidersHorizontal, PackageX, X, RotateCcw } from 'lucide-react';

interface CategoryClientProps {
  locale: string;
  category: string;
  categoryName?: string;
  searchParams: Record<string, string | undefined>;
  initialProducts?: any[];
  categories?: any[];
}

export function CategoryClient({
  locale,
  category,
  categoryName,
  searchParams,
  initialProducts = [],
  categories = [],
}: CategoryClientProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const selectedSub = searchParams.sub || '';
  const selectedSort = searchParams.sort || 'newest';
  const minPrice = searchParams.minPrice || '';
  const maxPrice = searchParams.maxPrice || '';
  const inStock = searchParams.inStock === 'true';
  const searchQuery = searchParams.search || '';

  let products = [...initialProducts];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    products = products.filter((p) =>
      (locale === 'ru' ? p.titleRu : p.titleUz).toLowerCase().includes(q) ||
      p.variants.some((v: any) => v.sku.toLowerCase().includes(q))
    );
  }

  if (selectedSub) {
    products = products.filter((p) =>
      (p.specs || []).some((s: any) =>
        (s.valueUz || s.specValueUz || '').toLowerCase().includes(selectedSub.toLowerCase()) ||
        (s.valueRu || s.specValueRu || '').toLowerCase().includes(selectedSub.toLowerCase())
      )
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
    products = products.filter((p) => p.variants.some((v: any) => (v.stockStatus === 'IN_STOCK' || (typeof v.stock === 'number' && v.stock > 0))));
  }

  if (selectedSort === 'price_asc') {
    products.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
  } else if (selectedSort === 'price_desc') {
    products.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
  }

  interface Chip {
    key: string;
    label: string;
  }
  const chips: Chip[] = [];
  if (searchQuery) chips.push({ key: 'search', label: `"${searchQuery}"` });
  if (selectedSub) chips.push({ key: 'sub', label: selectedSub.replace(/-/g, ' ') });
  if (minPrice || maxPrice) chips.push({ key: 'price', label: `${minPrice || '0'} – ${maxPrice || '∞'}` });
  if (inStock) chips.push({ key: 'inStock', label: locale === 'ru' ? 'В наличии' : 'Omborda bor' });
  if (selectedSort !== 'newest') chips.push({ key: 'sort', label: locale === 'ru' ? 'Сортировка' : 'Saralash' });

  const removeChip = (key: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    const qs = params.toString();
    window.location.href = `/${locale}/catalog/${category}${qs ? `?${qs}` : ''}`;
  };

  const clearAll = () => {
    window.location.href = `/${locale}/catalog/${category}`;
  };

  return (
    <>
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-heading tracking-tight capitalize">
          {categoryName || category.replace(/-/g, ' ')}
        </h1>
        <p className="text-xs text-muted font-medium">
          {locale === 'ru'
            ? `Найдено ${products.length} позиций`
            : `${products.length} ta mahsulot topildi`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="hidden lg:block lg:col-span-1">
          <CategoryFilterSidebar categorySlug={category} locale={locale} categories={categories} />
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

          {/* Active filter chips */}
          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => removeChip(chip.key)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-accent-light text-accent border border-accent/30 rounded-lg text-[11px] font-bold hover:bg-accent hover:text-surface transition"
                >
                  {chip.label}
                  <X className="w-3 h-3" />
                </button>
              ))}
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold text-muted hover:text-accent transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{locale === 'ru' ? 'Сбросить всё' : 'Barchasini tozalash'}</span>
              </button>
            </div>
          )}

          {products.length === 0 ? (
            <div className="bg-surface rounded-2xl p-12 text-center border border-border shadow-xs my-8 space-y-4">
              <PackageX className="w-16 h-16 text-muted mx-auto stroke-1" />
              <h3 className="text-lg font-bold text-heading">
                {locale === 'ru' ? 'Товары не найдены' : 'Mahsulotlar topilmadi'}
              </h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                {locale === 'ru'
                  ? 'Измените параметры поиска или сбросьте фильтры.'
                  : 'Qidiruv parametrlarini o‘zgartiring yoki filterlarni tozalang.'}
              </p>
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{locale === 'ru' ? 'Сбросить фильтры' : 'Filterlarni tozalash'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CategoryFilterSidebar
        categorySlug={category}
        locale={locale}
        categories={categories}
        isMobile
        isOpenMobile={mobileFilterOpen}
        onCloseMobile={() => setMobileFilterOpen(false)}
      />
    </>
  );
}
