'use client';

import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice, formatUnit } from '@/lib/formatters';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { MissingImage } from '@/components/product/MissingImage';

interface CartClientProps {
  locale: string;
}

export function CartClient({ locale }: CartClientProps) {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const { isB2B } = useAuthStore();
  const b2bActive = isB2B();

  const subtotal = getSubtotal(b2bActive);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-black text-heading tracking-tight">
          {locale === 'ru' ? 'Корзина Покупок' : 'Savatcha'}
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-muted hover:text-accent font-bold transition flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>{locale === 'ru' ? 'Очистить корзину' : 'Savatchani tozalash'}</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-surface rounded-2xl p-12 text-center border border-border shadow-xs my-8 space-y-4 max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 text-muted mx-auto stroke-1" />
          <h2 className="text-xl font-bold text-heading">
            {locale === 'ru' ? 'Ваша корзина пуста' : 'Savatchangiz bo\'sh'}
          </h2>
          <p className="text-xs text-muted">
            {locale === 'ru'
              ? 'Выберите товары из нашего каталога для дальнейшего оформления.'
              : 'Buyurtma rasmiylashtirish uchun katalogimizdan mahsulotlarni tanlang.'}
          </p>
          <Link
            href={`/${locale}/catalog`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-surface font-bold text-xs rounded-xl shadow-xs transition"
          >
            <span>{locale === 'ru' ? 'В каталог' : 'Katalogga o\'tish'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {b2bActive && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>B2B Ulgurji narxlar amal qilmoqda</span>
              </div>
            )}

            <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs divide-y divide-border">
              {items.map((item) => {
                const effectivePrice = b2bActive ? item.wholesalePrice : item.price;
                const unitLabel = formatUnit(item.unitType, locale);

                return (
                  <div key={item.variantId} className="p-4 flex items-center gap-4 sm:gap-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-border flex-shrink-0 overflow-hidden bg-secondary">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <MissingImage locale={locale} compact />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-heading line-clamp-1">
                          {item.productTitle}
                        </h3>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-muted hover:text-accent p-1 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-muted font-mono">
                        SKU: {item.sku} • {item.variantName}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex items-center bg-secondary border border-border rounded-xl">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - item.minQtyStep)}
                            className="p-1.5 hover:bg-border text-body rounded-l-xl transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-black text-heading min-w-[45px] text-center">
                            {item.quantity} {unitLabel}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + item.minQtyStep)}
                            className="p-1.5 hover:bg-border text-body rounded-r-xl transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-black text-accent">
                            {formatPrice(effectivePrice * item.quantity, locale)}
                          </div>
                          <div className="text-[10px] text-muted font-medium">
                            {formatPrice(effectivePrice, locale)} / {unitLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface p-6 rounded-2xl border border-border shadow-md space-y-4 sticky top-24">
              <h2 className="text-lg font-black text-heading border-b border-border pb-3">
                {locale === 'ru' ? 'Итого Заказа' : 'Buyurtma Xulosasi'}
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted font-medium">
                  <span>{locale === 'ru' ? 'Товары:' : 'Mahsulotlar:'}</span>
                  <span className="font-bold text-heading">{formatPrice(subtotal, locale)}</span>
                </div>
                <div className="flex justify-between text-muted font-medium">
                  <span>{locale === 'ru' ? 'Доставка:' : 'Yetkazish:'}</span>
                  <span className="font-bold text-emerald-700">{locale === 'ru' ? 'Расчет менежера' : 'Menejer hisoblaydi'}</span>
                </div>
                <div className="flex justify-between text-base font-black text-heading pt-3 border-t border-border">
                  <span>{locale === 'ru' ? 'Итого:' : 'Jami:'}</span>
                  <span className="text-accent">{formatPrice(subtotal, locale)}</span>
                </div>
              </div>

              <Link
                href={`/${locale}/checkout`}
                className="w-full py-4 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <span>{locale === 'ru' ? 'Перейти к оформлению' : 'Rasmiylashtirishga o\'tish'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
