import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { formatPrice, formatUnit } from '@/lib/formatters';
import { CheckCircle2, ShoppingBag, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface OrderSuccessPageProps {
  params: Promise<{ locale: string; orderNumber: string }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { locale, orderNumber } = await params;

  const order = await db.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        <div className="bg-surface rounded-3xl border border-border p-8 md:p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-black text-heading mb-2">
            {locale === 'ru' ? 'Спасибо за заказ!' : 'Buyurtmangiz uchun rahmat!'}
          </h1>
          <p className="text-muted mb-8">
            {locale === 'ru'
              ? `Ваш заказ ${order.orderNumber} успешно оформлен. Мы свяжемся с вами в ближайшее время для подтверждения.`
              : `Sizning ${order.orderNumber} raqamli buyurtmangiz muvaffaqiyatli rasmiylashtirildi. Tez orada tasdiqlash uchun siz bilan bog'lanamiz.`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left border-y border-border py-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-heading font-bold">
                <MapPin className="w-4 h-4 text-muted" />
                {locale === 'ru' ? 'Доставка' : 'Yetkazish'}
              </div>
              <div className="text-xs text-muted pl-6 space-y-1">
                <p><span className="font-semibold text-body">{order.guestName}</span></p>
                <p>{order.guestPhone}</p>
                <p>{order.deliveryAddress}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-heading font-bold">
                <CreditCard className="w-4 h-4 text-muted" />
                {locale === 'ru' ? 'Оплата' : 'To\'lov'}
              </div>
              <div className="text-xs text-muted pl-6 space-y-1">
                <p>{order.paymentMethod === 'CASH' ? (locale === 'ru' ? 'Наличными при получении' : 'Qabul qilishda naqd pul') : (locale === 'ru' ? 'Банковский перевод' : 'Bank o\'tkazmasi')}</p>
                <p className="font-bold text-heading mt-2">{formatPrice(order.total, locale)}</p>
              </div>
            </div>
          </div>

          <div className="text-left space-y-4">
            <h3 className="font-bold text-heading text-sm">
              {locale === 'ru' ? 'Детали заказа' : 'Buyurtma tafsilotlari'}
            </h3>
            <div className="bg-secondary rounded-2xl border border-border divide-y divide-border overflow-hidden">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-heading line-clamp-1">
                      {locale === 'ru' ? item.productNameRu : item.productNameUz}
                    </div>
                    <div className="text-[11px] text-muted font-mono mt-0.5">
                      SKU: {item.sku} • {Number(item.quantity)} {formatUnit(item.unitType, locale)}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-heading text-right pl-4">
                    {formatPrice(item.lineSubtotal, locale)}
                  </div>
                </div>
              ))}
              <div className="p-4 bg-surface flex justify-between items-center text-sm">
                <span className="font-bold text-heading">{locale === 'ru' ? 'Итого:' : 'Jami:'}</span>
                <span className="font-black text-accent text-base">{formatPrice(order.total, locale)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/catalog`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-border border border-border text-heading font-bold text-xs rounded-xl shadow-xs transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{locale === 'ru' ? 'Вернуться в каталог' : 'Katalogga qaytish'}</span>
          </Link>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
