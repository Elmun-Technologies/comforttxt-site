import Link from 'next/link';
import { Package, Phone, MapPin, Send, ShieldCheck, Truck, Headphones, Mail, Clock } from 'lucide-react';
import { storefrontConfig } from '@/config/storefront';
import { BrandLogo } from '@/components/layout/BrandLogo';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const hasContact = Boolean(
    storefrontConfig.phone ||
    storefrontConfig.addressUz ||
    storefrontConfig.email ||
    storefrontConfig.telegramChannelUrl ||
    storefrontConfig.workingHoursUz
  );

  return (
    <footer className="relative bg-charcoal-950 text-surface/70 overflow-hidden">
      <div aria-hidden="true" className="pattern-rings-dark pattern-fade-y absolute inset-0 pointer-events-none opacity-40" />
      <div aria-hidden="true" className="paper-grain absolute inset-0 pointer-events-none opacity-60" />

      <div className="relative">
        {/* Service strip — light, no boxes */}
        <div className="border-b border-surface/10 py-8 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-brand-300 flex-shrink-0" />
              <div>
                <div className="font-black text-surface text-[11px] uppercase tracking-wider">
                  {locale === 'ru' ? 'Мебельные материалы' : 'Mebel materiallari'}
                </div>
                <div className="text-[11px] text-surface/50 mt-0.5">
                  {locale === 'ru' ? 'Ткани · поролон · механизмы' : 'Mato · paralon · mexanizmlar'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-brand-300 flex-shrink-0" />
              <div>
                <div className="font-black text-surface text-[11px] uppercase tracking-wider">
                  {locale === 'ru' ? 'Доставка' : 'Yetkazib berish'}
                </div>
                <div className="text-[11px] text-surface/50 mt-0.5">
                  {locale === 'ru' ? 'Условия подтверждает менеджер' : 'Shartlarni menejer tasdiqlaydi'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-300 flex-shrink-0" />
              <div>
                <div className="font-black text-surface text-[11px] uppercase tracking-wider">
                  {locale === 'ru' ? 'Оптовые условия' : 'Ulgurji shartlar'}
                </div>
                <div className="text-[11px] text-surface/50 mt-0.5">
                  {locale === 'ru' ? 'Для цехов, фабрик и мастеров' : 'Sexlar, fabrikalar va ustalar uchun'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="w-5 h-5 text-brand-300 flex-shrink-0" />
              <div>
                <div className="font-black text-surface text-[11px] uppercase tracking-wider">
                  {locale === 'ru' ? 'Помощь менеджера' : 'Menejer yordami'}
                </div>
                <div className="text-[11px] text-surface/50 mt-0.5">
                  {locale === 'ru' ? 'Подбор и расчёт материалов' : 'Material tanlash va hisob-kitob'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo locale={locale} size="footer" />
            <p className="text-sm text-surface/60 leading-relaxed max-w-xs">
              {locale === 'ru'
                ? `${storefrontConfig.name} — мебельные ткани, поролон, механизмы трансформации и профессиональные расходные материалы для цехов и фабрик.`
                : `${storefrontConfig.name} — mebel matolari, paralon, transformatsiya mexanizmlari va professional sarf materiallari. Sexlar va fabrikalar uchun.`}
            </p>
            {storefrontConfig.telegramChannelUrl && (
              <div className="pt-1">
                <a
                  href={storefrontConfig.telegramChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface text-xs font-black px-5 py-3 rounded-xl transition shadow-accent-glow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{locale === 'ru' ? 'Telegram-канал' : 'Telegram kanal'}</span>
                </a>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black text-brand-300 uppercase tracking-[0.2em] mb-5">
              {locale === 'ru' ? 'Категории' : 'Kategoriyalar'}
            </h3>
            <ul className="space-y-2.5 text-sm text-surface/70">
              <li>
                <Link href={`/${locale}/catalog/mebel-matolari`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Мебельные ткани' : 'Mebel matolari'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog/paralon`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Поролон (корнер, гребенки)' : 'Paralon buyumlari (korner, taroq)'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog/mexanizmlar`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Механизмы трансформации' : 'Transformatsiya mexanizmlari'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog/furnitura-va-oyoqlar`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Фурнитура и ножки' : 'Furnitura va oyoqlar'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog/sarf-materiallar-va-instrumentlar`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Инструменты и расходники' : 'Instrumentlar va sarf materiallari'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black text-brand-300 uppercase tracking-[0.2em] mb-5">
              {locale === 'ru' ? 'Покупателям' : 'Xaridorlarga'}
            </h3>
            <ul className="space-y-2.5 text-sm text-surface/70">
              <li>
                <Link href={`/${locale}/wholesale`} className="hover:text-brand-300 transition font-bold text-cream-200">
                  {locale === 'ru' ? 'Оптовые условия (B2B)' : 'Ulgurji shartlar (B2B)'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sample-box`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Sample Box — образцы тканей' : 'Sample Box — mato namunalari'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/collections`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Подборки тканей' : 'Mato to‘plamlari'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Для мебельщиков' : 'Mebelchilar uchun'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/compare`} className="hover:text-brand-300 transition">
                  {locale === 'ru' ? 'Сравнение товаров' : 'Mahsulotlarni taqqoslash'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-black text-brand-300 uppercase tracking-[0.2em] mb-5">
              {locale === 'ru' ? 'Контакты' : 'Aloqa'}
            </h3>
            {hasContact ? (
              <div className="space-y-3.5">
                {storefrontConfig.addressUz && (
                  <div className="flex items-start gap-2.5 text-sm text-surface/70">
                    <MapPin className="w-4 h-4 text-brand-300 flex-shrink-0 mt-0.5" />
                    <span>{locale === 'ru' ? storefrontConfig.addressRu || storefrontConfig.addressUz : storefrontConfig.addressUz}</span>
                  </div>
                )}
                {storefrontConfig.phone && (
                  <div className="flex items-center gap-2.5 text-sm text-surface/70">
                    <Phone className="w-4 h-4 text-brand-300 flex-shrink-0" />
                    <a href={`tel:${storefrontConfig.phoneRaw}`} className="hover:text-surface transition font-bold">
                      {storefrontConfig.phone}
                    </a>
                  </div>
                )}
                {storefrontConfig.email && (
                  <div className="flex items-center gap-2.5 text-sm text-surface/70">
                    <Mail className="w-4 h-4 text-brand-300 flex-shrink-0" />
                    <a href={`mailto:${storefrontConfig.email}`} className="hover:text-surface transition">
                      {storefrontConfig.email}
                    </a>
                  </div>
                )}
                {storefrontConfig.workingHoursUz && (
                  <div className="flex items-center gap-2.5 text-sm text-surface/70">
                    <Clock className="w-4 h-4 text-brand-300 flex-shrink-0" />
                    <span>{locale === 'ru' ? storefrontConfig.workingHoursRu || storefrontConfig.workingHoursUz : storefrontConfig.workingHoursUz}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-surface/50">
                {locale === 'ru'
                  ? 'Контактные данные появятся после подтверждения.'
                  : 'Aloqa ma’lumotlari tasdiqlangach paydo bo‘ladi.'}
              </p>
            )}
          </div>
        </div>

        {/* Bottom legal */}
        <div className="border-t border-surface/10 py-5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-surface/45">
            <span>© 2026 {storefrontConfig.name}. {locale === 'ru' ? 'Все права защищены.' : 'Barcha huquqlar himoyalangan.'}</span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
              {locale === 'ru' ? 'Ткани · Поролон · Механизмы · Фурнитура' : 'Mato · Paralon · Mexanizm · Furnitura'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
