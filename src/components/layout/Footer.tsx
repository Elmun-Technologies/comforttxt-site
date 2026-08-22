import Link from 'next/link';
import { Package, Phone, Mail, MapPin, Send, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { storefrontConfig } from '@/config/storefront';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-charcoal-950 text-surface/70 border-t border-charcoal-800">
      {/* Advantage Highlights */}
      <div className="border-b border-charcoal-800/80 bg-charcoal-900/60 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
            <Package className="w-8 h-8 text-accent flex-shrink-0" />
            <div>
              <h4 className="font-black text-surface text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'Специализация на мебели' : 'Mebel materiallari'}
              </h4>
              <p className="text-xs text-surface/60 mt-0.5">
                {locale === 'ru' ? 'Ткани, поролон, механизмы, клей' : 'Mato, paralon, mexanizmlar, yelim'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
            <Truck className="w-8 h-8 text-accent flex-shrink-0" />
            <div>
              <h4 className="font-black text-surface text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'Быстрая Доставка' : 'Tezkor Yetkazib Berish'}
              </h4>
              <p className="text-xs text-surface/60 mt-0.5">
                {locale === 'ru' ? 'Ташкент и регионы Узбекистана' : 'Toshkent va barcha viloyatlarga'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
            <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
            <div>
              <h4 className="font-black text-surface text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'B2B Оптовые Условия' : 'B2B Ulgurji Shartlar'}
              </h4>
              <p className="text-xs text-surface/60 mt-0.5">
                {locale === 'ru' ? 'Для цехов, фабрик и мастеров' : 'Sexlar, fabrikalar va ustalar uchun'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
            <Headphones className="w-8 h-8 text-accent flex-shrink-0" />
            <div>
              <h4 className="font-black text-surface text-xs uppercase tracking-wider">
                {locale === 'ru' ? '20 лет опыта' : '20 yillik tajriba'}
              </h4>
              <p className="text-xs text-surface/60 mt-0.5">
                {locale === 'ru' ? 'Консультации и подбор материалов' : 'Materiallar tanlashda mutaxassis yordami'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-xs">
              <Package className="w-5 h-5 text-surface" />
            </div>
            <div>
              <span className="text-lg font-black text-surface tracking-tight">
                COMFORT <span className="text-accent">TXT</span>
              </span>
              <div className="text-[10px] font-bold text-surface/50 uppercase tracking-wider">
                {locale === 'ru' ? storefrontConfig.taglineRu : storefrontConfig.taglineUz}
              </div>
            </div>
          </div>
          <p className="text-xs text-surface/60 leading-relaxed">
            {locale === 'ru'
              ? 'Comfort TXT — надежный поставщик мебельных тканей, поролона, трансформационных механизмов и комплектующих в Узбекистане.'
              : 'Comfort TXT — O‘zbekistonda mebel matolari, paralon, mexanizmlar va professional sarf materiallarini yetkazib beruvchi ishonchli hamkor.'}
          </p>
          <div className="pt-2">
            <a
              href={storefrontConfig.telegramChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-surface text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{locale === 'ru' ? 'Telegram Канал' : 'Telegram Kanalimiz'}</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-black text-surface uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Категории' : 'Kategoriyalar'}
          </h3>
          <ul className="space-y-2 text-xs text-surface/70">
            <li>
              <Link href={`/${locale}/catalog/mebel-matolari`} className="hover:text-accent transition">
                {locale === 'ru' ? 'Мебельные ткани (Велюр, Шенилл, Букле)' : 'Mebel matolari (Velyur, Shenill, Bukle)'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog/paralon`} className="hover:text-accent transition">
                {locale === 'ru' ? 'Поролон ST, EL, HR' : 'Paralon ST, EL, HR'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog/mexanizmlar`} className="hover:text-accent transition">
                {locale === 'ru' ? 'Механизмы трансформации (Дельфин, Газ-лифт)' : 'Mexanizmlar (Delfin, Gaz-lift)'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog/furnitura-va-oyoqlar`} className="hover:text-accent transition">
                {locale === 'ru' ? 'Фурнитура и Ножки' : 'Furnitura va Oyoqlar'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog/sarf-materiallar-va-instrumentlar`} className="hover:text-accent transition">
                {locale === 'ru' ? 'Клей Akfix и Пневмоинструменты' : 'Akfix yelim va Asboblar'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-black text-surface uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Клиентам & B2B' : 'Mijozlarga va B2B'}
          </h3>
          <ul className="space-y-2 text-xs text-surface/70">
            <li>
              <Link href={`/${locale}/wholesale`} className="hover:text-accent transition font-bold text-accent">
                {locale === 'ru' ? 'Оптовый B2B Кабинет' : 'Ulgurji B2B Portal'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/sample-box`} className="hover:text-accent transition">
                {locale === 'ru' ? 'Заказ образцов (Sample Box)' : 'Mato namunalari (Sample Box)'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/collections`} className="hover:text-accent transition">
                {locale === 'ru' ? 'Коллекции тканей' : 'Mato kolleksiyalari'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/blog`} className="hover:text-accent transition">
                {locale === 'ru' ? 'База знаний для мебельщиков' : 'Mebelchilar uchun bilimlar bazasi'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/compare`} className="hover:text-accent transition">
                {locale === 'ru' ? 'Сравнение товаров' : 'Mahsulotlarni taqqoslash'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-surface uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Контакты' : 'Aloqa'}
          </h3>
          <div className="flex items-start gap-2.5 text-xs text-surface/70">
            <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span>{locale === 'ru' ? storefrontConfig.addressRu : storefrontConfig.addressUz}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-surface/70">
            <Phone className="w-4 h-4 text-accent flex-shrink-0" />
            <a href={`tel:${storefrontConfig.phoneRaw}`} className="hover:text-surface transition font-bold">
              {storefrontConfig.phone}
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-surface/70">
            <Mail className="w-4 h-4 text-accent flex-shrink-0" />
            <span>info@comforttxt.uz</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="border-t border-charcoal-800 py-4 px-4 text-xs text-surface/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Comfort TXT. {locale === 'ru' ? 'Все права защищены.' : 'Barcha huquqlar himoyalangan.'}</span>
          <span className="text-[11px] text-surface/40">Comfort TXT Storefront — ShopFlow Architecture</span>
        </div>
      </div>
    </footer>
  );
}
