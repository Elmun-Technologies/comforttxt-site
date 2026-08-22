import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { formatPrice } from '@/lib/formatters';
import { CheckCircle2, ShoppingBag, MapPin, CreditCard, PhoneCall, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { storefrontConfig } from '@/config/storefront';

interface OrderSuccessPageProps {
  params: Promise<{ locale: string; orderNumber: string }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { locale, orderNumber } = await params;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        <div className="bg-surface rounded-3xl border border-border p-8 md:p-12 text-center shadow-md space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block bg-accent-light text-accent text-xs font-mono font-black px-3 py-1 rounded-lg">
              № {orderNumber}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-heading tracking-tight">
              {locale === 'ru' ? 'Спасибо за заказ!' : 'Buyurtmangiz uchun rahmat!'}
            </h1>
            <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto font-medium leading-relaxed">
              {locale === 'ru'
                ? `Ваш заказ № ${orderNumber} успешно принят в обработку. Наш менеджер свяжется с вами в течение 10–15 минут для подтверждения деталей доставки.`
                : `Sizning № ${orderNumber} raqamli buyurtmangiz muvaffaqiyatli qabul qilindi. Menejerimiz 10–15 daqiqa ichida yetkazish tafsilotlarini tasdiqlash uchun bog‘lanadi.`}
            </p>
          </div>

          {/* Next Steps Box */}
          <div className="bg-secondary rounded-2xl p-5 border border-border text-left space-y-3">
            <h3 className="text-xs font-black text-heading uppercase tracking-wider">
              {locale === 'ru' ? 'Что происходит дальше?' : 'Keyingi qadamlar:'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-surface p-3 rounded-xl border border-border/80 space-y-1">
                <div className="font-bold text-heading">1. {locale === 'ru' ? 'Звонок' : 'Qo‘ng‘iroq'}</div>
                <div className="text-[11px] text-muted">{locale === 'ru' ? 'Уточнение позиций и адреса' : 'Buyurtmani tasdiqlash'}</div>
              </div>
              <div className="bg-surface p-3 rounded-xl border border-border/80 space-y-1">
                <div className="font-bold text-heading">2. {locale === 'ru' ? 'Сборка' : 'Yig‘ish'}</div>
                <div className="text-[11px] text-muted">{locale === 'ru' ? 'Комплектация на складе' : 'Omborda tayyorlash'}</div>
              </div>
              <div className="bg-surface p-3 rounded-xl border border-border/80 space-y-1">
                <div className="font-bold text-heading">3. {locale === 'ru' ? 'Доставка' : 'Yetkazish'}</div>
                <div className="text-[11px] text-muted">{locale === 'ru' ? 'В ваш цех или офис' : 'Ustaxonangizgacha'}</div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${storefrontConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface hover:bg-secondary border border-border text-heading text-xs font-bold rounded-xl transition shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-accent" />
              <span>{storefrontConfig.phone}</span>
            </a>
            <a
              href={storefrontConfig.telegramChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold rounded-xl transition shadow-xs"
            >
              <span>{locale === 'ru' ? 'Написать в Telegram' : 'Telegram orqali bog‘lanish'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="pt-4 border-t border-border">
            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-surface font-black text-xs rounded-xl shadow-md transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{locale === 'ru' ? 'Вернуться в каталог' : 'Katalogga qaytish'}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
