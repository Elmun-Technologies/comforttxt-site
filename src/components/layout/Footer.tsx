import Link from 'next/link';
import { Package, Phone, Mail, MapPin, Send, ShieldCheck, Truck, Headphones } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-charcoal-900 text-gray-300 border-t border-charcoal-800">
      {/* Advantage Highlights */}
      <div className="border-b border-charcoal-800 bg-charcoal-800/50 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-charcoal-900/50">
            <Package className="w-8 h-8 text-brand-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                {locale === 'ru' ? '500+ Видов Материалов' : '500+ Turdagi Mahsulotlar'}
              </h4>
              <p className="text-xs text-gray-400">
                {locale === 'ru' ? 'Ткани, поролон, механизмы' : 'Matolar, paralon, mexanizmlar'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-charcoal-900/50">
            <Truck className="w-8 h-8 text-accent-gold flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'Быстрая Доставка' : 'Tezkor Yetkazib Berish'}
              </h4>
              <p className="text-xs text-gray-400">
                {locale === 'ru' ? 'Ташкент и регионы Узбекистана' : 'Toshkent va viloyatlar bo\'ylab'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-charcoal-900/50">
            <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'B2B Оптовые Цены' : 'B2B Ulgurji Narxlar'}
              </h4>
              <p className="text-xs text-gray-400">
                {locale === 'ru' ? 'Скидки для цехов и фабрик' : 'Sexlar va fabrikalar uchun chegirmalar'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-charcoal-900/50">
            <Headphones className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                {locale === 'ru' ? 'Поддержка 24/7' : 'Qo\'llab-quvvatlash'}
              </h4>
              <p className="text-xs text-gray-400">
                {locale === 'ru' ? 'Консультации технологов' : 'Mutaxassislar konsultatsiyasi'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black text-white tracking-wide">
              COMFORT <span className="text-brand-500">TxT</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            {locale === 'ru'
              ? 'Comfort TxT — ведущая платформа по оптовой и розничной продаже мебельных тканей, поролона, механизмов трансформации и комплектующих в Узбекистане.'
              : 'Comfort TxT — O\'zbekistonda mebel matolari, paralon, mexanizmlar va sarf materiallarini ulgurji hamda chakana sotish bo\'yicha yetakchi platforma.'}
          </p>
          <div className="pt-2">
            <a
              href="https://t.me/comforttxt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              <Send className="w-4 h-4" />
              <span>{locale === 'ru' ? 'Наш Telegram Канал' : 'Telegram Kanalimiz'}</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Категории' : 'Kategoriyalar'}
          </h3>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <Link href={`/${locale}/catalog?category=mebel-matolari`} className="hover:text-white transition">
                {locale === 'ru' ? 'Мебельные ткани (Велюр, Шенилл)' : 'Mebel matolari (Velur, Shenill)'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog?category=paralon`} className="hover:text-white transition">
                {locale === 'ru' ? 'Поролон ST, EL, HR' : 'Paralon ST, EL, HR'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog?category=mexanizmlar`} className="hover:text-white transition">
                {locale === 'ru' ? 'Механизмы трансформации' : 'Transformatsiya mexanizmlari'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog?category=furnitura-va-oyoqlar`} className="hover:text-white transition">
                {locale === 'ru' ? 'Фурнитура и Ножки' : 'Furnitura va Oyoqlar'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/catalog?category=sarf-materiallar-va-instrumentlar`} className="hover:text-white transition">
                {locale === 'ru' ? 'Клей Akfix и Инструменты' : 'Akfix yelim va Asboblar'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Покупателям & B2B' : 'Xaridorlarga va B2B'}
          </h3>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <Link href={`/${locale}/wholesale`} className="hover:text-white transition font-medium text-accent-gold">
                {locale === 'ru' ? 'Оптовый B2B Кабинет' : 'Ulgurji B2B Kabinet'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/sample-box`} className="hover:text-white transition">
                {locale === 'ru' ? 'Заказ образцов ткани (Sample Box)' : 'Mato namunalari so\'rovi'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/blog`} className="hover:text-white transition">
                {locale === 'ru' ? 'База знаний для мебельщиков' : 'Mebelchilar uchun qo\'llanmalar'}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/compare`} className="hover:text-white transition">
                {locale === 'ru' ? 'Сравнение товаров' : 'Mahsulotlarni solishtirish'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            {locale === 'ru' ? 'Контакты' : 'Aloqa'}
          </h3>
          <div className="flex items-start gap-2.5 text-xs text-gray-400">
            <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
            <span>
              {locale === 'ru'
                ? 'г. Ташкент, Сергелийский р-н, Малая кольцевая дорога, 42'
                : 'Toshkent sh., Sergeli t., Kichik halka yo\'li, 42-uy'}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-gray-400">
            <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <a href="tel:+998712008899" className="hover:text-white transition font-medium">
              +998 (71) 200-88-99
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-gray-400">
            <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span>info@comforttxt.uz</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="border-t border-charcoal-800 py-4 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Comfort TxT. {locale === 'ru' ? 'Все права защищены.' : 'Barcha huquqlar himoyalangan.'}</span>
          <span className="text-[11px] text-gray-600">Next.js 14 E-Commerce Platform</span>
        </div>
      </div>
    </footer>
  );
}
