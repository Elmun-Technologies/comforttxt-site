'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
import { getSpecTooltip } from '@/data/spec-glossary';
import { useOverlay } from '@/lib/hooks/useOverlay';

interface CategoryFilterProps {
  categorySlug?: string;
  locale: string;
  categories?: any[];
  isMobile?: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function CategoryFilterSidebar({
  categorySlug,
  locale,
  categories = [],
  isMobile = false,
  isOpenMobile = false,
  onCloseMobile,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = categorySlug || searchParams.get('category') || '';
  const selectedSub = searchParams.get('sub') || '';
  const selectedSort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStock = searchParams.get('inStock') === 'true';

  // Category-specific selected filter values
  const selectedTexture = searchParams.get('texture') || '';
  const selectedFoamType = searchParams.get('foam_type') || '';
  const selectedPowerType = searchParams.get('power_type') || '';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const targetUrl = categorySlug
      ? `/${locale}/catalog/${categorySlug}?${params.toString()}`
      : `/${locale}/catalog?${params.toString()}`;
    router.push(targetUrl);
  };

  const handleReset = () => {
    const targetUrl = categorySlug ? `/${locale}/catalog/${categorySlug}` : `/${locale}/catalog`;
    router.push(targetUrl);
  };

  // Local, debounced copies of the price inputs — pushing a router
  // navigation on every keystroke would refetch/re-render on each digit
  // and drop focus. Committed to the URL 450ms after typing stops, and
  // resynced when the filters change from elsewhere (e.g. a chip removal).
  const [minPriceInput, setMinPriceInput] = useState(minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);

  useEffect(() => setMinPriceInput(minPrice), [minPrice]);
  useEffect(() => setMaxPriceInput(maxPrice), [maxPrice]);

  useEffect(() => {
    if (minPriceInput === minPrice) return;
    const timer = setTimeout(() => updateParam('minPrice', minPriceInput), 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPriceInput]);

  useEffect(() => {
    if (maxPriceInput === maxPrice) return;
    const timer = setTimeout(() => updateParam('maxPrice', maxPriceInput), 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPriceInput]);

  const currentCategoryObj = categories.find((c) => c.slug === selectedCategory);

  useOverlay(isMobile && isOpenMobile, onCloseMobile || (() => {}));

  const sidebarContent = (
    <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2 font-black text-sm text-heading uppercase tracking-wider">
          <Filter className="w-4 h-4 text-accent" />
          <span>{locale === 'ru' ? 'Фильтры' : 'Filterlar'}</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-muted hover:text-accent flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{locale === 'ru' ? 'Сбросить' : 'Tozalash'}</span>
        </button>
      </div>

      {/* Sorting */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-heading block uppercase tracking-wider">
          {locale === 'ru' ? 'Сортировка' : 'Saralash'}
        </label>
        <select
          value={selectedSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-xs font-bold text-heading focus:outline-none focus:border-accent"
        >
          <option value="newest">{locale === 'ru' ? 'Новинки' : 'Yangi kelganlar'}</option>
          <option value="price_asc">{locale === 'ru' ? 'Сначала дешевые' : 'Narx: Arzondan qimmatga'}</option>
          <option value="price_desc">{locale === 'ru' ? 'Сначала дорогие' : 'Narx: Qimmatdan arzonga'}</option>
        </select>
      </div>

      {/* Category Selection if on main catalog */}
      {!categorySlug && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-heading block uppercase tracking-wider">
            {locale === 'ru' ? 'Категория' : 'Kategoriya'}
          </label>
          <div className="space-y-1">
            <button
              onClick={() => updateParam('category', '')}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                !selectedCategory
                  ? 'bg-accent text-surface font-bold'
                  : 'text-body hover:bg-secondary'
              }`}
            >
              {locale === 'ru' ? 'Все категории' : 'Barcha kategoriyalar'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateParam('category', cat.slug)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat.slug
                    ? 'bg-accent text-surface font-bold'
                    : 'text-body hover:bg-secondary'
                }`}
              >
                {locale === 'ru' ? cat.nameRu : cat.nameUz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subcategories if category selected */}
      {currentCategoryObj && (currentCategoryObj.subcategories || currentCategoryObj.children) && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-heading block uppercase tracking-wider">
            {locale === 'ru' ? 'Подкатегория' : 'Kichik kategoriya'}
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => updateParam('sub', '')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                !selectedSub ? 'bg-heading text-surface border-heading' : 'bg-secondary text-body border-border'
              }`}
            >
              {locale === 'ru' ? 'Все' : 'Barchasi'}
            </button>
            {(currentCategoryObj.subcategories || currentCategoryObj.children).map((sub: any) => (
              <button
                key={sub.slug}
                onClick={() => updateParam('sub', sub.slug)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                  selectedSub === sub.slug ? 'bg-heading text-surface border-heading' : 'bg-secondary text-body border-border'
                }`}
              >
                {locale === 'ru' ? sub.nameRu : sub.nameUz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Category-Specific Filters */}
      {/* CATEGORY 1: Fabrics Filters */}
      {(!selectedCategory || selectedCategory === 'mebel-matolari') && (
        <div className="space-y-4 border-t border-border pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-heading flex items-center gap-1.5 uppercase tracking-wider">
              {locale === 'ru' ? 'Фактура / Текстура' : 'Faktura / Tekstura'}
              {(() => {
                const tip = getSpecTooltip('texture', locale);
                return tip && <Tooltip title={tip.title} body={tip.body} />;
              })()}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['Velyur', 'Bukle', 'Shenill', 'Rogojka', 'Eko-charm'].map((txt) => (
                <button
                  key={txt}
                  onClick={() => updateParam('texture', selectedTexture === txt ? '' : txt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                    selectedTexture === txt
                      ? 'bg-accent text-surface border-accent'
                      : 'bg-secondary text-body border-border'
                  }`}
                >
                  {txt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 2: Foam / Paralon Filters */}
      {selectedCategory === 'paralon' && (
        <div className="space-y-4 border-t border-border pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-heading flex items-center gap-1.5 uppercase tracking-wider">
              {locale === 'ru' ? 'Марка поролона (Тип)' : 'Paralon markasi (Turi)'}
              {(() => {
                const tip = getSpecTooltip('foam_type', locale);
                return tip && <Tooltip title={tip.title} body={tip.body} />;
              })()}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'ST', label: 'ST (Standart)' },
                { id: 'EL', label: 'EL (Yuqori qattiqlik)' },
                { id: 'HR', label: 'HR (Yuqori elastik)' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateParam('foam_type', selectedFoamType === f.id ? '' : f.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                    selectedFoamType === f.id
                      ? 'bg-accent text-surface border-accent'
                      : 'bg-secondary text-body border-border'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 3: Tools & Equipment Filters */}
      {selectedCategory === 'sarf-materiallar-va-instrumentlar' && (
        <div className="space-y-4 border-t border-border pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-heading flex items-center gap-1.5 uppercase tracking-wider">
              {locale === 'ru' ? 'Тип инструмента' : 'Instrument turi'}
              {(() => {
                const tip = getSpecTooltip('power_type', locale);
                return tip && <Tooltip title={tip.title} body={tip.body} />;
              })()}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['Pnevmatik', 'Yelim sprey', 'Skobalar'].map((p) => (
                <button
                  key={p}
                  onClick={() => updateParam('power_type', selectedPowerType === p ? '' : p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                    selectedPowerType === p
                      ? 'bg-accent text-surface border-accent'
                      : 'bg-secondary text-body border-border'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div className="space-y-2 border-t border-border pt-4">
        <label className="text-xs font-bold text-heading block uppercase tracking-wider">
          {locale === 'ru' ? 'Цена (сум)' : 'Narx diapazoni (so\'m)'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            className="px-3 py-1.5 bg-secondary border border-border rounded-xl text-xs font-semibold text-heading focus:outline-none focus:border-accent"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            className="px-3 py-1.5 bg-secondary border border-border rounded-xl text-xs font-semibold text-heading focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Stock Filter Checkbox */}
      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-heading">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : '')}
            className="w-4 h-4 text-accent rounded border-border focus:ring-accent"
          />
          <span>{locale === 'ru' ? 'Только в наличии' : 'Faqat omborda borlar'}</span>
        </label>
      </div>
    </div>
  );

  if (isMobile) {
    if (!isOpenMobile) return null;
    return (
      <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
        <div className="fixed inset-0 bg-heading/60 backdrop-blur-sm" onClick={onCloseMobile} />
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-xs bg-surface shadow-2xl p-4 overflow-y-auto z-50 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                <span className="font-black text-sm uppercase tracking-wider text-heading">
                  {locale === 'ru' ? 'Фильтры' : 'Filterlar'}
                </span>
                <button
                  onClick={onCloseMobile}
                  aria-label={locale === 'ru' ? 'Закрыть фильтры' : 'Filterlarni yopish'}
                  className="p-1 text-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </div>

            <button
              onClick={onCloseMobile}
              className="mt-6 w-full py-3 bg-accent text-surface font-bold text-xs rounded-xl shadow-md"
            >
              {locale === 'ru' ? 'Применить фильтры' : 'Filterlarni qo\'llash'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return sidebarContent;
}
