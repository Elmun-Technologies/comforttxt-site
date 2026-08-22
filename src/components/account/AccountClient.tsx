'use client';

import Link from 'next/link';
import { User, ShoppingBag, Heart, ShieldCheck, PackageOpen, ArrowRight } from 'lucide-react';

interface AccountClientProps {
  locale: string;
  currentUser?: any;
  initialOrders?: any[];
}

/**
 * Customer account preview.
 * No fake user names, companies, B2B tiers or orders are shown by default —
 * ShopFlow will populate real customer data later. Until then the account
 * shows a clean, honest empty state.
 */
export function AccountClient({ locale, currentUser, initialOrders = [] }: AccountClientProps) {
  const displayUser = currentUser || null;
  const orders = initialOrders || [];

  return (
    <div className="space-y-8">
      <div className="brand-wash relative overflow-hidden bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div
          aria-hidden="true"
          className="pattern-rings pattern-fade absolute inset-0 pointer-events-none"
        />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 bg-accent-light text-accent rounded-2xl flex items-center justify-center font-black text-xl">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-heading">
              {displayUser?.name || (locale === 'ru' ? 'Личный кабинет' : 'Shaxsiy kabinet')}
            </h1>
            {displayUser ? (
              <p className="text-xs text-muted font-mono mt-0.5">
                {displayUser.phone}
                {displayUser.email ? ` • ${displayUser.email}` : ''}
              </p>
            ) : (
              <p className="text-xs text-muted mt-0.5">
                {locale === 'ru'
                  ? 'Заказы и история появятся после подключения ShopFlow'
                  : 'Buyurtmalar va tarix ShopFlow ulangach paydo bo‘ladi'}
              </p>
            )}
          </div>
        </div>

        <Link
          href={`/${locale}/wholesale`}
          className="relative px-4 py-2.5 bg-accent hover:bg-accent-hover text-surface text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{locale === 'ru' ? 'Оптовые условия (B2B)' : 'Ulgurji shartlar (B2B)'}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-xs space-y-1">
          <div className="px-4 py-3 rounded-xl bg-accent text-surface text-xs font-bold flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{locale === 'ru' ? 'Обзор кабинета' : 'Kabinet xulosasi'}</span>
          </div>
          <div className="px-4 py-3 rounded-xl text-body text-xs font-bold flex items-center gap-2 opacity-60 cursor-not-allowed">
            <ShoppingBag className="w-4 h-4" />
            <span>{locale === 'ru' ? 'История заказов' : 'Buyurtmalar tarixi'}</span>
          </div>
          <Link
            href={`/${locale}/favorites`}
            className="px-4 py-3 rounded-xl text-body hover:bg-secondary text-xs font-bold flex items-center gap-2 transition"
          >
            <Heart className="w-4 h-4" />
            <span>{locale === 'ru' ? 'Избранные товары' : 'Tanlanganlar'}</span>
          </Link>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-black text-heading">
            {locale === 'ru' ? 'Мои заказы' : 'Mening buyurtmalarim'}
          </h2>

          {orders.length === 0 ? (
            <div className="bg-surface p-10 rounded-2xl border border-border text-center space-y-4">
              <PackageOpen className="w-14 h-14 text-muted/60 mx-auto stroke-1" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-heading">
                  {locale === 'ru' ? 'Заказов пока нет' : 'Hozircha buyurtmalar yo‘q'}
                </h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  {locale === 'ru'
                    ? 'Оформленные заказы будут отображаться здесь. Пока вы можете выбрать материалы в каталоге.'
                    : 'Rasmiylashtirilgan buyurtmalar shu yerda ko‘rinadi. Hozircha katalogdan materiallarni tanlashingiz mumkin.'}
                </p>
              </div>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow transition"
              >
                <span>{locale === 'ru' ? 'Перейти в каталог' : 'Katalogga o‘tish'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord: any) => (
                <div
                  key={ord.id}
                  className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                    <div>
                      <div className="text-sm font-black text-accent font-mono">{ord.number}</div>
                      <div className="text-xs text-muted font-medium">{ord.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                        {ord.status}
                      </span>
                      <Link
                        href={`/${locale}/catalog`}
                        className="px-3 py-1.5 bg-secondary hover:bg-border text-heading text-xs font-bold rounded-xl transition inline-flex items-center gap-1"
                      >
                        <span>{locale === 'ru' ? 'Повторить заказ' : 'Qayta buyurtma'}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-body font-medium">
                    {ord.items?.map((item: string, idx: number) => (
                      <div key={idx}>• {item}</div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border flex justify-between items-center text-xs">
                    <span className="text-muted font-medium">{locale === 'ru' ? 'Итого:' : 'Jami summa:'}</span>
                    <span className="text-sm font-black text-heading">{ord.total?.toLocaleString()} so'm</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-[11px] text-muted">
            {locale === 'ru'
              ? 'Данные кабинета будут подключены к ShopFlow после запуска.'
              : 'Kabinet ma’lumotlari ShopFlow ulangach to‘ldiriladi.'}
          </p>
        </div>
      </div>
    </div>
  );
}
