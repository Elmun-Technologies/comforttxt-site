'use client';

import { useState } from 'react';
import { X, Zap, Phone, User, CheckCircle2, Loader2, Send } from 'lucide-react';
import { formatPrice, formatUnit } from '@/lib/formatters';
import { storefrontConfig } from '@/config/storefront';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  sku: string;
  price: number;
  unitType: string;
  minQtyStep: number;
  locale: string;
}

export function QuickOrderModal({
  isOpen,
  onClose,
  productTitle,
  sku,
  price,
  unitType,
  minQtyStep,
  locale,
}: QuickOrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [qty, setQty] = useState(minQtyStep);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length < 9) return;

    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/quick-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          productTitle,
          sku,
          quantity: qty,
          unitType,
          totalPrice: price * qty,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const telegramLink =
    storefrontConfig.telegramShortUrl || storefrontConfig.telegramChannelUrl || storefrontConfig.telegramBotOrManagerUrl || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-heading/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 border border-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-heading p-1 rounded-lg hover:bg-secondary"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold text-heading">
              {locale === 'ru' ? 'Заявка принята!' : 'So‘rov qabul qilindi!'}
            </h3>
            <p className="text-sm text-muted">
              {locale === 'ru'
                ? `Заявка по артикулу ${sku} передана менеджеру. Он свяжется с вами для подтверждения.`
                : `${sku} artikuli bo‘yicha so‘rov menejerga yuborildi. Tasdiqlash uchun u siz bilan bog‘lanadi.`}
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-accent hover:bg-accent-hover text-surface font-semibold text-sm rounded-xl transition"
            >
              {locale === 'ru' ? 'Понятно' : 'Tushunarli'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-accent font-bold text-lg border-b border-border pb-3">
              <Zap className="w-5 h-5 text-accent" />
              <span>{locale === 'ru' ? 'Быстрый заказ в 1 клик' : '1-Klikda tez buyurtma'}</span>
            </div>

            {/* Product Summary Box */}
            <div className="bg-secondary p-3.5 rounded-xl border border-border">
              <div className="font-bold text-sm text-heading line-clamp-1">{productTitle}</div>
              <div className="flex items-center justify-between text-xs text-muted mt-1">
                <span>SKU: {sku}</span>
                <span className="font-semibold text-accent">
                  {formatPrice(price, locale)} / {formatUnit(unitType, locale)}
                </span>
              </div>
            </div>

            {/* Quantity Step selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-heading">
                {locale === 'ru' ? 'Количество:' : 'Miqdori:'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step={minQtyStep}
                  min={minQtyStep}
                  value={qty}
                  onChange={(e) => setQty(Math.max(minQtyStep, parseFloat(e.target.value) || minQtyStep))}
                  className="w-28 px-3 py-2 bg-secondary border border-border rounded-lg text-sm font-bold text-heading focus:outline-none focus:border-accent"
                />
                <span className="text-xs text-muted">
                  {formatUnit(unitType, locale)} • {locale === 'ru' ? 'Итого:' : 'Jami:'}{' '}
                  <strong className="text-accent text-sm">{formatPrice(price * qty, locale)}</strong>
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-heading">
                {locale === 'ru' ? 'Ваше имя' : 'Ismingiz'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={locale === 'ru' ? 'Имя' : 'Ism'}
                  className="w-full pl-9 pr-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-heading">
                {locale === 'ru' ? 'Номер телефона' : 'Telefon raqamingiz'}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted" />
                <input
                  type="tel"
                  inputMode="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-9 pr-3 py-2 bg-secondary border border-border rounded-lg text-sm font-semibold focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg p-2.5">
                {locale === 'ru'
                  ? 'Не удалось отправить заявку. Попробуйте ещё раз.'
                  : 'So‘rovni yuborib bo‘lmadi. Qayta urinib ko‘ring.'}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent hover:bg-accent-hover text-surface font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span>{locale === 'ru' ? 'Отправить заказ' : 'Buyurtmani yuborish'}</span>
              )}
            </button>

            {/* Or Telegram CTA */}
            {telegramLink && (
              <div className="text-center pt-2 border-t border-border">
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:text-accent-hover hover:underline"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{locale === 'ru' ? 'Или написать в Telegram' : 'Yoki Telegram orqali bog‘lanish'}</span>
                </a>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
