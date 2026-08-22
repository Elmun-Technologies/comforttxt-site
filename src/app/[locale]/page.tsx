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

  // Neutral fabric-type discovery cards — describe the material, make no
  // unverified performance claims (no Martindale, no Easy Clean, no Pet Friendly).
  const fabricTypes = [
    {
      nameUz: 'Velyur',
      nameRu: 'Велюр',
      descUz: 'Yumshoq baxmal faktura',
      descRu: 'Мягкая бархатистая фактура',
      image: '/images/categories/fabrics.jpg',
      href: `/${locale}/catalog/mebel-matolari?sub=velyur`,
    },
    {
      nameUz: 'Bukle',
      nameRu: 'Букле',
      descUz: 'Tugunchali zamonaviy faktura',
      descRu: 'Выразительная узелковая фактура',
      image: '/images/categories/fabrics.jpg',
      href: `/${locale}/catalog/mebel-matolari?sub=bukle`,
    },
    {
      nameUz: 'Shenill',
      nameRu: 'Шенилл',
      descUz: 'Qalin va hajmli to‘qima',
      descRu: 'Плотная объемная структура',
      image: '/images/categories/fabrics.jpg',
      href: `/${locale}/catalog/mebel-matolari?sub=shenill`,
    },
    {
      nameUz: 'Rogojka',
      nameRu: 'Рогожка',
      descUz: 'Zich to‘qilgan faktura',
      descRu: 'Плотная тканая фактура',
      image: '/images/categories/fabrics.jpg',
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
        <section className="brand-wash relative overflow-hidden bg-gradient-to-b from-secondary/70 via-background to-background pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (60%): Direct value proposition & Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full border border-border text-xs font-bold text-heading shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>
                    {locale === 'ru'
                      ? 'Ткани • Поролон • Механизмы • Фурнитура'
                      : 'Mato • Paralon • Mexanizm • Furnitura'}
                  </span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading tracking-tight leading-[1.12]">
                    {locale === 'ru'
                      ? 'Все материалы для производства мебели — в одном месте'
                      : 'Mebel ishlab chiqarish uchun kerakli mahsulotlar — bir joyda'}
                  </h1>
                  <p className="text-sm sm:text-base text-muted font-medium max-w-xl leading-relaxed">
                    {locale === 'ru'
                      ? 'Ткани, поролон, механизмы трансформации, фурнитура и профессиональные инструменты — для цехов, мастеров и фабрик.'
                      : 'Mato, paralon, mexanizm, furnitura va professional instrumentlar — sexlar, ustalar va fabrikalar uchun.'}
                  </p>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href={`/${locale}/catalog`}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent hover:bg-accent-hover text-surface font-black text-xs sm:text-sm rounded-xl shadow-brand transition active:scale-98"
                  >
                    <span>{locale === 'ru' ? 'Смотреть каталог' : 'Katalogni ko‘rish'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/${locale}/wholesale`}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-surface hover:bg-secondary text-heading border border-border font-bold text-xs sm:text-sm rounded-xl transition shadow-xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>{locale === 'ru' ? 'Для мебельных производств' : 'Mebelchilar uchun'}</span>
                  </Link>
                </div>

                {/* SKU / Search Discovery */}
                <form
                  action={`/${locale}/catalog`}
                  className="flex items-center gap-2 bg-surface border border-border rounded-xl pl-4 pr-2 py-2 shadow-sm max-w-lg"
                >
                  <Search className="w-4 h-4 text-accent flex-shrink-0" />
                  <input
                    type="search"
                    name="search"
                    placeholder={
                      locale === 'ru'
                        ? 'Поиск по названию или артикулу (SKU), например F30D'
                        : 'Nomi yoki artikul (SKU) bo‘yicha qidirish, masalan F30D'
                    }
                    className="w-full text-xs sm:text-sm font-semibold text-heading placeholder:text-muted/80 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-heading hover:bg-charcoal-800 text-surface text-xs font-black rounded-lg transition flex-shrink-0"
                  >
                    {locale === 'ru' ? 'Найти' : 'Qidirish'}
                  </button>
                </form>

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

              {/* Right Column (40%): Replaceable Material Visual Zone */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-surface">
                  <div className="aspect-[4/3] sm:aspect-square relative overflow-hidden">
                    {/* Temporary neutral visual — replace with approved Comfort Textile
                        product/material photography via storefrontConfig.heroImage */}
                    <img
                      src={storefrontConfig.heroImage}
                      alt={
                        locale === 'ru'
                          ? `Мебельные материалы ${storefrontConfig.name}`
                          : `${storefrontConfig.name} mebel materiallari`
                      }
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent flex items-end p-6">
                      <div className="text-surface space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 bg-accent text-surface text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                          <Palette className="w-3 h-3" />
                          {locale === 'ru' ? 'Материалы для мебели' : 'Mebel materiallari'}
                        </div>
                        <h2 className="text-lg sm:text-xl font-black">
                          {locale === 'ru'
                            ? 'Ткани, поролон, механизмы — одним заказом'
                            : 'Mato, paralon va mexanizmlar — bitta buyurtmada'}
                        </h2>
                        <p className="text-xs text-surface/80 font-medium">
                          {locale === 'ru'
                            ? 'Подбор по каталогу и артикулам (SKU)'
                            : 'Katalog va artikul (SKU) bo‘yicha tanlash'}
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
                {locale === 'ru' ? 'Категории материалов' : 'Materiallar kategoriyalari'}
              </h2>
              <p className="text-xs text-muted mt-0.5 font-medium">
                {locale === 'ru' ? 'Выберите раздел для заказа' : 'Buyurtma uchun kerakli yo‘nalishni tanlang'}
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
                    alt={locale === 'ru' ? cat.nameRu : cat.nameUz}
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
        {/* 3. EARLY PRODUCTS: CURATED MATERIALS */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between border-b border-border pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-accent text-xs font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === 'ru' ? 'Подборка материалов' : 'Tanlab olingan materiallar'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-heading tracking-tight">
                {locale === 'ru' ? 'Часто заказываемые позиции' : 'Ko‘p buyurtma qilinadigan materiallar'}
              </h2>
            </div>
            <Link
              href={`/${locale}/catalog`}
              className="text-xs font-bold text-accent hover:text-accent-hover inline-flex items-center gap-1 transition"
            >
              <span>{locale === 'ru' ? 'Все позиции' : 'Barchasini ko‘rish'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. FABRIC TEXTURES: WHAT TO EXPECT */}
        {/* ======================================================== */}
        <section className="bg-secondary/70 border-y border-border py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-accent text-xs font-black uppercase tracking-widest">
                {locale === 'ru' ? 'Фактуры тканей' : 'Mato fakturalari'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-heading tracking-tight">
                {locale === 'ru' ? 'Ткань — это не только цвет' : 'Mato faqat rang emas'}
              </h2>
              <p className="text-xs sm:text-sm text-muted font-medium leading-relaxed">
                {locale === 'ru'
                  ? 'Каждая фактура решает свою задачу: бархатистый велюр, узелковый букле, плотный шенилл или рогожка.'
                  : 'Har bir to‘qima o‘z vazifasiga ega: baxmal velyur, tugunchali bukle, qalin shenill yoki rogojka.'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <span>{locale === 'ru' ? 'Смотреть ткани' : 'Matolarni ko‘rish'}</span>
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
                <div className="inline-flex items-center gap-1.5 bg-accent-light text-accent border border-accent/30 px-3 py-1 rounded-full text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>{locale === 'ru' ? 'Для фабрик, цехов и мастеров' : 'Fabrika, sex va ustalar uchun'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-heading tracking-tight leading-tight">
                  {locale === 'ru'
                    ? 'Постоянные закупки — без лишних шагов'
                    : 'Doimiy xaridlar — ortiqcha qadamlarsiz'}
                </h2>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {locale === 'ru'
                    ? 'Повторные заказы по артикулам, подбор материалов под конкретную мебель и заявка на оптовые условия — на одной странице.'
                    : 'Artikullar bo‘yicha qayta buyurtma, muayyan mebelga material tanlash va ulgurji shartlarga ariza — bitta sahifada.'}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/${locale}/wholesale`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-surface text-xs sm:text-sm font-black rounded-xl shadow-md transition"
                  >
                    <span>{locale === 'ru' ? 'Условия для B2B' : 'B2B shartlari'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <Package className="w-5 h-5 text-accent" />
                  <h3 className="text-xs font-black text-heading">
                    {locale === 'ru' ? 'Ассортимент под заказ' : 'Buyurtma uchun assortiment'}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {locale === 'ru' ? 'Ткань, поролон, механизмы и расходники в одном заказе' : 'Mato, paralon, mexanizm va sarf materiallari bitta joyda'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <Truck className="w-5 h-5 text-accent" />
                  <h3 className="text-xs font-black text-heading">
                    {locale === 'ru' ? 'Доставка по заказу' : 'Buyurtma bo‘yicha yetkazish'}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {locale === 'ru' ? 'Условия и сроки подтверждает менеджер' : 'Shart va muddatlarni menejer tasdiqlaydi'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <PhoneCall className="w-5 h-5 text-accent" />
                  <h3 className="text-xs font-black text-heading">
                    {locale === 'ru' ? 'Помощь менеджера' : 'Menejer yordami'}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {locale === 'ru' ? 'Подбор аналогов и расчет партии' : 'Material tanlash va partiya hisob-kitobi'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <h3 className="text-xs font-black text-heading">
                    {locale === 'ru' ? 'Заказ по артикулам' : 'Artikul bo‘yicha buyurtma'}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {locale === 'ru' ? 'Повторная закупка по кодам позиций' : 'Doimiy xarid qilinadigan kodlar bilan qayta buyurtma'}
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
                    ? 'Образцы тканей — до принятия решения'
                    : 'Mato namunalari — qaror qabul qilishdan oldin'}
                </h2>
                <p className="text-xs sm:text-sm text-surface/80 leading-relaxed max-w-xl">
                  {locale === 'ru'
                    ? 'Выберите ткани из каталога и оставьте заявку — соберем раскладку образцов, чтобы вы и ваш клиент увидели реальные цвет и фактуру.'
                    : 'Katalogdan kerakli matolarni tanlab, so‘rov qoldiring — haqiqiy rang va fakturani qo‘lda ko‘rib chiqish uchun namunalar to‘plamini tayyorlaymiz.'}
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
                <div className="p-4 bg-surface/10 rounded-2xl border border-surface/10 space-y-1">
                  <div className="text-brand-200 font-black text-base">01</div>
                  <div className="text-xs font-bold">{locale === 'ru' ? 'Выбор тканей' : 'Matolarni tanlash'}</div>
                  <div className="text-[11px] text-surface/70">{locale === 'ru' ? 'Велюр, букле, шенилл' : 'Velyur, bukle, shenill'}</div>
                </div>
                <div className="p-4 bg-surface/10 rounded-2xl border border-surface/10 space-y-1">
                  <div className="text-brand-200 font-black text-base">02</div>
                  <div className="text-xs font-bold">{locale === 'ru' ? 'Заявка' : 'So‘rov qoldirish'}</div>
                  <div className="text-[11px] text-surface/70">{locale === 'ru' ? 'Имя и телефон' : 'Ism va telefon'}</div>
                </div>
                <div className="p-4 bg-surface/10 rounded-2xl border border-surface/10 space-y-1">
                  <div className="text-brand-200 font-black text-base">03</div>
                  <div className="text-xs font-bold">{locale === 'ru' ? 'Подготовка образцов' : 'Namunalarni tayyorlash'}</div>
                  <div className="text-[11px] text-surface/70">{locale === 'ru' ? 'Согласует менеджер' : 'Menejer tasdiqlaydi'}</div>
                </div>
                <div className="p-4 bg-surface/10 rounded-2xl border border-surface/10 space-y-1">
                  <div className="text-brand-200 font-black text-base">04</div>
                  <div className="text-xs font-bold">{locale === 'ru' ? 'Точный заказ' : 'Aniq buyurtma'}</div>
                  <div className="text-[11px] text-surface/70">{locale === 'ru' ? 'Без риска ошибки' : 'Xatosiz tanlov'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. COLLECTIONS */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-heading tracking-tight">
                {locale === 'ru' ? 'Подборки тканей' : 'Mato to‘plamlari'}
              </h2>
              <p className="text-xs text-muted mt-0.5 font-medium">
                {locale === 'ru' ? 'Готовые подборки для быстрого выбора' : 'Tez tanlash uchun tayyor to‘plamlar'}
              </p>
            </div>
            <Link
              href={`/${locale}/collections`}
              className="text-xs font-bold text-accent hover:text-accent-hover inline-flex items-center gap-1 transition"
            >
              <span>{locale === 'ru' ? 'Все подборки' : 'Barcha to‘plamlar'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/${locale}/catalog?collection=${col.slug}`}
                className="group bg-surface rounded-2xl border border-border overflow-hidden hover:border-accent/60 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-heading group-hover:text-accent transition leading-snug">
                      {col.name}
                    </h3>
                    <p className="text-[11px] text-muted leading-relaxed mt-1">
                      {locale === 'ru' ? col.descriptionRu : col.descriptionUz}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-bold text-accent">
                    <span>{locale === 'ru' ? 'Смотреть подборку' : 'To‘plamni ko‘rish'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
