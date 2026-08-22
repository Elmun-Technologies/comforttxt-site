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
    <footer className="pattern-weave-dark bg-charcoal-950 text-surface/70 border-t border-charcoal-800">
      {/* Service Highlights — neutral, category-based */}
      <div className="border-b border-charcoal-800/80 bg-charcoal-900/60 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
            <Package className="w-8 h-8 text-brand-300 flex-shrink-0" />
            <div>
              <h4 className="font-black text-surface text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'Мебельные материалы' : 'Mebel materiallari'}
              </h4>
              <p className="text-xs text-surface/60 mt-0.5">
                {locale === 'ru' ? 'Ткани, поролон, механизмы, фурнитура' : 'Mato, paralon, mexanizmlar, furnitura'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
            <Truck className="w-8 h-8 text-brand-300 flex-shrink-0" />
            <div>
              <h4 className="font-black text-surface text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'Доставка' : 'Yetkazib berish'}
              </h4>
              <p className="text-xs text-surface/60 mt-0.5">
                {locale === 'ru' ? 'Условия подтверждает менеджер' : 'Shartlarni menejer tasdiqlaydi'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
            <ShieldCheck className="w-8 h-8 text-brand-300 flex-shrink-0" />
            <div>
              <h4 className="font-black text-surface text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'Оптовые условия' : 'Ulgurji shartlar'}
              </h4>
              <p className="text-xs text-surface/60 mt-0.5">
                {locale === 'ru' ? 'Для цехов, фабрик и мастеров' : 'Sexlar, fabrikalar va ustalar uchun'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
            <Headphones className="w-8 h-8 text-brand-300 flex-shrink-0" />
            <div>
              <h4 className="font-black text-surface text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'Помощь менеджера' : 'Menejer yordami'}
              </h4>
              <p className="text-xs text-surface/60 mt-0.5">
                {locale === 'ru' ? 'Подбор и расчет материалов' : 'Material tanlash va hisob-kitob'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <BrandLogo locale={locale} size="footer" />
          <p className="text-xs text-surface/60 leading-relaxed">
            {locale === 'ru'
              ? `${storefrontConfig.name} — мебельные ткани, поролон, механизмы трансформации и профессиональные расходные материалы.`
              : `${storefrontConfig.name} — mebel matolari, paralon, transformatsiya mexanizmlari va professional sarf materiallari.`}
          </p>
          {storefrontConfig.telegramChannelUrl && (
            <div className="pt-2">
              <a
                href={storefrontConfig.telegramChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-brand-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{locale === 'ru' ? 'Telegram' : 'Telegram'}</span>
              </a>
            </div>
          )}
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-black text-surface uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Категории' : 'Kategoriyalar'}
          </h3>
          <ul className="space-y-2 text-xs text-surface/70">
            <li>
              <Link href={`/${locale}/catalog/mebel-matolari`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Мебельные ткани' : 'Mebel matolari'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog/paralon`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Поролон ST, EL, HR' : 'Paralon ST, EL, HR'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog/mexanizmlar`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Механизмы трансформации' : 'Transformatsiya mexanizmlari'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog/furnitura-va-oyoqlar`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Фурнитура и ножки' : 'Furnitura va oyoqlar'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog/sarf-materiallar-va-instrumentlar`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Инструменты и расходники' : 'Instrumentlar va sarf materiallari'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-black text-surface uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Покупателям' : 'Xaridorlarga'}
          </h3>
          <ul className="space-y-2 text-xs text-surface/70">
            <li>
              <Link href={`/${locale}/wholesale`} className="hover:text-cream-400 transition font-bold text-brand-200">
                {locale === 'ru' ? 'Оптовые условия (B2B)' : 'Ulgurji shartlar (B2B)'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/sample-box`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Sample Box — образцы тканей' : 'Sample Box — mato namunalari'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/collections`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Подборки тканей' : 'Mato to‘plamlari'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/blog`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Для мебельщиков' : 'Mebelchilar uchun'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/compare`} className="hover:text-cream-400 transition">
                {locale === 'ru' ? 'Сравнение товаров' : 'Mahsulotlarni taqqoslash'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info — only confirmed values are rendered */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-surface uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Контакты' : 'Aloqa'}
          </h3>
          {hasContact ? (
            <>
              {storefrontConfig.addressUz && (
                <div className="flex items-start gap-2.5 text-xs text-surface/70">
                  <MapPin className="w-4 h-4 text-brand-300 flex-shrink-0 mt-0.5" />
                  <span>{locale === 'ru' ? storefrontConfig.addressRu || storefrontConfig.addressUz : storefrontConfig.addressUz}</span>
                </div>
              )}
              {storefrontConfig.phone && (
                <div className="flex items-center gap-2.5 text-xs text-surface/70">
                  <Phone className="w-4 h-4 text-brand-300 flex-shrink-0" />
                  <a href={`tel:${storefrontConfig.phoneRaw}`} className="hover:text-surface transition font-bold">
                    {storefrontConfig.phone}
                  </a>
                </div>
              )}
              {storefrontConfig.email && (
                <div className="flex items-center gap-2.5 text-xs text-surface/70">
                  <Mail className="w-4 h-4 text-brand-300 flex-shrink-0" />
                  <a href={`mailto:${storefrontConfig.email}`} className="hover:text-surface transition">
                    {storefrontConfig.email}
                  </a>
                </div>
              )}
              {storefrontConfig.workingHoursUz && (
                <div className="flex items-center gap-2.5 text-xs text-surface/70">
                  <Clock className="w-4 h-4 text-brand-300 flex-shrink-0" />
                  <span>{locale === 'ru' ? storefrontConfig.workingHoursRu || storefrontConfig.workingHoursUz : storefrontConfig.workingHoursUz}</span>
                </div>
              )}
            </>
          ) : (
            <p className="text-xs text-surface/50">
              {locale === 'ru'
                ? 'Контактные данные появятся после подтверждения.'
                : 'Aloqa ma’lumotlari tasdiqlangach paydo bo‘ladi.'}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="border-t border-charcoal-800 py-4 px-4 text-xs text-surface/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 {storefrontConfig.name}. {locale === 'ru' ? 'Все права защищены.' : 'Barcha huquqlar himoyalangan.'}</span>
        </div>
      </div>
    </footer>
  );
}
