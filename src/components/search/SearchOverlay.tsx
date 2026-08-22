'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Package, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export function SearchOverlay({ isOpen, onClose, locale }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [results, setResults] = useState<{ products: any[]; categories: any[] }>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults({ products: [], categories: [] });
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
      setResults({ products: [], categories: [] });
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
    }, 300);

    return () => clearTimeout(timer);
  }, [q]);

  if (!isOpen) return null;

  const filteredProducts = results.products;
  const filteredCategories = results.categories;

  const handleSelectProduct = (slug: string) => {
    onClose();
    router.push(`/${locale}/product/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    onClose();
    router.push(`/${locale}/catalog/${slug}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/${locale}/catalog?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-heading/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="min-h-screen px-4 pt-12 pb-20 text-center sm:p-0 flex flex-col items-center">
        {/* Main Search Panel */}
        <div className="relative w-full max-w-3xl bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden mt-8 text-left">
          {/* Header Input Form */}
          <form onSubmit={handleFormSubmit} className="p-4 border-b border-border flex items-center gap-3">
            <Search className="w-5 h-5 text-muted flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === 'ru'
                  ? 'Поиск ткани, поролона, SKU (например LUNA-01, ST2536, F30D)...'
                  : 'Mato, paralon, SKU (masalan LUNA-01, ST2536, F30D) qidirish...'
              }
              className="w-full text-base font-medium text-heading placeholder:text-muted bg-transparent focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-muted hover:text-heading rounded-lg hover:bg-secondary transition"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Suggestions when empty */}
          {q.length < 2 && (
            <div className="p-6 space-y-4">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">
                {locale === 'ru' ? 'Популярные запросы:' : 'Ommabop qidiruvlar:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {['LUNA-01', 'ST-2536', 'F30D', 'Akfix 705', 'Velur', 'Paralon', 'Gaz-lift'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-secondary hover:bg-border text-heading text-xs font-semibold rounded-lg transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results Display */}
          {q.length >= 2 && (
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {loading && (
                <div className="py-12 flex justify-center text-muted">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              )}
              
              {!loading && filteredCategories.length > 0 && (
                <div className="border-b border-border pb-3">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider block mb-2 px-2">
                    {locale === 'ru' ? 'Категории' : 'Kategoriyalar'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {filteredCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.slug)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-accent-light text-accent hover:bg-accent/20 px-3 py-1.5 rounded-lg transition"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        {locale === 'ru' ? cat.nameRu : cat.nameUz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product matches */}
              {!loading && filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1 px-2">
                    {locale === 'ru' ? 'Товары' : 'Mahsulotlar'}
                  </span>
                  {filteredProducts.map((product) => {
                    const firstVar = product.variants?.[0];
                    const imgUrl = firstVar?.images?.[0]?.url || product.images?.[0]?.url || 'https://via.placeholder.com/60';

                    return (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.slug)}
                        className="flex items-center gap-4 p-3 hover:bg-secondary rounded-xl cursor-pointer border border-transparent hover:border-border transition"
                      >
                        <img
                          src={imgUrl}
                          alt={product.titleUz}
                          className="w-14 h-14 object-cover rounded-lg border border-border flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-heading truncate">
                              {locale === 'ru' ? product.titleRu : product.titleUz}
                            </h4>
                            {firstVar?.sku && (
                              <span className="text-[11px] font-mono font-bold bg-secondary text-body px-1.5 py-0.5 rounded border border-border">
                                {firstVar.sku}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted truncate mt-0.5">
                            {product.category ? (locale === 'ru' ? product.category.nameRu : product.category.nameUz) : ''}
                            {product.brand?.name && ` • ${product.brand.name}`}
                          </p>
                        </div>
                        {firstVar?.price && (
                          <div className="text-right font-extrabold text-accent text-xs">
                            {formatPrice(firstVar.price.retailPrice, locale)} / {product.unitType}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                !loading && filteredCategories.length === 0 && (
                  <div className="py-12 text-center text-muted text-sm space-y-2">
                    <Package className="w-10 h-10 mx-auto text-muted/50 stroke-1" />
                    <p>{locale === 'ru' ? 'Товары не найдены' : 'Mahsulotlar topilmadi'}</p>
                  </div>
                )
              )}
            </div>
          )}

          {/* Footer keyboard hint */}
          <div className="p-3 bg-secondary border-t border-border flex justify-between items-center text-[11px] text-muted">
            <span>Press <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border font-mono font-bold">Esc</kbd> to close</span>
            <button
              onClick={handleFormSubmit}
              className="inline-flex items-center gap-1 font-bold text-accent hover:underline"
            >
              <span>{locale === 'ru' ? 'Bce результаты' : 'Barcha natijalar'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
