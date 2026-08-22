'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, RotateCcw, SlidersHorizontal, X } from 'lucide-react';

interface FilterProps {
  categories: any[];
  collections: any[];
  locale: string;
  isMobile?: boolean;
}

export function CatalogFilterSidebar({
  categories,
  collections,
  locale,
  isMobile = false,
}: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedCategory = searchParams.get('category') || '';
  const selectedCollection = searchParams.get('collection') || '';
  const selectedUnit = searchParams.get('unitType') || '';
  const selectedSort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStock = searchParams.get('inStock') === 'true';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/${locale}/catalog?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(`/${locale}/catalog`);
  };

  const content = (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
          <Filter className="w-4 h-4 text-brand-600" />
          <span>{locale === 'ru' ? 'Фильтры' : 'Filterlar'}</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{locale === 'ru' ? 'Сбросить' : 'Tozalash'}</span>
        </button>
      </div>

      {/* Sorting dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 block">
          {locale === 'ru' ? 'Сортировка' : 'Saralash'}
        </label>
        <select
          value={selectedSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="newest">{locale === 'ru' ? 'Новинки' : 'Yangi kelganlar'}</option>
          <option value="price_asc">{locale === 'ru' ? 'Сначала дешевые' : 'Narx: Arzondan qimmatga'}</option>
          <option value="price_desc">{locale === 'ru' ? 'Сначала дорогие' : 'Narx: Qimmatdan arzonga'}</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 block">
          {locale === 'ru' ? 'Категория' : 'Kategoriya'}
        </label>
        <div className="space-y-1">
          <button
            onClick={() => updateParam('category', '')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              !selectedCategory
                ? 'bg-brand-50 text-brand-700 font-bold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {locale === 'ru' ? 'Bce категории' : 'Barcha kategoriyalar'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParam('category', cat.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat.slug
                  ? 'bg-brand-50 text-brand-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {locale === 'ru' ? cat.nameRu : cat.nameUz}
            </button>
          ))}
        </div>
      </div>

      {/* Unit Type Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 block">
          {locale === 'ru' ? 'Единица измерения' : 'O\'lchov birligi'}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: '', labelUz: 'Barchasi', labelRu: 'Все' },
            { id: 'meter', labelUz: 'Metr (m)', labelRu: 'Метр (м)' },
            { id: 'sheet', labelUz: 'List (paralon)', labelRu: 'Лист (ппу)' },
            { id: 'pcs', labelUz: 'Dona (dona)', labelRu: 'Штук (шт)' },
          ].map((u) => (
            <button
              key={u.id}
              onClick={() => updateParam('unitType', u.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition ${
                selectedUnit === u.id
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {locale === 'ru' ? u.labelRu : u.labelUz}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 block">
          {locale === 'ru' ? 'Цена (сум)' : 'Narx diapazoni (so\'m)'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateParam('minPrice', e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateParam('maxPrice', e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Stock Filter Checkbox */}
      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-800">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : '')}
            className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 border-gray-300"
          />
          <span>{locale === 'ru' ? 'Только в наличии' : 'Faqat omborda borlar'}</span>
        </label>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-bold transition"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-600" />
          <span>{locale === 'ru' ? 'Фильтры' : 'Filterlar'}</span>
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-xs bg-white shadow-2xl p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                  <span className="font-bold text-sm">{locale === 'ru' ? 'Фильтры' : 'Filterlar'}</span>
                  <button onClick={() => setMobileOpen(false)} className="p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {content}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return content;
}
