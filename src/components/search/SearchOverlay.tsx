'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Package, Tag, ArrowRight, Loader2, Sparkles, BookOpen, AlertCircle, RotateCcw } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { ProductImage } from '@/components/product/ProductImage';
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
  const [failed, setFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults({ products: [], categories: [], collections: [] });
      setFailed(false);
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
      setFailed(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setFailed(false);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        } else {
          setFailed(true);
        }
      } catch (err) {
        console.error('Search error:', err);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [q, retryKey]);

  if (!isOpen) return null;

  const filteredProducts = results.products || [];
  const filteredCategories = results.categories || [];
  const filteredCollections = results.collections || [];

  // SKU-first: an exact SKU match must be the first result
  const exactSkuProduct = filteredProducts.find((p) =>
    (p.variants || []).some((v: any) => v.sku.toLowerCase() === q)
  );
  const hasExactSku = Boolean(exactSkuProduct);

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

  const contactLink = storefrontConfig.telegramChannelUrl || storefrontConfig.telegramBotOrManagerUrl || '';

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
                  ? 'Поиск по названию или точному SKU (например 8016)...'
                  : 'Nomi yoki aniq SKU bo‘yicha qidirish (masalan 8016)...'
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
                {locale === 'ru' ? 'Поиск по артикулу или названию:' : 'Artikul yoki nom bo‘yicha qidiruv:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {['8016', 'F30', 'K416', 'KL-01', 'Delfin', 'Kley stik'].map((tag) => (
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

              {!loading && failed && (
                <div className="py-10 text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-muted mx-auto stroke-1" />
                  <p className="font-bold text-heading text-sm">
                    {locale === 'ru'
                      ? 'Не удалось загрузить результаты'
                      : 'Natijalarni yuklab bo‘lmadi'}
                  </p>
                  <button
                    onClick={() => setRetryKey((k) => k + 1)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{locale === 'ru' ? 'Попробовать снова' : 'Qayta urinib ko‘rish'}</span>
                  </button>
                </div>
              )}

              {/* Product Matches — ALWAYS first (SKU-first) */}
              {!loading && !failed && filteredProducts.length > 0 && (
                <div className="pt-3 space-y-2">
                  <span className="text-[10px] font-black text-muted uppercase tracking-wider block mb-1 px-1">
                    {locale === 'ru' ? 'Товары и артикулы (SKU)' : 'Mahsulotlar va artikullar (SKU)'}
                    {hasExactSku && (
                      <span className="ml-2 normal-case bg-accent-light text-accent px-1.5 py-0.5 rounded text-[9px]">
                        {locale === 'ru' ? 'точное совпадение' : 'aniq moslik'}
                      </span>
                    )}
                  </span>
                  {filteredProducts.map((product) => {
                    const firstVar = product.variants?.[0];
                    const imgUrl = firstVar?.images?.[0] || product.primaryImage || '';

                    return (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.slug)}
                        className={`flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 hover:bg-secondary rounded-xl cursor-pointer border transition ${
                          hasExactSku && exactSkuProduct?.id === product.id
                            ? 'border-accent/50 bg-accent-light/40'
                            : 'border-transparent hover:border-border'
                        }`}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-border flex-shrink-0 overflow-hidden bg-secondary">
                          <ProductImage
                            src={imgUrl}
                            alt={locale === 'ru' ? product.titleRu : product.titleUz}
                            fit="cover"
                            locale={locale}
                            compact
                            className="w-full h-full"
                          />
                        </div>
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

              {/* Categories & Collections — only when there is no exact SKU match */}
              {!loading && !failed && !hasExactSku && (filteredCategories.length > 0 || filteredCollections.length > 0) && (
                <div className="pb-3 space-y-3 pt-3">
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
                        {locale === 'ru' ? 'Подборки' : 'To‘plamlar'}
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

              {/* No matches — actionable empty state */}
              {!loading && !failed && filteredProducts.length === 0 && filteredCategories.length === 0 && (
                <div className="py-10 text-center text-sm space-y-3">
                  <Package className="w-12 h-12 mx-auto text-muted/50 stroke-1" />
                  <p className="font-black text-heading">
                    {locale === 'ru' ? 'Товар не найден' : 'Mahsulot topilmadi'}
                  </p>
                  <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                    {locale === 'ru'
                      ? 'Проверьте правильность артикула (SKU) или попробуйте общее название материала.'
                      : 'Artikul (SKU) to‘g‘riligini tekshiring yoki materialning umumiy nomini kiriting.'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onClose();
                        router.push(`/${locale}/catalog`);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-hover text-surface text-xs font-bold rounded-xl transition"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{locale === 'ru' ? 'Открыть каталог' : 'Katalogni ochish'}</span>
                    </button>
                    {contactLink && (
                      <a
                        href={contactLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary hover:bg-border text-heading text-xs font-bold rounded-xl border border-border transition"
                      >
                        <span>{locale === 'ru' ? 'Спросить менеджера' : 'Menejerdan so‘rash'}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Bar */}
          <div className="p-3.5 bg-secondary border-t border-border flex justify-between items-center text-xs text-muted">
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border font-mono font-bold text-[10px]">Esc</kbd>{' '}
              {locale === 'ru' ? 'закрыть' : 'yopish'}
            </span>
            <button
              onClick={handleFormSubmit}
              className="inline-flex items-center gap-1.5 font-black text-accent hover:underline ml-auto"
            >
              <span>{locale === 'ru' ? 'Все результаты в каталоге' : 'Barcha natijalar katalogda'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
