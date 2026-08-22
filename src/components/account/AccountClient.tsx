'use client';

import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { User, ShoppingBag, Heart, RefreshCw, ShieldCheck, LogOut } from 'lucide-react';

interface AccountClientProps {
  locale: string;
  currentUser?: any;
  initialOrders?: any[];
}

export function AccountClient({ locale, currentUser, initialOrders = [] }: AccountClientProps) {
  const { user, isB2B, logout } = useAuthStore();
  const b2bActive = isB2B() || currentUser?.b2bApproved;

  const displayUser = currentUser || user || {
    name: 'Javohir Toshpulotov',
    email: 'customer@gmail.com',
    phone: '+998 90 123 45 67',
  };

  return (
    <div className="space-y-8">
      <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-accent-light text-accent rounded-2xl flex items-center justify-center font-black text-xl">
            {displayUser.firstName ? displayUser.firstName.charAt(0) : (displayUser.name?.charAt(0) || 'U')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-heading">
                {displayUser.firstName ? `${displayUser.firstName} ${displayUser.lastName || ''}` : displayUser.name}
              </h1>
              {b2bActive && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md">
                  B2B {displayUser.companyName || 'Hamkor'}
                </span>
              )}
            </div>
            <p className="text-xs text-muted font-mono mt-0.5">
              {displayUser.phone} • {displayUser.email}
            </p>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {currentUser || user ? (
            <button
              onClick={logout}
              className="px-4 py-2.5 bg-secondary hover:bg-border text-heading text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4 text-accent" />
              <span>{locale === 'ru' ? 'Выйти' : 'Chiqish'}</span>
            </button>
          ) : (
            <Link
              href={`/${locale}/wholesale`}
              className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-surface text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === 'ru' ? 'Войти B2B' : 'B2B Sifatida Kirish'}</span>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-xs space-y-1">
          <Link
            href={`/${locale}/account`}
            className="px-4 py-3 rounded-xl bg-accent text-surface text-xs font-bold flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>{locale === 'ru' ? 'Обзор кабинета' : 'Kabinet xulosasi'}</span>
          </Link>
          <Link
            href={`/${locale}/account`}
            className="px-4 py-3 rounded-xl text-body hover:bg-secondary text-xs font-bold flex items-center gap-2 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{locale === 'ru' ? 'История заказов' : 'Buyurtmalar tarixi'}</span>
          </Link>
          <Link
            href={`/${locale}/favorites`}
            className="px-4 py-3 rounded-xl text-body hover:bg-secondary text-xs font-bold flex items-center gap-2 transition"
          >
            <Heart className="w-4 h-4" />
            <span>{locale === 'ru' ? 'Избранные товары' : 'Saralanganlar'}</span>
          </Link>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-black text-heading">
            {locale === 'ru' ? 'Мои Заказы' : 'Mening Buyurtmalarim'}
          </h2>

          {initialOrders.length === 0 ? (
            <div className="bg-surface p-8 rounded-2xl border border-border text-center text-muted text-sm">
              {locale === 'ru' ? 'У вас пока нет заказов' : 'Hozircha buyurtmalar mavjud emas'}
            </div>
          ) : (
            <div className="space-y-4">
              {initialOrders.map((ord) => (
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
                        <RefreshCw className="w-3.5 h-3.5 text-accent" />
                        <span>Qayta buyurtma</span>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-body font-medium">
                    {ord.items.map((item: string, idx: number) => (
                      <div key={idx}>• {item}</div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border flex justify-between items-center text-xs">
                    <span className="text-muted font-medium">{locale === 'ru' ? 'Итого:' : 'Jami summa:'}</span>
                    <span className="text-sm font-black text-heading">{ord.total.toLocaleString()} so'm</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
