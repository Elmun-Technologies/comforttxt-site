import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { storefrontService } from '@/services/storefront';
import { storefrontConfig } from '@/config/storefront';
import {
  Palette,
  Layers,
  Settings,
  Hammer,
  Wrench,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package,
  Truck,
  PhoneCall,
  Search,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const homepageData = await storefrontService.getHomepage(locale);

  const { heroCategories, popularProducts, newArrivals, featuredFabrics, collections } = homepageData;

  const fabricTypes = [
    {
      nameUz: 'Velyur (Velvet)',
      nameRu: 'Велюр (Velvet)',
      descUz: 'Yumshoq baxmal faktura, Pet Friendly va Easy Clean tozalanishi',
      descRu: 'Мягкий бархатный ворс, эффект Easy Clean и защита от когтей',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
      href: `/${locale}/catalog/mebel-matolari?sub=velyur`,
    },
    {
      nameUz: 'Bukle (Boucle)',
      nameRu: 'Букле (Boucle)',
      descUz: 'Skandinav uslubidagi nozik tugunchali zamonaviy hajm',
      descRu: 'Скандинавский тренд с выразительной фактурой узелков',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop',
      href: `/${locale}/catalog/mebel-matolari?sub=bukle`,
    },
    {
      nameUz: 'Shenill (Chenille)',
      nameRu: 'Шенилл (Chenille)',
      descUz: 'Klassik va neoklassik mebellar uchun qalin baxmalsimon to‘qima',
      descRu: 'Плотная ворсистая нить для классической и неоклассической мебели',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop',
      href: `/${locale}/catalog/mebel-matolari?sub=shenill`,
    },
    {
      nameUz: 'Rogojka (Matting)',
      nameRu: 'Рогожка (Matting)',
      descUz: 'Yuqori Martindale chidamliligi va havo o‘tkazuvchan tabiiy to‘qima',
      descRu: 'Высокая прочность Мартиндейла и натуральная фактура плетения',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop',
      href: `/${locale}/catalog/mebel-matolari?sub=rogojka`,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 space-y-16 pb-20">
        {/* ======================================================== */}
        {/* 1. COMMERCE-DRIVEN HERO */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (60%): Direct value proposition & Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full border border-border text-xs font-bold text-heading shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>{locale === 'ru' ? '20 лет опыта в сфере мебельных материалов' : 'Mebel materiallari sohasida 20 yillik tajriba'}</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading tracking-tight leading-[1.12]">
                    {locale === 'ru'
                      ? 'Все материалы для производства мебели — в одном месте'
                      : 'Mebel ishlab chiqarish uchun kerakli mahsulotlar — bir joyda'}
                  </h1>
                  <p className="text-sm sm:text-base text-muted font-medium max-w-xl leading-relaxed">
                    {locale === 'ru'
                      ? 'Ткани, поролон, механизмы трансформации, фурнитура и профессиональные инструменты с быстрой доставкой по всему Узбекистану.'
                      : 'Mato, paralon, mexanizm, furnitura va professional instrumentlar. O‘zbekiston bo‘ylab tezkor yetkazib berish.'}
                  </p>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href={`/${locale}/catalog`}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent hover:bg-accent-hover text-surface font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-98"
                  >
                    <span>{locale === 'ru' ? 'Смотреть каталог' : 'Katalogni ko‘rish'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/${locale}/wholesale`}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-surface hover:bg-secondary text-heading border border-border font-bold text-xs sm:text-sm rounded-xl transition shadow-xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>{locale === 'ru' ? 'Для мебельных цехов (B2B)' : 'Mebelchilar uchun (B2B)'}</span>
                  </Link>
                </div>

                {/* Quick Category Chips */}
                <div className="pt-4 border-t border-border/70">
                  <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
                    {locale === 'ru' ? 'Быстрый переход к разделам:' : 'Tezkor bo‘limlar:'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/${locale}/catalog/mebel-matolari`}
                      className="px-3 py-1 bg-surface hover:bg-accent-light hover:text-accent hover:border-accent/40 border border-border rounded-lg text-xs font-semibold text-body transition"
                    >
                      {locale === 'ru' ? 'Мебельные ткани' : 'Mebel matolari'}
                    </Link>
                    <Link
                      href={`/${locale}/catalog/paralon`}
                      className="px-3 py-1 bg-surface hover:bg-accent-light hover:text-accent hover:border-accent/40 border border-border rounded-lg text-xs font-semibold text-body transition"
                    >
                      {locale === 'ru' ? 'Поролон (ST/EL/HR)' : 'Paralon (ST/EL/HR)'}
                    </Link>
                    <Link
                      href={`/${locale}/catalog/mexanizmlar`}
                      className="px-3 py-1 bg-surface hover:bg-accent-light hover:text-accent hover:border-accent/40 border border-border rounded-lg text-xs font-semibold text-body transition"
                    >
                      {locale === 'ru' ? 'Механизмы' : 'Mexanizmlar'}
                    </Link>
                    <Link
                      href={`/${locale}/catalog/sarf-materiallar-va-instrumentlar`}
                      className="px-3 py-1 bg-surface hover:bg-accent-light hover:text-accent hover:border-accent/40 border border-border rounded-lg text-xs font-semibold text-body transition"
                    >
                      {locale === 'ru' ? 'Инструменты и клей' : 'Asboblar va yelim'}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column (40%): Tactile Material Visual Zone */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-surface">
                  <div className="aspect-[4/3] sm:aspect-square relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1000&auto=format&fit=crop"
                      alt="Comfort TXT Premium Materials"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent flex items-end p-6">
                      <div className="text-surface space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 bg-accent text-surface text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                          <Sparkles className="w-3 h-3" />
                          LUNA Collection
                        </div>
                        <h2 className="text-lg sm:text-xl font-black">
                          {locale === 'ru' ? 'Премиальный велюр Easy Clean' : 'Easy Clean baxmal velyur matolari'}
                        </h2>
                        <p className="text-xs text-surface/80 font-medium">
                          {locale === 'ru' ? '50 000 циклов Мартиндейла • Водоотталкивающий' : '50 000 Martindale chidamlilik • Suv yuqtirmas'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. TACTILE CATEGORY DISCOVERY */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-heading tracking-tight">
                {locale === 'ru' ? 'Категории Материалов' : 'Materiallar Kategoriyalari'}
              </h2>
              <p className="text-xs text-muted mt-0.5 font-medium">
                {locale === 'ru' ? 'Выберите нужный раздел для быстрого заказа' : 'Buyurtma uchun kerakli yo‘nalishni tanlang'}
              </p>
            </div>
            <Link
              href={`/${locale}/catalog`}
              className="text-xs font-bold text-accent hover:text-accent-hover inline-flex items-center gap-1 transition"
            >
              <span>{locale === 'ru' ? 'Весь каталог' : 'Barcha katalog'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {heroCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/catalog/${cat.slug}`}
                className="group bg-surface rounded-2xl border border-border p-3.5 flex flex-col justify-between hover:border-accent/60 hover:shadow-lg transition duration-200"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary mb-3">
                  <img
                    src={cat.image}
                    alt={cat.nameUz}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-black text-heading group-hover:text-accent transition leading-tight">
                    {locale === 'ru' ? cat.nameRu : cat.nameUz}
                  </h3>
                  <p className="text-[11px] text-muted line-clamp-2 leading-snug">
                    {locale === 'ru' ? cat.descriptionRu : cat.descriptionUz}
                  </p>
                </div>
                <div className="pt-2 text-[10px] font-bold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>{locale === 'ru' ? 'Смотреть' : 'Ko‘rish'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. EARLY PRODUCTS: POPULAR & NEW ARRIVALS */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between border-b border-border pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-accent text-xs font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === 'ru' ? 'Хиты продаж' : 'Ommabop mahsulotlar'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-heading tracking-tight">
                {locale === 'ru' ? 'Популярные Позиции для Производства' : 'Eng Ko‘p Buyurtma Qilinadigan Materiallar'}
              </h2>
            </div>
            <Link
              href={`/${locale}/catalog?sort=popular`}
              className="text-xs font-bold text-accent hover:text-accent-hover inline-flex items-center gap-1 transition"
            >
              <span>{locale === 'ru' ? 'Все популярные' : 'Barchasini ko‘rish'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. SIGNATURE EDITORIAL: "MATO FAQAT RANG EMAS" */}
        {/* ======================================================== */}
        <section className="bg-secondary/70 border-y border-border py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-accent text-xs font-black uppercase tracking-widest">
                {locale === 'ru' ? 'Текстура и Практичность' : 'Faktura va Chidamlilik'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-heading tracking-tight">
                {locale === 'ru' ? 'Ткань — это не только цвет' : 'Mato faqat rang emas'}
              </h2>
              <p className="text-xs sm:text-sm text-muted font-medium leading-relaxed">
                {locale === 'ru'
                  ? 'Каждая фактура решает конкретную задачу: от износостойкого велюра до уютного букле и прочного шенилла.'
                  : 'Har bir to‘qima o‘ziga xos xususiyatga ega: baxmal yumshoqlik, tirnalishga chidamlilik yoki Skandinaviya uslubidagi hajm.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fabricTypes.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group bg-surface rounded-2xl border border-border overflow-hidden hover:border-accent/60 hover:shadow-xl transition flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={item.image}
                      alt={item.nameUz}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-black text-heading group-hover:text-accent transition">
                        {locale === 'ru' ? item.nameRu : item.nameUz}
                      </h3>
                      <p className="text-[11px] text-muted leading-relaxed mt-1">
                        {locale === 'ru' ? item.descRu : item.descUz}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-bold text-accent">
                      <span>{locale === 'ru' ? 'Коллекции ткани' : 'Mato to‘plamlari'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. B2B PROCUREMENT VALUE */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-surface rounded-3xl border border-border p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{locale === 'ru' ? 'Для фабрик, цехов и мастеров' : 'Fabrika, sex va ustalar uchun'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-heading tracking-tight leading-tight">
                  {locale === 'ru'
                    ? 'Удобные оптовые закупки и стабильное снабжение'
                    : 'Ulgurji xaridlar va uzluksiz ta‘minot'}
                </h2>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {locale === 'ru'
                    ? 'Мы помогаем мебельным производствам любого масштаба получать качественные материалы вовремя, с персональными условиями и профессиональной поддержкой.'
                    : 'Kichik ustaxonalardan yirik mebel fabrikalarigacha — barcha materiallarni bitta ta‘minotchidan olish imkoniyati.'}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/${locale}/wholesale`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-surface text-xs sm:text-sm font-black rounded-xl shadow-md transition"
                  >
                    <span>{locale === 'ru' ? 'Узнать условия для B2B' : 'B2B shartlari bilan tanishish'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <Package className="w-5 h-5 text-accent" />
                  <h3 className="text-xs font-black text-heading">
                    {locale === 'ru' ? 'Широкий ассортимент' : 'Keng assortiment'}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {locale === 'ru' ? 'Все нужные позиции от ткани до скоб в одном заказе' : 'Mato, paralon, mexanizm va instrumentlar bitta joyda'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <Truck className="w-5 h-5 text-accent" />
                  <h3 className="text-xs font-black text-heading">
                    {locale === 'ru' ? 'Доставка в ваш цех' : 'Ustaxonagacha yetkazish'}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {locale === 'ru' ? 'Доставка по Ташкенту и во все регионы Узбекистана' : 'Toshkent va viloyatlardagi ishlab chiqarish sexlariga'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <PhoneCall className="w-5 h-5 text-accent" />
                  <h3 className="text-xs font-black text-heading">
                    {locale === 'ru' ? 'Персональный менеджер' : 'Shaxsiy menejer'}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {locale === 'ru' ? 'Оперативный подбор аналогов и расчет партий' : 'Materiallar tanlash va tezkor hisob-kitob'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <h3 className="text-xs font-black text-heading">
                    {locale === 'ru' ? 'Повторные заказы по SKU' : 'SKU bo‘yicha tezkor buyurtma'}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {locale === 'ru' ? 'Удобная дозакупка по кодам позиций без лишних согласований' : 'Doimiy xarid qilinadigan kodlarni 1 klikda qaytarish'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. SAMPLE BOX CTA */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-surface rounded-3xl p-6 sm:p-10 lg:p-12 border border-charcoal-700 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-accent text-surface text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                  <Package className="w-3.5 h-3.5" />
                  Sample Box
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  {locale === 'ru'
                    ? 'Закажите образцы тканей для вашего цеха или офиса'
                    : 'Ustaxonangiz uchun matolar to‘plami namunalarini oling'}
                </h2>
                <p className="text-xs sm:text-sm text-surface/80 leading-relaxed max-w-xl">
                  {locale === 'ru'
                    ? 'Выберите нужные коллекции тканей и получите раскладку образцов для согласования с клиентами и проверки качества.'
                    : 'Haqiqiy rang va fakturalarni qo‘lingizda ushlab ko‘ring. Mijozlaringizga tanlash oson bo‘lishi uchun namuna so‘rang.'}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/${locale}/sample-box`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-surface text-xs sm:text-sm font-black rounded-xl shadow-md transition"
                  >
                    <span>{locale === 'ru' ? 'Заказать Sample Box' : 'Sample Box so‘rash'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="p-4 bg-surface/10 rounded-2xl backdrop-blur-sm border border-surface/10 space-y-1">
                  <div className="text-accent font-black text-base">01</div>
                  <div className="text-xs font-bold">{locale === 'ru' ? 'Выбор коллекций' : 'Kolleksiyani tanlash'}</div>
                  <div className="text-[11px] text-surface/70">{locale === 'ru' ? 'Велюр, букле, шенилл' : 'Velyur, bukle, shenill'}</div>
                </div>
                <div className="p-4 bg-surface/10 rounded-2xl backdrop-blur-sm border border-surface/10 space-y-1">
                  <div className="text-accent font-black text-base">02</div>
                  <div className="text-xs font-bold">{locale === 'ru' ? 'Заявка' : 'So‘rov qoldirish'}</div>
                  <div className="text-[11px] text-surface/70">{locale === 'ru' ? 'Контакты и адрес' : 'Manzil va telefon'}</div>
                </div>
                <div className="p-4 bg-surface/10 rounded-2xl backdrop-blur-sm border border-surface/10 space-y-1">
                  <div className="text-accent font-black text-base">03</div>
                  <div className="text-xs font-bold">{locale === 'ru' ? 'Доставка образцов' : 'Yetkazib berish'}</div>
                  <div className="text-[11px] text-surface/70">{locale === 'ru' ? 'Прямо в ваш цех' : 'Sexingizga yetkaziladi'}</div>
                </div>
                <div className="p-4 bg-surface/10 rounded-2xl backdrop-blur-sm border border-surface/10 space-y-1">
                  <div className="text-accent font-black text-base">04</div>
                  <div className="text-xs font-bold">{locale === 'ru' ? 'Точный заказ' : 'Aniq buyurtma'}</div>
                  <div className="text-[11px] text-surface/70">{locale === 'ru' ? 'Без риска ошибки' : 'Xatosiz tanlov'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
