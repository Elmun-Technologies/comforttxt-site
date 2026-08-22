'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link, usePathname, useRouter } from '@/lib/i18n/navigation';
import {
  Phone,
  Clock,
  Globe,
  ShoppingBag,
  Heart,
  Scale,
  Menu,
  User,
  ShieldCheck,
  Package,
  Search,
  ChevronDown,
} from 'lucide-react';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useAuthStore } from '@/store/useAuthStore';
import { topUtilityLinks, mainNavCategories } from '@/data/navigation';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalCartItems = useCartStore((s) => s.getTotalItems());
  const favoriteCount = useFavoritesStore((s) => s.productIds.length);
  const compareCount = useCompareStore((s) => s.items.length);
  const { user, isB2B } = useAuthStore();
  const b2bActive = isB2B();

  const switchLocale = (newLocale: string) => {
    // next-intl usePathname already gives the pathname WITHOUT the locale prefix!
    // So if URL is /uz/catalog?color=beige, pathname is /catalog
    const search = searchParams.toString();
    const query = search ? `?${search}` : '';
    
    // We can use router.replace with { pathname, query } in next-intl
    router.replace(`${pathname}${query}`, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
      {/* Top Utility Bar */}
      <div className="bg-secondary/50 text-muted text-xs py-1.5 px-4 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a
              href="tel:+998712008899"
              className="inline-flex items-center gap-1.5 hover:text-surface transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>+998 (71) 200-88-99</span>
            </a>
            <span className="hidden md:inline text-border">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-muted">
              <Clock className="w-3.5 h-3.5" />
              <span>{locale === 'ru' ? 'Пн-Сб: 09:00 - 18:00' : 'Dush-Shan: 09:00 - 18:00'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Nav links */}
            <div className="hidden lg:flex items-center gap-3">
              {topUtilityLinks.map((link, idx) => (
                <Link key={idx} href={link.href} className="hover:text-surface transition text-[11px]">
                  {locale === 'ru' ? link.labelRu : link.labelUz}
                </Link>
              ))}
            </div>

            {/* B2B Status Indicator */}
            {b2bActive ? (
              <span className="inline-flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
                <ShieldCheck className="w-3 h-3" />
                B2B {user?.companyName || 'Partner'}
              </span>
            ) : (
              <Link
                href="/wholesale"
                className="text-surface hover:text-accent font-bold text-[11px] bg-accent/20 px-2 py-0.5 rounded border border-accent/40 transition"
              >
                {locale === 'ru' ? 'Опт B2B' : 'Ulgurji B2B'}
              </Link>
            )}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-surface p-0.5 rounded-md border border-border shadow-sm">
              <Globe className="w-3 h-3 text-muted ml-1" />
              <button
                onClick={() => switchLocale('uz')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                  locale === 'uz' ? 'bg-accent text-surface' : 'text-muted hover:text-surface'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => switchLocale('ru')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                  locale === 'ru' ? 'bg-accent text-surface' : 'text-muted hover:text-surface'
                }`}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-heading hover:bg-secondary/80 rounded-xl transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-[0_2px_10px_rgba(197,160,89,0.3)]">
            <Package className="w-5 h-5 text-surface" />
          </div>
          <div>
            <div className="text-xl font-black text-heading tracking-tight leading-none">
              COMFORT <span className="text-accent">TXT</span>
            </div>
            <div className="text-[10px] font-bold text-muted tracking-wider uppercase mt-0.5">
              {locale === 'ru' ? 'Мебельные материалы' : 'Mebel materiallari'}
            </div>
          </div>
        </Link>

        {/* Quick Search Bar Trigger (Desktop) */}
        <div className="hidden lg:block flex-1 max-w-xl px-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full pl-4 pr-10 py-2 bg-secondary hover:bg-surface border border-border focus:border-accent rounded-xl text-xs font-medium text-muted flex items-center justify-between shadow-xs transition"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted" />
              <span>
                {locale === 'ru'
                  ? 'Поиск ткани, поролона, SKU (LUNA-01, ST2536)...'
                  : 'Mato, paralon, SKU (LUNA-01, ST2536) qidirish...'}
              </span>
            </span>
            <kbd className="px-2 py-0.5 bg-surface rounded border border-border text-[10px] font-mono">⌘K</kbd>
          </button>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="lg:hidden p-2 text-heading hover:bg-secondary rounded-xl transition"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account */}
          <Link
            href={user ? `/account` : `/wholesale`}
            className="p-2 text-heading hover:text-accent rounded-xl hover:bg-secondary transition hidden sm:block"
            title="Account"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Compare */}
          <Link
            href="/compare"
            className="relative p-2 text-heading hover:text-accent rounded-xl hover:bg-secondary transition hidden sm:block"
            title="Compare"
          >
            <Scale className="w-5 h-5" />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-surface text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </Link>

          {/* Favorites */}
          <Link
            href="/favorites"
            className="relative p-2 text-heading hover:text-accent rounded-xl hover:bg-secondary transition hidden sm:block"
            title="Favorites"
          >
            <Heart className="w-5 h-5" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-surface text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface px-3.5 py-2 rounded-xl shadow-xs transition"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-bold hidden sm:inline">
              {locale === 'ru' ? 'Корзина' : 'Savatcha'}
            </span>
            {totalCartItems > 0 && (
              <span className="bg-surface text-accent text-xs font-black px-1.5 py-0.5 rounded-full shadow-xs">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Bar & MegaMenu */}
      <div className="bg-surface/50 backdrop-blur-md text-heading border-t border-border hidden lg:block relative">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* MegaMenu Trigger */}
          <div className="relative" onMouseEnter={() => setMegaMenuOpen(true)}>
            <button className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface font-semibold text-xs uppercase tracking-widest px-6 py-3.5 transition">
              <Menu className="w-4 h-4" />
              <span>{locale === 'ru' ? 'Категории товаров' : 'Mahsulot Kategoriyalari'}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Nav Categories Links */}
          <nav className="flex items-center space-x-1">
            {mainNavCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="px-4 py-3 text-xs font-bold hover:text-accent transition uppercase tracking-wider"
              >
                {locale === 'ru' ? cat.labelRu : cat.labelUz}
              </Link>
            ))}
          </nav>

          <div className="text-xs text-accent font-bold">
            ⚡ {locale === 'ru' ? 'Быстрая доставка по Узб' : 'O\'zbekiston bo\'ylab tezkor yetkazish'}
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {megaMenuOpen && <MegaMenu locale={locale} onClose={() => setMegaMenuOpen(false)} />}
      </div>

      {/* Overlays */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} locale={locale} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} locale={locale} />
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        cartCount={totalCartItems}
        favoriteCount={favoriteCount}
        locale={locale}
        switchLocale={switchLocale}
      />
    </header>
  );
}
