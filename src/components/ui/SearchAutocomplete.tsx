'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, Package, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

interface SearchProps {
  locale: string;
}

export function SearchAutocomplete({ locale }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ products: any[]; categories: any[] }>({
    products: [],
    categories: [],
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults({ products: [], categories: [] });
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/${locale}/catalog?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectProduct = (slug: string) => {
    setIsOpen(false);
    router.push(`/${locale}/product/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    setIsOpen(false);
    router.push(`/${locale}/catalog?category=${slug}`);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={dropdownRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder={
            locale === 'ru'
              ? 'Поиск ткани, поролона, SKU (LUNA-01, ST2536)...'
              : 'Mato, paralon, SKU (LUNA-01, ST2536) qidirish...'
          }
          className="w-full pl-11 pr-10 py-2.5 bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 focus:border-brand-500 rounded-lg text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
        />
        <Search className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
        {loading && (
          <Loader2 className="absolute right-3 top-3 text-brand-600 animate-spin w-4 h-4" />
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[75vh] overflow-y-auto">
          {results.categories.length > 0 && (
            <div className="p-3 border-b border-gray-100 bg-gray-50/50">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2 px-2">
                {locale === 'ru' ? 'Категории' : 'Kategoriyalar'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {results.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-brand-50 text-brand-700 hover:bg-brand-100 px-2.5 py-1.5 rounded-md transition"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {locale === 'ru' ? cat.nameRu : cat.nameUz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.products.length > 0 ? (
            <div className="py-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1 px-4 pt-1">
                {locale === 'ru' ? 'Товары' : 'Mahsulotlar'}
              </span>
              {results.products.map((product) => {
                const firstVar = product.variants?.[0];
                const images = firstVar?.imagesJson ? JSON.parse(firstVar.imagesJson) : [];
                const imgUrl = images[0] || 'https://via.placeholder.com/60';

                return (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-50/60 cursor-pointer border-b last:border-0 border-gray-50 transition"
                  >
                    <img
                      src={imgUrl}
                      alt={product.titleUz}
                      className="w-12 h-12 object-cover rounded-md border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {locale === 'ru' ? product.titleRu : product.titleUz}
                        </h4>
                        {firstVar?.sku && (
                          <span className="text-[11px] font-mono font-semibold bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                            {firstVar.sku}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {locale === 'ru' ? product.category.nameRu : product.category.nameUz}
                        {product.brand && ` • ${product.brand}`}
                      </p>
                    </div>
                    {firstVar && (
                      <div className="text-right font-semibold text-brand-700 text-xs">
                        {formatPrice(firstVar.price, locale)} / {firstVar.unitType || product.unitType}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            !loading &&
            results.categories.length === 0 && (
              <div className="p-6 text-center text-gray-500 text-sm">
                <Package className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                {locale === 'ru' ? 'Товары не найдены' : 'Mahsulotlar topilmadi'}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
