'use client';

import { useState } from 'react';
import { X, Zap, Phone, User, CheckCircle2, Loader2, Send } from 'lucide-react';
import { formatPrice, formatUnit } from '@/lib/formatters';

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
  const [orderNum, setOrderNum] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length < 9) return;

    setLoading(true);
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

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setOrderNum(data.id.slice(0, 8).toUpperCase());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const telegramLink = `https://t.me/comforttxt_bot?start=${encodeURIComponent(sku)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">
              {locale === 'ru' ? 'Заказ принят!' : 'Buyurtma qabul qilindi!'}
            </h3>
            <p className="text-sm text-gray-600">
              {locale === 'ru'
                ? `Ваш заказ № ${orderNum} оформлен. Наш менеджер перезвонит вам в течение 10 минут.`
                : `Buyurtma № ${orderNum} rasmiylashtirildi. Menejerimiz 10 daqiqa ichida siz bilan bog'lanadi.`}
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-brand-600 text-white font-semibold text-sm rounded-xl hover:bg-brand-700 transition"
            >
              {locale === 'ru' ? 'Понятно' : 'Tushunarli'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-brand-700 font-bold text-lg border-b border-gray-100 pb-3">
              <Zap className="w-5 h-5 text-accent-amber" />
              <span>{locale === 'ru' ? 'Быстрый заказ в 1 клик' : '1-Klikda Tez Buyurtma'}</span>
            </div>

            {/* Product Summary Box */}
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <div className="font-bold text-sm text-gray-900 line-clamp-1">{productTitle}</div>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>SKU: {sku}</span>
                <span className="font-semibold text-brand-700">
                  {formatPrice(price, locale)} / {formatUnit(unitType, locale)}
                </span>
              </div>
            </div>

            {/* Quantity Step selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                {locale === 'ru' ? 'Количество:' : 'Miqdori:'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step={minQtyStep}
                  min={minQtyStep}
                  value={qty}
                  onChange={(e) => setQty(Math.max(minQtyStep, parseFloat(e.target.value) || minQtyStep))}
                  className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <span className="text-xs text-gray-500">
                  {formatUnit(unitType, locale)} • Jami:{' '}
                  <strong className="text-brand-700 text-sm">{formatPrice(price * qty, locale)}</strong>
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                {locale === 'ru' ? 'Ваше имя' : 'Ismingiz'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={locale === 'ru' ? 'Иван Иванов' : 'Javohir Toshpulotov'}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                {locale === 'ru' ? 'Номер телефона' : 'Telefon raqamingiz'}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{locale === 'ru' ? 'Отправить заказ' : 'Buyurtmani Yuborish'}</span>
                </>
              )}
            </button>

            {/* Or Telegram CTA */}
            <div className="text-center pt-2 border-t border-gray-100">
              <a
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{locale === 'ru' ? 'Или написать в Telegram' : 'Yoki Telegram orqali bog\'lanish'}</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
