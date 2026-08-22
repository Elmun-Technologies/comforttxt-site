'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { formatPrice, formatUnit } from '@/lib/formatters';
import { normalizeUzPhone } from '@/lib/utils/phone';
import { User, Phone, MapPin, Truck, CreditCard, ShieldCheck, Loader2, ArrowRight, ShoppingBag, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface CheckoutFormProps {
  locale: string;
}

export function CheckoutForm({ locale }: CheckoutFormProps) {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { user, isB2B } = useAuthStore();
  const b2bActive = isB2B();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+998 ');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentType, setPaymentType] = useState<'cash' | 'bank_transfer'>('cash');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addToast = useToastStore((s) => s.addToast);
  const subtotal = getSubtotal(b2bActive);

  if (items.length === 0) {
    return (
      <div className="bg-surface rounded-2xl p-12 text-center border border-border shadow-xs max-w-lg mx-auto my-12 space-y-4">
        <ShoppingBag className="w-16 h-16 text-muted mx-auto stroke-1" />
        <h2 className="text-xl font-bold text-heading">
          {locale === 'ru' ? 'Ваша корзина пуста' : 'Savatchangiz bo\'sh'}
        </h2>
        <p className="text-xs text-muted">
          {locale === 'ru'
            ? 'Для оформления заказа добавьте хотя бы один товар в корзину.'
            : 'Buyurtma rasmiylashtirish uchun savatchaga kamida bitta mahsulot qo\'shing.'}
        </p>
        <Link
          href={`/${locale}/catalog`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-surface font-bold text-xs rounded-xl shadow-xs transition"
        >
          <span>{locale === 'ru' ? 'Перейти в каталог' : 'Katalogga o\'tish'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const normalized = normalizeUzPhone(phone);
    if (!name.trim()) {
      setErrorMessage(locale === 'ru' ? 'Пожалуйста, укажите ваше имя' : 'Iltimos, ismingizni kiriting');
      return;
    }
    if (!normalized || normalized.length < 12) {
      setErrorMessage(locale === 'ru' ? 'Укажите правильный номер телефона (+998)' : 'To\'g\'ri telefon raqami kiriting (+998)');
      return;
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      setErrorMessage(locale === 'ru' ? 'Пожалуйста, укажите адрес доставки' : 'Iltimos, yetkazib berish manzilini kiriting');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: name.trim(),
          guestPhone: normalized,
          deliveryMethod: deliveryType === 'delivery' ? 'COURIER' : 'PICKUP',
          deliveryAddress: deliveryType === 'delivery' ? address.trim() : 'Pickup',
          paymentMethod: paymentType === 'cash' ? 'CASH' : 'BANK_TRANSFER',
          comment: notes.trim(),
          items: items.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'Buyurtma yaratishda xatolik yuz berdi');
      }

      clearCart();
      addToast(locale === 'ru' ? 'Заказ успешно оформлен!' : 'Buyurtma muvaffaqiyatli rasmiylashtirildi!', 'success');
      router.push(`/${locale}/order-success/${data.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Xatolik yuz berdi');
      addToast(err.message || 'Xatolik yuz berdi', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 cols: Checkout Steps */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-black text-heading tracking-tight">
          {locale === 'ru' ? 'Оформление Заказа' : 'Buyurtmani Rasmiylashtirish'}
        </h1>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Contact Details */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-heading border-b border-border pb-3">
            <User className="w-5 h-5 text-accent" />
            <span>{locale === 'ru' ? '1. Контактная Информация' : '1. Aloqa Ma\'lumotlari'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-heading">
                {locale === 'ru' ? 'Имя и Фамилия' : 'Ism va Familiya'} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'ru' ? 'Иван Иванов' : 'Otabek Rixsiyev'}
                className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-heading">
                {locale === 'ru' ? 'Номер телефона' : 'Telefon raqami'} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm font-semibold focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Delivery Method */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-heading border-b border-border pb-3">
            <Truck className="w-5 h-5 text-accent" />
            <span>{locale === 'ru' ? '2. Способ Доставки' : '2. Yetkazib Berish Turi'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryType('delivery')}
              className={`p-4 rounded-xl border text-left transition flex items-start gap-3 ${
                deliveryType === 'delivery'
                  ? 'border-accent bg-accent-light text-accent ring-2 ring-accent/20'
                  : 'border-border bg-secondary text-body hover:bg-border'
              }`}
            >
              <Truck className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <div className="text-xs font-bold text-heading">
                  {locale === 'ru' ? 'Доставка курьером' : 'Kuryer orqali yetkazib berish'}
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  {locale === 'ru' ? 'Ташкент и регионы (1-2 дня)' : 'Toshkent va viloyatlarga (1-2 kun)'}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryType('pickup')}
              className={`p-4 rounded-xl border text-left transition flex items-start gap-3 ${
                deliveryType === 'pickup'
                  ? 'border-accent bg-accent-light text-accent ring-2 ring-accent/20'
                  : 'border-border bg-secondary text-body hover:bg-border'
              }`}
            >
              <MapPin className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <div className="text-xs font-bold text-heading">
                  {locale === 'ru' ? 'Самовывоз со склада' : 'Ombordan olib ketish (Self-pickup)'}
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  {locale === 'ru' ? 'Сергели, МКАД, 42' : 'Sergeli, Kichik halqa yo\'li, 42'}
                </div>
              </div>
            </button>
          </div>

          {deliveryType === 'delivery' && (
            <div className="space-y-1 pt-2">
              <label className="text-xs font-bold text-heading">
                {locale === 'ru' ? 'Адрес доставки' : 'Yetkazib berish manzili'} *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={
                  locale === 'ru'
                    ? 'Город, район, улица, дом / цех'
                    : 'Toshkent sh., Sergeli t., Sanoat zonasi, 4-bino'
                }
                className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
              />
            </div>
          )}
        </div>

        {/* Step 3: Payment Method */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-heading border-b border-border pb-3">
            <CreditCard className="w-5 h-5 text-accent" />
            <span>{locale === 'ru' ? '3. Способ Оплаты' : '3. To\'lov Turi'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPaymentType('cash')}
              className={`p-3.5 rounded-xl border text-left transition ${
                paymentType === 'cash'
                  ? 'border-accent bg-accent-light text-accent font-bold ring-2 ring-accent/20'
                  : 'border-border bg-secondary text-body'
              }`}
            >
              <div className="text-xs font-bold">{locale === 'ru' ? 'Наличными / Карта' : 'Naqd pul / Karta'}</div>
              <div className="text-[10px] text-muted font-normal mt-0.5">
                {locale === 'ru' ? 'При получении' : 'Qabul qilishda'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentType('bank_transfer')}
              className={`p-3.5 rounded-xl border text-left transition ${
                paymentType === 'bank_transfer'
                  ? 'border-accent bg-accent-light text-accent font-bold ring-2 ring-accent/20'
                  : 'border-border bg-secondary text-body'
              }`}
            >
              <div className="text-xs font-bold">{locale === 'ru' ? 'Банковский перевод' : 'Bank o\'tkazmasi'}</div>
              <div className="text-[10px] text-muted font-normal mt-0.5">
                {locale === 'ru' ? 'B2B Счет-фактура' : 'B2B Shartnoma'}
              </div>
            </button>

            {/* Click / Payme Online - Disabled badge 'Tez orada' */}
            <div className="p-3.5 rounded-xl border border-border bg-secondary/50 opacity-60 relative cursor-not-allowed">
              <div className="flex justify-between items-center">
                <div className="text-xs font-bold text-muted">Click / Payme</div>
                <span className="bg-border text-muted text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {locale === 'ru' ? 'Скоро' : 'Tez orada'}
                </span>
              </div>
              <div className="text-[10px] text-muted mt-0.5">Online integratsiya</div>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-heading">
              {locale === 'ru' ? 'Комментарий к заказу' : 'Buyurtmaga izoh'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={locale === 'ru' ? 'Дополнительные пожелания' : 'Ertalab soat 10:00 da keltiring'}
              className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Right Column: Summary Card */}
      <div className="space-y-6">
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-md space-y-4 sticky top-24">
          <h2 className="text-lg font-black text-heading border-b border-border pb-3">
            {locale === 'ru' ? 'Ваш Заказ' : 'Sizning Buyurtmangiz'}
          </h2>

          {b2bActive && (
            <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{locale === 'ru' ? 'B2B Оптовые цены применены' : 'B2B Ulgurji narxlar amal qilmoqda'}</span>
            </div>
          )}

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-border">
            {items.map((item) => {
              const priceToUse = b2bActive ? item.wholesalePrice : item.price;
              const unitLabel = formatUnit(item.unitType, locale);

              return (
                <div key={item.variantId} className="flex items-center gap-3 text-xs py-2">
                  <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-lg border border-border flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-heading truncate">{item.productTitle}</div>
                    <div className="text-[11px] text-muted font-mono">SKU: {item.sku}</div>
                    <div className="text-[11px] text-muted font-semibold">
                      {item.quantity} {unitLabel} x {formatPrice(priceToUse, locale)}
                    </div>
                  </div>
                  <div className="font-black text-accent">
                    {formatPrice(priceToUse * item.quantity, locale)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-muted">
              <span>{locale === 'ru' ? 'Товары:' : 'Mahsulotlar:'}</span>
              <span className="font-bold text-heading">{formatPrice(subtotal, locale)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>{locale === 'ru' ? 'Доставка:' : 'Yetkazish:'}</span>
              <span className="font-bold text-emerald-700">{locale === 'ru' ? 'Расчет менеджера' : 'Menejer hisoblaydi'}</span>
            </div>
            <div className="flex justify-between text-base font-black text-heading pt-2 border-t border-border">
              <span>{locale === 'ru' ? 'Итого:' : 'Jami:'}</span>
              <span className="text-accent">{formatPrice(subtotal, locale)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{locale === 'ru' ? 'Подтвердить Заказ' : 'Buyurtmani Tasdiqlash'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
