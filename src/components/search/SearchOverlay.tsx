'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Package, Tag, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { storefrontConfig } from '@/config/storefront';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export function SearchOverlay({ isOpen, onClose, locale }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [results, setResults] = useState<{ products: any[]; categories: any[]; collections?: any[] }>({
    products: [],
    categories: [],
    collections: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults({ products: [], categories: [], collections: [] });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const q = query.trim().toLowerCase();

  useEffect(() => {
    if (q.length < 2) {
      setResults({ products: [], categories: [], collections: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [q]);

  if (!isOpen) return null;

  const filteredProducts = results.products || [];
  const filteredCategories = results.categories || [];
  const filteredCollections = results.collections || [];

  const handleSelectProduct = (slug: string) => {
    onClose();
    router.push(`/${locale}/product/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    onClose();
    router.push(`/${locale}/catalog/${slug}`);
  };

  const handleSelectCollection = (slug: string) => {
    onClose();
    router.push(`/${locale}/catalog?collection=${slug}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/${locale}/catalog?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-heading/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="min-h-screen px-3 sm:px-4 pt-4 sm:pt-12 pb-20 text-center flex flex-col items-center">
        {/* Main Search Panel */}
        <div className="relative w-full max-w-3xl bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden text-left my-auto sm:my-8">
          {/* Header Input Form */}
          <form onSubmit={handleFormSubmit} className="p-3.5 sm:p-4 border-b border-border flex items-center gap-3">
            <Search className="w-5 h-5 text-accent flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === 'ru'
                  ? 'Поиск по названию или точному SKU (LUNA-01, ST2536, F30D)...'
                  : 'Nomi yoki aniq SKU bo‘yicha qidirish (LUNA-01, ST2536, F30D)...'
              }
              className="w-full text-sm sm:text-base font-semibold text-heading placeholder:text-muted/80 bg-transparent focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-muted hover:text-heading rounded-xl hover:bg-secondary transition"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Suggestions when empty */}
          {q.length < 2 && (
            <div className="p-5 sm:p-6 space-y-4">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                {locale === 'ru' ? 'Быстрый поиск по артикулу и категории:' : 'Artikul va kategoriya bo‘yicha tezkor qidiruv:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {['LUNA-01', 'ST2536-50', 'F30D', 'AKFIX-500', '8016', 'Velyur', 'Paralon', 'Delfin'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-secondary hover:bg-border text-heading text-xs font-bold rounded-xl transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results Display */}
          {q.length >= 2 && (
            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4 divide-y divide-border">
              {loading && (
                <div className="py-12 flex justify-center text-muted">
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                </div>
              )}

              {/* Categorized Matches: Categories & Collections */}
              {!loading && (filteredCategories.length > 0 || filteredCollections.length > 0) && (
                <div className="pb-3 space-y-3">
                  {filteredCategories.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-muted uppercase tracking-wider block mb-2 px-1">
                        {locale === 'ru' ? 'Категории' : 'Kategoriyalar'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {filteredCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleSelectCategory(cat.slug)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-secondary hover:bg-accent-light hover:text-accent border border-border px-3 py-1.5 rounded-xl transition"
                          >
                            <Tag className="w-3.5 h-3.5 text-accent" />
                            {locale === 'ru' ? cat.nameRu : cat.nameUz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredCollections.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-muted uppercase tracking-wider block mb-2 px-1">
                        {locale === 'ru' ? 'Коллекции' : 'Kolleksiyalar'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {filteredCollections.map((col) => (
                          <button
                            key={col.id}
                            onClick={() => handleSelectCollection(col.slug)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-secondary hover:bg-accent-light hover:text-accent border border-border px-3 py-1.5 rounded-xl transition"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-accent" />
                            {col.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Product Matches */}
              {!loading && filteredProducts.length > 0 && (
                <div className="pt-3 space-y-2">
                  <span className="text-[10px] font-black text-muted uppercase tracking-wider block mb-1 px-1">
                    {locale === 'ru' ? 'Товары и Артикулы (SKU)' : 'Mahsulotlar va Artikul (SKU)'}
                  </span>
                  {filteredProducts.map((product) => {
                    const firstVar = product.variants?.[0];
                    const imgUrl = firstVar?.images?.[0] || product.primaryImage || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop';

                    return (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.slug)}
                        className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 hover:bg-secondary rounded-xl cursor-pointer border border-transparent hover:border-border transition"
                      >
                        <img
                          src={imgUrl}
                          alt={product.titleUz}
                          className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border border-border flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-heading truncate">
                              {locale === 'ru' ? product.titleRu : product.titleUz}
                            </h4>
                            {firstVar?.sku && (
                              <span className="text-[10px] font-mono font-bold bg-surface text-heading px-1.5 py-0.5 rounded border border-border flex-shrink-0">
                                {firstVar.sku}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted truncate mt-0.5 font-medium">
                            {locale === 'ru' ? product.categoryNameRu : product.categoryNameUz}
                            {product.brand && ` • ${product.brand}`}
                          </p>
                        </div>
                        {firstVar?.price && (
                          <div className="text-right font-black text-accent text-xs sm:text-sm flex-shrink-0">
                            {formatPrice(firstVar.price, locale)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* No matches */}
              {!loading && filteredProducts.length === 0 && filteredCategories.length === 0 && (
                <div className="py-10 text-center text-muted space-y-4 px-4">
                  <Package className="w-12 h-12 mx-auto text-muted/50 stroke-1" />
                  <div>
                    <h3 className="font-bold text-heading text-base">
                      {locale === 'ru' ? 'Товар не найден' : 'Mahsulot topilmadi'}
                    </h3>
                    <p className="text-xs text-muted max-w-sm mx-auto mt-1 leading-relaxed">
                      {locale === 'ru'
                        ? 'Проверьте правильность артикула (SKU) или воспользуйтесь каталогом материалов.'
                        : 'Artikul (SKU) to‘g‘riligini tekshiring yoki materiallar katalogidan foydalaning.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push(`/${locale}/catalog`);
                      }}
                      className="px-4 py-2 bg-accent text-surface text-xs font-bold rounded-xl shadow-xs hover:bg-accent-hover transition"
                    >
                      {locale === 'ru' ? 'Перейти в каталог' : 'Katalogni ko‘rish'}
                    </button>
                    <a
                      href={storefrontConfig.telegramChannelUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl hover:bg-blue-100 transition"
                    >
                      {locale === 'ru' ? 'Спросить у менеджера' : 'Menejerdan so‘rash'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Bar */}
          <div className="p-3.5 bg-secondary border-t border-border flex justify-between items-center text-xs text-muted">
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border font-mono font-bold text-[10px]">Esc</kbd> yopish
            </span>
            <button
              onClick={handleFormSubmit}
              className="inline-flex items-center gap-1.5 font-black text-accent hover:underline ml-auto"
            >
              <span>{locale === 'ru' ? 'Смотреть все результаты в каталоге' : 'Katalogda barcha natijalarni ko‘rish'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
