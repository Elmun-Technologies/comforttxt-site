'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryFilterSidebar } from '@/components/catalog/CategoryFilterSidebar';
import { SlidersHorizontal, PackageX, X, RotateCcw, LayoutGrid } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { EmptyState } from '@/components/ui/EmptyState';
import { scoreProduct } from '@/lib/search/searchEngine';

interface CatalogClientProps {
  locale: string;
  searchParams: Record<string, string | undefined>;
  initialProducts?: any[];
  categories?: any[];
}

export function CatalogClient({ locale, searchParams, initialProducts = [], categories = [] }: CatalogClientProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const router = useRouter();

  const selectedCategory = searchParams.category || '';
  const selectedCollection = searchParams.collection || '';
  const selectedSub = searchParams.sub || '';
  const selectedSort = searchParams.sort || 'newest';
  const minPrice = searchParams.minPrice || '';
  const maxPrice = searchParams.maxPrice || '';
  const inStock = searchParams.inStock === 'true';
  const searchQuery = searchParams.search || '';

  const selectedTexture = searchParams.texture || '';
  const selectedFoamType = searchParams.foam_type || '';
  const selectedPowerType = searchParams.power_type || '';

  // Re-filtering/sorting the whole catalog is pure overhead when only
  // unrelated state (e.g. the mobile filter drawer) changes, so this only
  // reruns when the inputs that actually affect the result set change.
  const products = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory) {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    if (selectedCollection) {
      result = result.filter((p) => p.collectionSlug === selectedCollection);
    }

    if (selectedSub) {
      result = result.filter((p) =>
        (p.specs || []).some((s: any) =>
          (s.valueUz || s.specValueUz || '').toLowerCase().includes(selectedSub.toLowerCase()) ||
          (s.valueRu || s.specValueRu || '').toLowerCase().includes(selectedSub.toLowerCase())
        )
      );
    }

    if (selectedTexture) {
      result = result.filter((p) =>
        (p.specs || []).some((s: any) => s.key === 'texture' && (s.valueUz || s.specValueUz || '').toLowerCase().includes(selectedTexture.toLowerCase()))
      );
    }

    if (selectedFoamType) {
      result = result.filter((p) =>
        (p.specs || []).some((s: any) => s.key === 'foam_type' && (s.valueUz || s.specValueUz || '').includes(selectedFoamType))
      );
    }

    if (selectedPowerType) {
      result = result.filter((p) =>
        (p.specs || []).some((s: any) => s.key === 'power_type' && (s.valueUz || s.specValueUz || '').toLowerCase().includes(selectedPowerType.toLowerCase()))
      );
    }

    if (searchQuery) {
      const scoredList: { product: any; score: number }[] = [];
      for (const prod of result) {
        const scored = scoreProduct(prod, searchQuery, locale);
        if (scored && scored.score > 0) {
          scoredList.push({ product: prod, score: scored.score });
        }
      }
      if (selectedSort === 'newest') {
        scoredList.sort((a, b) => b.score - a.score);
      }
      result = scoredList.map((s) => s.product);
    }

    if (minPrice) {
      const minP = parseFloat(minPrice);
      result = result.filter((p) => p.variants.some((v: any) => v.price >= minP));
    }

    if (maxPrice) {
      const maxP = parseFloat(maxPrice);
      result = result.filter((p) => p.variants.some((v: any) => v.price <= maxP));
    }

    if (inStock) {
      result = result.filter((p) => p.variants.some((v: any) => (v.stockStatus === 'IN_STOCK' || (typeof v.stock === 'number' && v.stock > 0))));
    }

    if (selectedSort === 'price_asc') {
      result.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
    } else if (selectedSort === 'price_desc') {
      result.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
    }

    return result;
  }, [
    initialProducts,
    selectedCategory,
    selectedCollection,
    selectedSub,
    selectedTexture,
    selectedFoamType,
    selectedPowerType,
    searchQuery,
    minPrice,
    maxPrice,
    inStock,
    selectedSort,
    locale,
  ]);

  // ── Active filter chips ─────────────────────────────────────────────
  interface Chip {
    key: string;
    label: string;
  }
  const chips: Chip[] = [];
  if (searchQuery) chips.push({ key: 'search', label: `"${searchQuery}"` });
  if (selectedCategory) {
    const cat = categories.find((c) => c.slug === selectedCategory);
    chips.push({ key: 'category', label: cat ? (locale === 'ru' ? cat.nameRu : cat.nameUz) : selectedCategory });
  }
  if (selectedCollection) {
    chips.push({ key: 'collection', label: `${locale === 'ru' ? 'Подборка' : 'To‘plam'}: ${selectedCollection.replace(/-/g, ' ')}` });
  }
  if (selectedSub) chips.push({ key: 'sub', label: selectedSub.replace(/-/g, ' ') });
  if (selectedTexture) chips.push({ key: 'texture', label: selectedTexture });
  if (selectedFoamType) chips.push({ key: 'foam_type', label: selectedFoamType });
  if (selectedPowerType) chips.push({ key: 'power_type', label: selectedPowerType });
  if (minPrice || maxPrice) chips.push({ key: 'price', label: `${minPrice || '0'} – ${maxPrice || '∞'}` });
  if (inStock) chips.push({ key: 'inStock', label: locale === 'ru' ? 'В наличии' : 'Omborda bor' });
  if (selectedSort !== 'newest') chips.push({ key: 'sort', label: locale === 'ru' ? 'Сортировка' : 'Saralash' });

  // Pattern #11 — filtering must never trigger a full page reload. Both
  // handlers go through the Next.js router (client-side transition, no
  // white-flash / lost scroll position) instead of `window.location.href`.
  const removeChip = (key: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    const qs = params.toString();
    router.push(`/${locale}/catalog${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const clearAll = () => {
    router.push(`/${locale}/catalog`, { scroll: false });
  };

  const currentCategoryObj = categories.find((c) => c.slug === selectedCategory);
  const pageTitle = currentCategoryObj
    ? (locale === 'ru' ? currentCategoryObj.nameRu : currentCategoryObj.nameUz)
    : locale === 'ru'
    ? 'Каталог материалов'
    : 'Mahsulotlar katalogi';

  return (
    <>
      <PageHero
        className="mb-6"
        icon={LayoutGrid}
        kicker={locale === 'ru' ? 'Каталог' : 'Katalog'}
        title={pageTitle}
        subtitle={
          locale === 'ru'
            ? `Найдено ${products.length} позиций`
            : `${products.length} ta mahsulot topildi`
        }
      />

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
            <EmptyState
              className="my-8"
              icon={PackageX}
              title={locale === 'ru' ? 'Товары не найдены' : 'Mahsulotlar topilmadi'}
              description={
                locale === 'ru'
                  ? 'Измените параметры поиска или сбросьте фильтры.'
                  : 'Qidiruv parametrlarini o‘zgartiring yoki filterlarni tozalang.'
              }
              action={
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{locale === 'ru' ? 'Сбросить фильтры' : 'Filterlarni tozalash'}</span>
                </button>
              }
            />
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
        locale={locale}
        categories={categories}
        isMobile
        isOpenMobile={mobileFilterOpen}
        onCloseMobile={() => setMobileFilterOpen(false)}
      />
    </>
  );
}
