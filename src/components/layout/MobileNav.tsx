'use client';

import { Link, usePathname, useRouter } from '@/lib/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { Home, Grid, Search, Heart, ShoppingBag, X, Phone, Globe, ShieldCheck } from 'lucide-react';
import { storefrontConfig } from '@/config/storefront';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { useOverlay } from '@/lib/hooks/useOverlay';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartCount: number;
  favoriteCount: number;
  locale: string;
  switchLocale: (loc: string) => void;
}

export function MobileNav({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenCart,
  cartCount,
  favoriteCount,
  locale,
  switchLocale,
}: MobileNavProps) {
  // The switchLocale prop is passed from Header, but MobileNav shouldn't need it as a prop
  // if we can just define it here to be consistent. Let's use the router directly.
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSwitchLocale = (newLocale: string) => {
    const search = searchParams.toString();
    const query = search ? `?${search}` : '';
    router.replace(`${pathname}${query}`, { locale: newLocale });
  };

  useOverlay(isOpen, onClose);

  const categories = [
    { labelUz: 'Mebel matolari', labelRu: 'Мебельные ткани', href: '/catalog/mebel-matolari' },
    { labelUz: 'Paralon (ST / EL / HR)', labelRu: 'Поролон (ST / EL / HR)', href: '/catalog/paralon' },
    { labelUz: 'Transformatsiya mexanizmlari', labelRu: 'Механизмы трансформации', href: '/catalog/mexanizmlar' },
    { labelUz: 'Furnitura va Oyoqlar', labelRu: 'Фурнитура и Ножки', href: '/catalog/furnitura-va-oyoqlar' },
    { labelUz: 'Instrumentlar va Sarf', labelRu: 'Инструменты и Расходники', href: '/catalog/sarf-materiallar-va-instrumentlar' },
  ];

  return (
    <>
      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-heading/60 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-surface shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="relative overflow-hidden p-4 border-b border-border flex justify-between items-center bg-charcoal-900 text-surface">
              <div
                aria-hidden="true"
                className="pattern-rings-dark pattern-sm pattern-fade absolute inset-0 pointer-events-none"
              />
              <div className="relative">
                <BrandLogo locale={locale} size="footer" />
              </div>
              <button
                onClick={onClose}
                aria-label={locale === 'ru' ? 'Закрыть меню' : 'Menyuni yopish'}
                className="relative p-1 text-surface/60 hover:text-surface transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Language Switcher */}
              <div className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                <span className="text-xs font-semibold text-muted flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {locale === 'ru' ? 'Язык' : 'Til'}
                </span>
                <div className="flex gap-1">
                  <button
                onClick={() => handleSwitchLocale('uz')}
                className={`flex-1 py-2 text-center rounded-xl text-sm font-bold transition ${
                  locale === 'uz' ? 'bg-accent text-surface' : 'bg-surface text-muted hover:text-heading'
                }`}
              >
                O'zbekcha
              </button>
              <button
                onClick={() => handleSwitchLocale('ru')}
                className={`flex-1 py-2 text-center rounded-xl text-sm font-bold transition ${
                  locale === 'ru' ? 'bg-accent text-surface' : 'bg-surface text-muted hover:text-heading'
                }`}
              >
                Русский
              </button>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider block px-2">
                  {locale === 'ru' ? 'Категории' : 'Kategoriyalar'}
                </span>
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.href}
                    onClick={onClose}
                    className="block px-3 py-2.5 text-xs font-bold text-heading hover:bg-secondary rounded-xl transition"
                  >
                    {locale === 'ru' ? cat.labelRu : cat.labelUz}
                  </Link>
                ))}
              </div>

              {/* Quick Services Links */}
              <div className="border-t border-border pt-4 space-y-2">
                <Link
                  href="/wholesale"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs font-bold text-accent hover:bg-accent-light rounded-xl transition flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{locale === 'ru' ? 'Оптовый B2B Portal' : 'Ulgurji B2B Portal'}</span>
                </Link>
                <Link
                  href="/sample-box"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs font-bold text-heading hover:bg-secondary rounded-xl transition"
                >
                  {locale === 'ru' ? 'Образцы (Sample Box)' : 'Mato Namunalari'}
                </Link>
                <Link
                  href="/blog"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs font-bold text-heading hover:bg-secondary rounded-xl transition"
                >
                  {locale === 'ru' ? 'Для мебельщиков' : 'Mebelchilar uchun'}
                </Link>
              </div>

              {/* Phone info — only if confirmed in storefrontConfig */}
              {storefrontConfig.phone && (
                <div className="p-3 bg-secondary rounded-xl text-xs space-y-1">
                  <div className="text-muted font-medium">{locale === 'ru' ? 'Телефон:' : 'Telefon:'}</div>
                  <a href={`tel:${storefrontConfig.phoneRaw}`} className="font-bold text-heading flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>{storefrontConfig.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Navigation Bar (Hidden on PDP if sticky bar active) */}
      {!pathname.includes('/product/') && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border shadow-lg lg:hidden py-1 px-2">
          <div className="grid grid-cols-5 text-center">
            <Link
              href="/"
              className={`flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold ${
                pathname === '/' ? 'text-accent' : 'text-muted'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span>{locale === 'ru' ? 'Главная' : 'Bosh'}</span>
            </Link>

            <Link
              href="/catalog"
              className={`flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold ${
                pathname.includes('/catalog') ? 'text-accent' : 'text-muted'
              }`}
            >
              <Grid className="w-5 h-5 mb-0.5" />
              <span>{locale === 'ru' ? 'Каталог' : 'Katalog'}</span>
            </Link>

            <button
              onClick={onOpenSearch}
              className="flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold text-muted"
            >
              <Search className="w-5 h-5 mb-0.5" />
              <span>{locale === 'ru' ? 'Поиск' : 'Qidiruv'}</span>
            </button>

            <Link
              href="/favorites"
              className="relative flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold text-muted"
            >
              <Heart className="w-5 h-5 mb-0.5" />
              <span>{locale === 'ru' ? 'Избранное' : 'Tanlanganlar'}</span>
              {favoriteCount > 0 && (
                <span className="absolute top-1 right-3 bg-accent text-surface text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <button
              onClick={onOpenCart}
              className="relative flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold text-muted"
            >
              <ShoppingBag className="w-5 h-5 mb-0.5" />
              <span>{locale === 'ru' ? 'Корзина' : 'Savatcha'}</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-3 bg-accent text-surface text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
