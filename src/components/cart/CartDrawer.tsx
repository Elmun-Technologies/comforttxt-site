'use client';

import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice, formatUnit } from '@/lib/formatters';
import Link from 'next/link';
import { useEffect } from 'react';
import { MissingImage } from '@/components/product/MissingImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export function CartDrawer({ isOpen, onClose, locale }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const { isB2B } = useAuthStore();
  const b2bActive = isB2B();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = getSubtotal(b2bActive);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-heading/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-secondary">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <h2 className="font-bold text-heading text-lg">
                {locale === 'ru' ? 'Корзина' : 'Savatcha'}
              </h2>
              <span className="bg-accent-light text-accent text-xs font-black px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-muted hover:text-heading rounded-xl hover:bg-border transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* B2B Badge Banner */}
          {b2bActive && (
            <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center gap-2 text-xs text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                {locale === 'ru'
                  ? 'B2B Оптовые цены применены к вашей корзине'
                  : 'B2B Ulgurji narxlar savatchangizga tatbiq etildi'}
              </span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted py-12">
                <ShoppingBag className="w-16 h-16 mb-4 text-muted/40 stroke-1" />
                <p className="text-heading font-bold text-base mb-1">
                  {locale === 'ru' ? 'Ваша корзина пуста' : 'Savatchangiz bo\'sh'}
                </p>
                <p className="text-xs text-muted max-w-xs mb-6">
                  {locale === 'ru'
                    ? 'Выберите ткани, поролон или механизмы из нашего каталога'
                    : 'Katalogimizdan mato, paralon va mexanizmlarni tanlang'}
                </p>
                <button
                  onClick={onClose}
                  className="bg-accent hover:bg-accent-hover text-surface text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition"
                >
                  {locale === 'ru' ? 'Перейти к покупкам' : 'Xaridlarni boshlash'}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const effectivePrice = b2bActive ? item.wholesalePrice : item.price;
                const unitLabel = formatUnit(item.unitType as string, locale);

                return (
                  <div
                    key={item.variantId as string}
                    className="flex gap-3 p-3 bg-secondary rounded-2xl border border-border hover:border-accent/30 transition"
                  >
                    <div className="w-16 h-16 rounded-xl border border-border flex-shrink-0 overflow-hidden bg-secondary">
                      {item.image ? (
                        <img
                          src={item.image as string}
                          alt={item.productTitle as string}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <MissingImage locale={locale} compact />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-heading line-clamp-1">
                            {item.productTitle}
                          </h4>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-muted hover:text-accent p-0.5 transition"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-muted font-mono mt-0.5">
                          SKU: {item.sku} • {item.variantName}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/50">
                        {/* Quantity Selector */}
                        <div className="flex items-center bg-surface border border-border rounded-lg shadow-xs">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.quantity - item.minQtyStep
                              )
                            }
                            className="p-1 hover:bg-secondary text-body rounded-l transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-heading min-w-[40px] text-center">
                            {item.quantity} {unitLabel}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.quantity + item.minQtyStep
                              )
                            }
                            className="p-1 hover:bg-secondary text-body rounded-r transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xs font-black text-accent">
                            {formatPrice(effectivePrice * item.quantity, locale)}
                          </div>
                          <div className="text-[10px] text-muted">
                            {formatPrice(effectivePrice, locale)} / {unitLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 border-t border-border bg-secondary space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted font-medium">
                  <span>{locale === 'ru' ? 'Количество позиций:' : 'Mahsulotlar soni:'}</span>
                  <span className="font-bold text-heading">{items.length}</span>
                </div>
                <div className="flex justify-between text-base font-black text-heading pt-1 border-t border-border">
                  <span>{locale === 'ru' ? 'Итого к оплате:' : 'Jami to\'lov:'}</span>
                  <span className="text-accent">{formatPrice(subtotal, locale)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-2.5 text-xs font-bold text-body hover:text-accent border border-border rounded-xl hover:bg-surface transition"
                >
                  {locale === 'ru' ? 'Очистить' : 'Tozalash'}
                </button>
                <Link
                  href={`/${locale}/checkout`}
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow-xs transition"
                >
                  <span>{locale === 'ru' ? 'Оформить' : 'Rasmiylashtirish'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
