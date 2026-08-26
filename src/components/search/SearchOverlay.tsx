'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Tag,
  ArrowRight,
  Loader2,
  Sparkles,
  BookOpen,
  AlertCircle,
  RotateCcw,
  Clock,
  TrendingUp,
  Layers,
  Palette,
  Settings,
  Wrench,
  Hammer,
  CornerDownLeft,
  Trash2,
  SearchX,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { ProductImage } from '@/components/product/ProductImage';
import { storefrontConfig } from '@/config/storefront';
import { useOverlay } from '@/lib/hooks/useOverlay';
import { highlightMatch } from '@/lib/search/searchEngine';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

interface SearchProductItem {
  id: string;
  slug: string;
  titleUz: string;
  titleRu: string;
  categorySlug: string;
  categoryNameUz: string;
  categoryNameRu: string;
  collectionSlug?: string;
  collectionName?: string;
  unitType?: string;
  primaryImage?: string;
  images?: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  variants?: Array<{
    id: string;
    sku: string;
    nameUz: string;
    nameRu?: string;
    colorHex?: string;
    colorNameUz?: string;
    colorNameRu?: string;
    price: number;
    wholesalePrice?: number;
    oldPrice?: number;
    hasWholesale?: boolean;
    stockStatus?: string;
    images?: string[];
  }>;
  matchedVariant?: {
    id: string;
    sku: string;
    nameUz: string;
    nameRu?: string;
    colorHex?: string;
    colorNameUz?: string;
    colorNameRu?: string;
    price: number;
    wholesalePrice?: number;
    oldPrice?: number;
    images?: string[];
  };
  matchedReason?: string;
  relevanceScore?: number;
}

interface SearchCategoryItem {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  descriptionUz?: string;
  descriptionRu?: string;
  iconName?: string;
  productCount?: number;
}

interface SearchCollectionItem {
  id: string;
  slug: string;
  name: string;
  descriptionUz?: string;
  descriptionRu?: string;
  productCount?: number;
}

const STORAGE_KEY = 'comfort_recent_searches_v2';
const MAX_HISTORY = 6;

const POPULAR_SEARCHES_UZ = [
  'Velyur mato',
  'Paralon korner',
  'Pnevmatik nailer F30',
  'Delfin mexanizmi',
  'Kley stiklar',
  'Bukle mato',
  'Pnevmostepler 8016',
  'Skoba K416',
];

const POPULAR_SEARCHES_RU = [
  'Велюр ткани',
  'Поролон корнер',
  'Пневмопистолет F30',
  'Механизм Дельфин',
  'Клеевые стики',
  'Букле ткани',
  'Пневмостеплер 8016',
  'Скобы K416',
];

const QUICK_CATEGORIES = [
  { slug: 'mebel-matolari', icon: Palette, labelUz: 'Mebel matolari', labelRu: 'Мебельные ткани', count: 6 },
  { slug: 'paralon', icon: Layers, labelUz: 'Paralon (Porolon)', labelRu: 'Поролон (ППУ)', count: 2 },
  { slug: 'mexanizmlar', icon: Settings, labelUz: 'Mexanizmlar', labelRu: 'Механизмы', count: 4 },
  { slug: 'furnitura-va-oyoqlar', icon: Wrench, labelUz: 'Furnitura va oyoqlar', labelRu: 'Фурнитура и ножки', count: 10 },
  { slug: 'sarf-materiallar-va-instrumentlar', icon: Hammer, labelUz: 'Asboblar va sarf', labelRu: 'Инструменты', count: 13 },
];

function Highlighted({ text, query }: { text: string; query: string }) {
  const parts = highlightMatch(text, query);
  return (
    <>
      {parts.map((p, idx) =>
        p.match ? (
          <mark key={idx} className="bg-accent/20 text-accent font-black rounded-sm px-0.5">
            {p.text}
          </mark>
        ) : (
          <span key={idx}>{p.text}</span>
        )
      )}
    </>
  );
}

export function SearchOverlay({ isOpen, onClose, locale }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'categories' | 'collections'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  // Tracks the exact query that the last completed search was for. We only show
  // the "no results" / results states once the current query has actually been
  // fetched — otherwise the empty state would flash during the debounce window.
  const [lastLoadedQuery, setLastLoadedQuery] = useState('');

  const [results, setResults] = useState<{
    products: SearchProductItem[];
    categories: SearchCategoryItem[];
    collections: SearchCollectionItem[];
    suggestions?: string[];
    totalMatches?: number;
  }>({
    products: [],
    categories: [],
    collections: [],
    suggestions: [],
    totalMatches: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOverlay(isOpen, onClose);

  // Load search history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, MAX_HISTORY));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveToHistory = useCallback((term: string) => {
    const clean = term.trim();
    if (!clean || clean.length < 2) return;
    try {
      setRecentSearches((prev) => {
        const updated = [clean, ...prev.filter((t) => t.toLowerCase() !== clean.toLowerCase())].slice(0, MAX_HISTORY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch {
      // ignore
    }
  }, []);

  const removeHistoryItem = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setRecentSearches((prev) => {
        const updated = prev.filter((t) => t !== term);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch {
      // ignore
    }
  };

  const clearAllHistory = () => {
    try {
      setRecentSearches([]);
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Reset state when overlay opens/closes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIndex(-1);
    } else {
      setQuery('');
      setResults({ products: [], categories: [], collections: [], suggestions: [], totalMatches: 0 });
      setFailed(false);
      setActiveIndex(-1);
      setActiveTab('all');
      setLastLoadedQuery('');
    }
  }, [isOpen]);

  const q = query.trim();
  const hasLoadedQuery = lastLoadedQuery === q;
  // True while we are still waiting on a response for the CURRENT query (during
  // the debounce window or an in-flight fetch). Used to avoid showing the
  // "nothing found" empty state before a search has actually completed.
  const searchPending = q.length >= 2 && !failed && !hasLoadedQuery;

  // Search API fetcher with debounce.
  useEffect(() => {
    if (q.length < 2) {
      setResults({ products: [], categories: [], collections: [], suggestions: [], totalMatches: 0 });
      setFailed(false);
      setActiveIndex(-1);
      setLoading(false);
      setLastLoadedQuery('');
      return;
    }

    setLoading(true);
    setFailed(false);

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&locale=${encodeURIComponent(locale)}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          setFailed(true);
          return;
        }
        const data = await res.json();
        setResults({
          products: data.products || [],
          categories: data.categories || [],
          collections: data.collections || [],
          suggestions: data.suggestions || [],
          totalMatches: data.totalMatches || (data.products?.length || 0) + (data.categories?.length || 0),
        });
        setLastLoadedQuery(q);
        setActiveIndex(-1);
      } catch (err) {
        // Ignore aborted (superseded) requests — a newer keystroke is in flight.
        if ((err as any)?.name === 'AbortError') return;
        console.error('Search error:', err);
        setFailed(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [q, locale, retryKey]);

  // Derived filtered results
  const filteredProducts = useMemo(() => {
    if (activeTab === 'categories' || activeTab === 'collections') return [];
    return results.products || [];
  }, [results.products, activeTab]);

  const filteredCategories = useMemo(() => {
    if (activeTab === 'products' || activeTab === 'collections') return [];
    return results.categories || [];
  }, [results.categories, activeTab]);

  const filteredCollections = useMemo(() => {
    if (activeTab === 'products' || activeTab === 'categories') return [];
    return results.collections || [];
  }, [results.collections, activeTab]);

  // Unified navigable items list for keyboard navigation
  interface NavigableItem {
    type: 'product' | 'category' | 'collection';
    id: string;
    slug: string;
    data: any;
  }

  const navigableItems = useMemo<NavigableItem[]>(() => {
    const items: NavigableItem[] = [];
    for (const p of filteredProducts) {
      items.push({ type: 'product', id: p.id, slug: p.slug, data: p });
    }
    for (const c of filteredCategories) {
      items.push({ type: 'category', id: c.id, slug: c.slug, data: c });
    }
    for (const col of filteredCollections) {
      items.push({ type: 'collection', id: col.id, slug: col.slug, data: col });
    }
    return items;
  }, [filteredProducts, filteredCategories, filteredCollections]);

  // Handle item selection
  const handleSelectNavigableItem = (item: NavigableItem) => {
    saveToHistory(query.trim());
    onClose();
    if (item.type === 'product') {
      router.push(`/${locale}/product/${item.slug}`);
    } else if (item.type === 'category') {
      router.push(`/${locale}/catalog/${item.slug}`);
    } else if (item.type === 'collection') {
      router.push(`/${locale}/catalog?collection=${item.slug}`);
    }
  };

  const handleSelectProduct = (product: SearchProductItem) => {
    saveToHistory(query.trim() || (locale === 'ru' ? product.titleRu : product.titleUz));
    onClose();
    router.push(`/${locale}/product/${product.slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    saveToHistory(query.trim());
    onClose();
    router.push(`/${locale}/catalog/${slug}`);
  };

  const handleSelectCollection = (slug: string) => {
    saveToHistory(query.trim());
    onClose();
    router.push(`/${locale}/catalog?collection=${slug}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && activeIndex < navigableItems.length) {
      handleSelectNavigableItem(navigableItems[activeIndex]);
      return;
    }
    if (query.trim()) {
      saveToHistory(query.trim());
      onClose();
      router.push(`/${locale}/catalog?search=${encodeURIComponent(query.trim())}`);
    }
  };

  // Footer "see all results" button should ALWAYS open the filtered catalogue —
  // not get redirected to whatever result was hovered/keyboard-selected. The form
  // submit (Enter key) keeps the "open highlighted item" behaviour.
  const handleOpenCatalogResults = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveToHistory(query.trim());
    onClose();
    router.push(`/${locale}/catalog?search=${encodeURIComponent(query.trim())}`);
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (navigableItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 >= navigableItems.length ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 < 0 ? navigableItems.length - 1 : prev - 1));
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-nav-index="${activeIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  // Best match detection (exact SKU or high relevance)
  const topProduct = filteredProducts[0];
  const isExactSkuMatch = topProduct?.relevanceScore && topProduct.relevanceScore >= 2000;

  const popularSearches = locale === 'ru' ? POPULAR_SEARCHES_RU : POPULAR_SEARCHES_UZ;
  const contactLink = storefrontConfig.telegramChannelUrl || storefrontConfig.telegramBotOrManagerUrl || '';

  const totalRawMatches = (results.products?.length || 0) + (results.categories?.length || 0) + (results.collections?.length || 0);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-heading/65 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 pt-4 sm:pt-14 pb-16 min-h-screen flex flex-col items-center">
        {/* Main Search Modal Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-surface rounded-2xl sm:rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col text-left animate-in zoom-in-95 duration-200"
        >
          {/* Header Search Input Form */}
          <form
            onSubmit={handleFormSubmit}
            onKeyDown={handleKeyDown}
            className="p-3.5 sm:p-4 border-b border-border bg-surface flex items-center gap-3 relative"
          >
            <div className="flex-shrink-0 text-accent">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-accent" />
              ) : (
                <Search className="w-5 h-5 text-accent" />
              )}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === 'ru'
                  ? 'Поиск ткани, поролона, механизмов или точного SKU (8016, K416)...'
                  : 'Mato, paralon, mexanizm yoki aniq SKU (masalan: 8016, K416)...'
              }
              className="w-full text-sm sm:text-base font-semibold text-heading placeholder:text-muted/70 bg-transparent focus:outline-none pr-16"
            />

            {/* Clear Button (inside input) */}
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1.5 text-muted hover:text-heading hover:bg-secondary rounded-lg transition text-xs font-bold mr-1"
                title={locale === 'ru' ? 'Очистить' : 'Tozalash'}
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Close Button / ESC Badge */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-muted hover:text-heading rounded-xl hover:bg-secondary transition flex items-center gap-1"
              title={locale === 'ru' ? 'Закрыть' : 'Yopish'}
            >
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-secondary text-muted text-[10px] font-mono font-bold rounded border border-border">
                ESC
              </kbd>
              <X className="w-5 h-5 sm:hidden" />
            </button>
          </form>

          {/* Filter Tabs when query has results */}
          {q.length >= 2 && !loading && !failed && hasLoadedQuery && totalRawMatches > 0 && (
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-secondary/60 border-b border-border overflow-x-auto no-scrollbar text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-accent text-surface shadow-xs'
                    : 'bg-surface text-muted hover:text-heading hover:bg-secondary border border-border'
                }`}
              >
                <span>{locale === 'ru' ? 'Все результаты' : 'Barcha natijalar'}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === 'all' ? 'bg-surface/20 text-surface' : 'bg-secondary text-muted'
                }`}>
                  {totalRawMatches}
                </span>
              </button>

              {results.products.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className={`px-3 py-1 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'products'
                      ? 'bg-accent text-surface shadow-xs'
                      : 'bg-surface text-muted hover:text-heading hover:bg-secondary border border-border'
                  }`}
                >
                  <span>{locale === 'ru' ? 'Товары' : 'Mahsulotlar'}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === 'products' ? 'bg-surface/20 text-surface' : 'bg-secondary text-muted'
                  }`}>
                    {results.products.length}
                  </span>
                </button>
              )}

              {results.categories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('categories')}
                  className={`px-3 py-1 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'categories'
                      ? 'bg-accent text-surface shadow-xs'
                      : 'bg-surface text-muted hover:text-heading hover:bg-secondary border border-border'
                  }`}
                >
                  <span>{locale === 'ru' ? 'Категории' : 'Kategoriyalar'}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === 'categories' ? 'bg-surface/20 text-surface' : 'bg-secondary text-muted'
                  }`}>
                    {results.categories.length}
                  </span>
                </button>
              )}

              {results.collections && results.collections.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('collections')}
                  className={`px-3 py-1 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'collections'
                      ? 'bg-accent text-surface shadow-xs'
                      : 'bg-surface text-muted hover:text-heading hover:bg-secondary border border-border'
                  }`}
                >
                  <span>{locale === 'ru' ? 'Подборки' : 'To‘plamlar'}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === 'collections' ? 'bg-surface/20 text-surface' : 'bg-secondary text-muted'
                  }`}>
                    {results.collections.length}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Results Container with Smooth Internal Scroll */}
          <div ref={listRef} className="max-h-[60vh] sm:max-h-[68vh] overflow-y-auto">
            {/* 1. INITIAL / EMPTY QUERY STATE */}
            {q.length < 2 && (
              <div className="p-4 sm:p-6 space-y-6 divide-y divide-border">
                {/* Search History (Recent Searches) */}
                {recentSearches.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        {locale === 'ru' ? 'Недавние поиски' : 'Oxirgi qidiruvlar'}
                      </span>
                      <button
                        type="button"
                        onClick={clearAllHistory}
                        className="text-[11px] font-bold text-muted hover:text-accent transition inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{locale === 'ru' ? 'Очистить историю' : 'Tozalash'}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <div
                          key={term}
                          onClick={() => setQuery(term)}
                          className="group inline-flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-accent-light hover:text-accent border border-border rounded-xl text-xs font-semibold text-heading cursor-pointer transition"
                        >
                          <Clock className="w-3 h-3 text-muted group-hover:text-accent" />
                          <span>{term}</span>
                          <button
                            type="button"
                            onClick={(e) => removeHistoryItem(term, e)}
                            className="p-0.5 text-muted hover:text-accent rounded hover:bg-surface transition"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular / Trending Searches */}
                <div className={`space-y-3 ${recentSearches.length > 0 ? 'pt-5' : ''}`}>
                  <span className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-accent" />
                    {locale === 'ru' ? 'Популярные запросы:' : 'Ommabop so‘rovlar:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 bg-secondary hover:bg-accent-light hover:text-accent hover:border-accent/30 text-heading text-xs font-bold rounded-xl border border-border transition flex items-center gap-1.5"
                      >
                        <span>{tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Categories Navigation */}
                <div className="pt-5 space-y-3">
                  <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                    {locale === 'ru' ? 'Быстрый переход по категориям:' : 'Tezkor bo‘limlar:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                    {QUICK_CATEGORIES.map((cat) => {
                      const IconComponent = cat.icon;
                      return (
                        <button
                          key={cat.slug}
                          onClick={() => handleSelectCategory(cat.slug)}
                          className="flex items-center justify-between p-2.5 sm:p-3 bg-secondary/50 hover:bg-secondary hover:border-accent/40 border border-border rounded-2xl transition group text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center text-accent group-hover:scale-105 transition">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-heading group-hover:text-accent transition">
                                {locale === 'ru' ? cat.labelRu : cat.labelUz}
                              </p>
                              <p className="text-[10px] text-muted font-medium">
                                {cat.count} {locale === 'ru' ? 'товаров' : 'ta mahsulot'}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. LOADING STATE */}
            {searchPending && (
              <div className="py-16 flex flex-col items-center justify-center space-y-3 text-muted">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
                <p className="text-xs font-semibold">
                  {locale === 'ru' ? 'Идет поиск по каталогу...' : 'Katalog bo‘yicha qidirilmoqda...'}
                </p>
              </div>
            )}

            {/* 3. ERROR / FAILED STATE */}
            {q.length >= 2 && !loading && !searchPending && failed && (
              <div className="py-12 text-center space-y-3 px-4">
                <AlertCircle className="w-10 h-10 text-muted mx-auto stroke-1" />
                <p className="font-bold text-heading text-sm">
                  {locale === 'ru' ? 'Не удалось загрузить результаты' : 'Natijalarni yuklab bo‘lmadi'}
                </p>
                <button
                  onClick={() => setRetryKey((k) => k + 1)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary hover:bg-border text-xs font-bold text-accent rounded-xl transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{locale === 'ru' ? 'Попробовать снова' : 'Qayta urinib ko‘rish'}</span>
                </button>
              </div>
            )}

            {/* 4. ACTIVE RESULTS DISPLAY */}
            {q.length >= 2 && !loading && !failed && !searchPending && hasLoadedQuery && totalRawMatches > 0 && (
              <div className="p-3 sm:p-4 space-y-4 divide-y divide-border">
                {/* Product Matches */}
                {filteredProducts.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-black text-muted uppercase tracking-wider flex items-center gap-2">
                        <span>{locale === 'ru' ? 'Товары и артикулы' : 'Mahsulotlar va artikullar'}</span>
                        <span className="text-[10px] bg-secondary text-muted px-2 py-0.5 rounded-full font-bold">
                          {filteredProducts.length}
                        </span>
                      </span>
                      {isExactSkuMatch && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-accent bg-accent-light px-2 py-0.5 rounded-full border border-accent/20">
                          <CheckCircle2 className="w-3 h-3 text-accent" />
                          <span>{locale === 'ru' ? 'Точное совпадение SKU' : 'Aniq SKU mosligi'}</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {filteredProducts.map((product) => {
                        const navIndex = navigableItems.findIndex(
                          (item) => item.type === 'product' && item.id === product.id
                        );
                        const isNavActive = activeIndex === navIndex;

                        const matchedVar = product.matchedVariant || product.variants?.[0];
                        const imgUrl = matchedVar?.images?.[0] || product.primaryImage || product.images?.[0] || '';
                        const price = matchedVar?.price || product.variants?.[0]?.price || 0;
                        const wholesalePrice = matchedVar?.wholesalePrice || product.variants?.[0]?.wholesalePrice;
                        const oldPrice = matchedVar?.oldPrice || product.variants?.[0]?.oldPrice;

                        const colorVariants = (product.variants || []).filter((v) => v.colorHex);

                        return (
                          <div
                            key={product.id}
                            data-nav-index={navIndex}
                            onClick={() => handleSelectProduct(product)}
                            onMouseEnter={() => setActiveIndex(navIndex)}
                            className={`group relative flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl cursor-pointer border transition ${
                              isNavActive
                                ? 'bg-accent-light/50 border-accent shadow-xs'
                                : 'bg-surface hover:bg-secondary/70 border-border hover:border-accent/40'
                            }`}
                          >
                            {/* Product Thumbnail */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-border flex-shrink-0 overflow-hidden bg-secondary shadow-xs">
                              <ProductImage
                                src={imgUrl}
                                alt={locale === 'ru' ? product.titleRu : product.titleUz}
                                fit="cover"
                                locale={locale}
                                compact
                                className="w-full h-full"
                              />
                            </div>

                            {/* Main Details */}
                            <div className="flex-1 min-w-0 pr-1 sm:pr-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-xs sm:text-sm font-bold text-heading group-hover:text-accent transition truncate">
                                  <Highlighted
                                    text={locale === 'ru' ? product.titleRu : product.titleUz}
                                    query={q}
                                  />
                                </h4>

                                {matchedVar?.sku && (
                                  <span className="text-[10px] font-mono font-bold bg-secondary group-hover:bg-surface text-heading px-1.5 py-0.5 rounded border border-border flex-shrink-0">
                                    <Highlighted text={matchedVar.sku} query={q} />
                                  </span>
                                )}
                              </div>

                              {/* Category & Matched Reason Badge */}
                              <div className="flex items-center gap-2 flex-wrap mt-1">
                                <span className="text-[11px] text-muted font-medium">
                                  {locale === 'ru' ? product.categoryNameRu : product.categoryNameUz}
                                </span>

                                {product.matchedReason && (
                                  <span className="text-[10px] font-semibold bg-accent-light text-accent px-1.5 py-0.5 rounded">
                                    {product.matchedReason}
                                  </span>
                                )}

                                {/* Color Swatches preview if available */}
                                {colorVariants.length > 1 && (
                                  <div className="hidden sm:flex items-center gap-1 ml-1">
                                    {colorVariants.slice(0, 4).map((v) => (
                                      <span
                                        key={v.id}
                                        className="w-2.5 h-2.5 rounded-full border border-border inline-block shadow-xs"
                                        style={{ backgroundColor: v.colorHex }}
                                        title={locale === 'ru' ? v.colorNameRu || v.nameRu : v.colorNameUz || v.nameUz}
                                      />
                                    ))}
                                    {colorVariants.length > 4 && (
                                      <span className="text-[9px] text-muted font-bold">
                                        +{colorVariants.length - 4}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Price & Action Column */}
                            <div className="text-right flex-shrink-0 flex flex-col items-end justify-center">
                              {price > 0 && (
                                <div className="font-black text-accent text-xs sm:text-sm">
                                  {formatPrice(price, locale)}
                                  {product.unitType && (
                                    <span className="text-[10px] text-muted font-medium ml-1">
                                      /{product.unitType === 'meter' ? (locale === 'ru' ? 'м' : 'm') : product.unitType === 'sheet' ? (locale === 'ru' ? 'лист' : 'list') : (locale === 'ru' ? 'шт' : 'dona')}
                                    </span>
                                  )}
                                </div>
                              )}

                              {wholesalePrice && wholesalePrice < price && (
                                <div className="text-[10px] font-bold text-muted mt-0.5">
                                  <span className="text-accent">{locale === 'ru' ? 'Оптом:' : 'Optom:'}</span>{' '}
                                  {formatPrice(wholesalePrice, locale)}
                                </div>
                              )}

                              {oldPrice && oldPrice > price && (
                                <div className="text-[10px] text-muted/60 line-through">
                                  {formatPrice(oldPrice, locale)}
                                </div>
                              )}

                              {/* Keyboard Navigation Indicator */}
                              {isNavActive && (
                                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-accent bg-accent-light px-1.5 py-0.5 rounded mt-1">
                                  <CornerDownLeft className="w-3 h-3" />
                                  <span>{locale === 'ru' ? 'Перейти' : 'Ochish'}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Categories & Collections Section */}
                {(filteredCategories.length > 0 || filteredCollections.length > 0) && (
                  <div className="pt-4 space-y-4">
                    {filteredCategories.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-black text-muted uppercase tracking-wider flex items-center gap-2 px-1">
                          <span>{locale === 'ru' ? 'Категории' : 'Kategoriyalar'}</span>
                          <span className="text-[10px] bg-secondary text-muted px-2 py-0.5 rounded-full font-bold">
                            {filteredCategories.length}
                          </span>
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {filteredCategories.map((cat) => {
                            const navIndex = navigableItems.findIndex(
                              (item) => item.type === 'category' && item.id === cat.id
                            );
                            const isNavActive = activeIndex === navIndex;

                            return (
                              <button
                                key={cat.id}
                                data-nav-index={navIndex}
                                onClick={() => handleSelectCategory(cat.slug)}
                                onMouseEnter={() => setActiveIndex(navIndex)}
                                className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition text-left ${
                                  isNavActive
                                    ? 'bg-accent-light/50 border-accent shadow-xs'
                                    : 'bg-secondary/40 hover:bg-secondary border-border hover:border-accent/40'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center text-accent flex-shrink-0">
                                    <Tag className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-heading truncate">
                                      <Highlighted
                                        text={locale === 'ru' ? cat.nameRu : cat.nameUz}
                                        query={q}
                                      />
                                    </p>
                                    <p className="text-[10px] text-muted font-medium truncate">
                                      {locale === 'ru' ? 'Перейти в каталог' : 'Katalogga o‘tish'}
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted flex-shrink-0 ml-2" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {filteredCollections.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-black text-muted uppercase tracking-wider flex items-center gap-2 px-1">
                          <span>{locale === 'ru' ? 'Подборки' : 'To‘plamlar'}</span>
                          <span className="text-[10px] bg-secondary text-muted px-2 py-0.5 rounded-full font-bold">
                            {filteredCollections.length}
                          </span>
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {filteredCollections.map((col) => {
                            const navIndex = navigableItems.findIndex(
                              (item) => item.type === 'collection' && item.id === col.id
                            );
                            const isNavActive = activeIndex === navIndex;

                            return (
                              <button
                                key={col.id}
                                data-nav-index={navIndex}
                                onClick={() => handleSelectCollection(col.slug)}
                                onMouseEnter={() => setActiveIndex(navIndex)}
                                className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition text-left ${
                                  isNavActive
                                    ? 'bg-accent-light/50 border-accent shadow-xs'
                                    : 'bg-secondary/40 hover:bg-secondary border-border hover:border-accent/40'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center text-accent flex-shrink-0">
                                    <Sparkles className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-heading truncate">
                                      <Highlighted text={col.name} query={q} />
                                    </p>
                                    <p className="text-[10px] text-muted font-medium truncate">
                                      {locale === 'ru' ? col.descriptionRu : col.descriptionUz}
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted flex-shrink-0 ml-2" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 5. NO RESULTS / EMPTY STATE */}
            {q.length >= 2 && !loading && !failed && !searchPending && hasLoadedQuery && totalRawMatches === 0 && (
              <div className="py-10 px-4 sm:px-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary mx-auto flex items-center justify-center border border-border">
                  <SearchX className="w-7 h-7 text-muted" />
                </div>

                <div className="space-y-1 max-w-md mx-auto">
                  <p className="font-black text-heading text-sm sm:text-base">
                    {locale === 'ru'
                      ? `По запросу «${q}» ничего не найдено`
                      : `«${q}» bo‘yicha hech narsa topilmadi`}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {locale === 'ru'
                      ? 'Проверьте написание артикула (SKU) или попробуйте общее название материала (велюр, поролон, клей).'
                      : 'Artikul (SKU) to‘g‘riligini tekshiring yoki materialning umumiy nomini kiriting (velyur, paralon, yelim).'}
                  </p>
                </div>

                {/* Suggestions if any */}
                {results.suggestions && results.suggestions.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                      {locale === 'ru' ? 'Возможно, вы искали:' : 'Balki siz buni qidirgandirsiz:'}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {results.suggestions.map((sug) => (
                        <button
                          key={sug}
                          onClick={() => setQuery(sug)}
                          className="px-3 py-1 bg-secondary hover:bg-accent-light hover:text-accent border border-border rounded-xl text-xs font-bold transition"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      router.push(`/${locale}/catalog`);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-accent hover:bg-accent-hover text-surface text-xs font-bold rounded-xl shadow-brand-sm transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{locale === 'ru' ? 'Открыть каталог' : 'Katalogni ochish'}</span>
                  </button>

                  {contactLink && (
                    <a
                      href={contactLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-secondary hover:bg-border text-heading text-xs font-bold rounded-xl border border-border transition"
                    >
                      <Send className="w-3.5 h-3.5 text-accent" />
                      <span>{locale === 'ru' ? 'Спросить менеджера' : 'Menejerdan so‘rash'}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar with Keyboard Navigation Hints & Catalog Link */}
          <div className="p-3 sm:p-3.5 bg-secondary/80 border-t border-border flex flex-wrap gap-2 justify-between items-center text-xs text-muted">
            <div className="hidden sm:flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border font-mono font-bold text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border font-mono font-bold text-[10px]">↓</kbd>{' '}
                {locale === 'ru' ? 'навигация' : 'harakatlanish'}
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border font-mono font-bold text-[10px]">↵</kbd>{' '}
                {locale === 'ru' ? 'выбрать' : 'tanlash'}
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border font-mono font-bold text-[10px]">ESC</kbd>{' '}
                {locale === 'ru' ? 'закрыть' : 'yopish'}
              </span>
            </div>

            <button
              onClick={handleOpenCatalogResults}
              className="inline-flex items-center gap-1.5 font-black text-accent hover:underline ml-auto text-xs"
            >
              <span>
                {locale === 'ru'
                  ? `Все результаты в каталоге ${totalRawMatches > 0 ? `(${totalRawMatches})` : ''}`
                  : `Barcha natijalar katalogda ${totalRawMatches > 0 ? `(${totalRawMatches})` : ''}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
