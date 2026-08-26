import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { storefrontService } from '@/services/storefront';
import { storefrontConfig } from '@/config/storefront';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Package,
  ShieldCheck,
  Ruler,
  Layers,
  Truck,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const homepageData = await storefrontService.getHomepage(locale);

  const { heroCategories, popularProducts, collections } = homepageData;
  const isRu = locale === 'ru';

  // Neutral fabric-type discovery rows — describe the material, make no
  // unverified performance claims (no Martindale, no Easy Clean, no Pet Friendly).
  const fabricTypes = [
    {
      nameUz: 'Velyur',
      nameRu: 'Велюр',
      descUz: 'Yumshoq baxmal faktura. Divan va kreslolar uchun klassik tanlov.',
      descRu: 'Мягкая бархатистая фактура. Классический выбор для диванов и кресел.',
      texture: 'tex-velvet',
      href: `/${locale}/catalog/mebel-matolari?sub=velyur`,
    },
    {
      nameUz: 'Bukle',
      nameRu: 'Букле',
      descUz: 'Tugunchali faktura. Zamonaviy interyerlarga karakter beradi.',
      descRu: 'Узелковая фактура. Придаёт характер современным интерьерам.',
      texture: 'tex-boucle',
      href: `/${locale}/catalog/mebel-matolari?sub=bukle`,
    },
    {
      nameUz: 'Shenill',
      nameRu: 'Шенилл',
      descUz: 'Qalin, hajmli to‘qima. Eskirishga chidamli kundalik mebel uchun.',
      descRu: 'Плотная объёмная структура. Для мебели ежедневного использования.',
      texture: 'tex-chenille',
      href: `/${locale}/catalog/mebel-matolari?sub=shenill`,
    },
    {
      nameUz: 'Rogojka',
      nameRu: 'Рогожка',
      descUz: 'Zich to‘qilgan faktura. Minimalistik va skandinav uslubi uchun.',
      descRu: 'Плотное тканое переплетение. Для минималистичного стиля.',
      texture: 'tex-rogojka',
      href: `/${locale}/catalog/mebel-matolari?sub=rogojka`,
    },
  ];

  // Running ticker — the workshop vocabulary as a moving strip.
  const tickerWords = isRu
    ? ['Велюр', 'Букле', 'Шенилл', 'Рогожка', 'Микрофибра', 'Эко-кожа', 'Поролон ST', 'Поролон EL', 'Поролон HR', 'Механизмы', 'Фурнитура', 'Клей', 'Скобы', 'Ножки']
    : ['Velyur', 'Bukle', 'Shenill', 'Rogojka', 'Mikrofibra', 'Eko-charm', 'Paralon ST', 'Paralon EL', 'Paralon HR', 'Mexanizmlar', 'Furnitura', 'Yelim', 'Skobalar', 'Oyoqlar'];

  // B2B steps — what a workshop actually does with this store.
  const b2bSteps = [
    {
      num: '01',
      icon: Search,
      titleUz: 'Artikul bo‘yicha buyurtma',
      titleRu: 'Заказ по артикулу',
      textUz: 'Ishlatayotgan mato kodini kiriting — o‘sha pozitsiyani yoki o‘xshashini topamiz.',
      textRu: 'Введите код используемой ткани — найдём ту же позицию или аналог.',
    },
    {
      num: '02',
      icon: Layers,
      titleUz: 'Hajmga qarab narx',
      titleRu: 'Цена от объёма',
      textUz: 'Partiya qancha katta bo‘lsa, bir metr narxi shuncha tushadi. Pog‘onalar ochiq ko‘rsatilgan.',
      textRu: 'Чем больше партия, тем ниже цена за метр. Ступени показаны открыто.',
    },
    {
      num: '03',
      icon: Package,
      titleUz: 'Sample Box — oldin ko‘ring',
      titleRu: 'Sample Box — сначала посмотрите',
      textUz: 'Mijozga ko‘rsatishdan oldin mato namunasini qo‘lingizda ushlab ko‘ring.',
      textRu: 'Подержите образец ткани в руках, прежде чем показывать клиенту.',
    },
    {
      num: '04',
      icon: Truck,
      titleUz: 'Sexga yetkazish',
      titleRu: 'Доставка в цех',
      textUz: 'Yetkazish shartlari va muddatini menejer buyurtmangizga qarab tasdiqlaydi.',
      textRu: 'Условия и сроки доставки менеджер подтверждает под ваш заказ.',
    },
  ];

  const tickerRow = (words: string[]) => (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cream-200/90">
            {w}
          </span>
          <span className="text-brand-300">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1">
        {/* ======================================================== */}
        {/* 1. HERO — dark atelier cover                              */}
        {/* ======================================================== */}
        <section className="relative bg-charcoal-950 text-surface overflow-hidden">
          {/* Faint ring motif + warm light from the top-right */}
          <div aria-hidden="true" className="pattern-rings-dark pattern-fade absolute inset-0 pointer-events-none opacity-60" />
          <div
            aria-hidden="true"
            className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(40,53,147,0.16), transparent 65%)' }}
          />
          <div aria-hidden="true" className="paper-grain absolute inset-0 pointer-events-none opacity-60" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-14 sm:pt-16 lg:pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* ── Left: the promise ── */}
              <div className="lg:col-span-7 space-y-7">
                <div className="brand-kicker text-cream-200/70 animate-fade-in-up">
                  <span className="brand-rule" />
                  <span>
                    {isRu
                      ? 'Comfort Textile · база для мебельных производств'
                      : 'Comfort Textile · mebel ishlab chiqaruvchilar bazasi'}
                  </span>
                </div>

                <h1 className="text-[2.5rem] leading-[1.04] sm:text-6xl xl:text-[4.4rem] font-black text-surface tracking-tight text-balance">
                  {isRu ? (
                    <>
                      Материалы для цеха.
                      <br />
                      <span className="text-brand-300">Одним заказом.</span>
                    </>
                  ) : (
                    <>
                      Sex uchun materiallar.
                      <br />
                      <span className="text-brand-300">Bitta buyurtmada.</span>
                    </>
                  )}
                </h1>

                <p className="text-sm sm:text-base text-cream-200/75 font-medium leading-relaxed max-w-xl">
                  {isRu
                    ? 'Ткани, поролон ST/EL/HR, механизмы трансформации, фурнитура и расходники — с ценами, артикулами и остатками. Для цехов, мастеров и фабрик.'
                    : 'Mato, ST/EL/HR paralon, transformatsiya mexanizmlari, furnitura va sarf materiallari — narxi, artikuli va ombor qoldig‘i bilan. Sexlar, ustalar va fabrikalar uchun.'}
                </p>

                {/* SKU search — the workshop habit */}
                <form
                  action={`/${locale}/catalog`}
                  className="relative flex items-center gap-2 bg-surface rounded-2xl pl-5 pr-2 py-2 shadow-brand max-w-xl border border-cream-300"
                >
                  <Search className="w-4 h-4 text-accent flex-shrink-0" />
                  <input
                    type="search"
                    name="search"
                    placeholder={isRu ? 'Название или артикул (SKU), например 8016' : 'Nomi yoki artikul (SKU), masalan 8016'}
                    className="w-full text-xs sm:text-sm font-semibold text-heading placeholder:text-muted bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="btn-sheen px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface text-xs font-black rounded-xl transition flex-shrink-0"
                  >
                    {isRu ? 'Найти' : 'Qidirish'}
                  </button>
                </form>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/${locale}/catalog`}
                    className="btn-sheen inline-flex items-center gap-2.5 px-7 py-4 bg-accent hover:bg-accent-hover text-surface font-black text-xs sm:text-sm rounded-xl shadow-accent-glow transition active:scale-98"
                  >
                    <span>{isRu ? 'Открыть каталог' : 'Katalogni ochish'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/${locale}/wholesale`}
                    className="inline-flex items-center gap-2 px-5 py-4 bg-surface/5 hover:bg-surface/10 text-cream-100 border border-surface/20 font-bold text-xs sm:text-sm rounded-xl transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-brand-300" />
                    <span>{isRu ? 'Условия для B2B' : 'Ulgurji shartlar'}</span>
                  </Link>
                </div>

                {/* Workshop facts — honest, verifiable */}
                <div className="grid grid-cols-3 gap-4 max-w-lg pt-2 border-t border-surface/10">
                  {[
                    { v: '100+', l: isRu ? 'позиций (SKU)' : 'ta pozitsiya (SKU)' },
                    { v: '5', l: isRu ? 'направлений' : 'ta yo‘nalish' },
                    { v: '0,5 м', l: isRu ? 'шаг отреза тканей' : 'mato kesish qadami' },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="text-xl sm:text-2xl font-black text-surface">{s.v}</div>
                      <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-cream-200/60 mt-1">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: material still-life (mobile: compact strip) ── */}
              <div className="lg:col-span-5 relative md:hidden">
                <div className="relative rounded-2xl overflow-hidden border border-surface/10 shadow-brand">
                  <img
                    src="/images/hero-fabric-rolls.jpg"
                    alt={isRu ? 'Рулоны мебельных тканей' : 'Mebel matolari rulonlari'}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/10 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-cream-200/70">
                        {isRu ? 'Склад · Ташкент' : 'Ombor · Toshkent'}
                      </div>
                      <div className="text-xs font-black text-surface mt-0.5">
                        {isRu ? 'Velyur · Букле · Шенилл' : 'Velyur · Bukle · Shenill'}
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      <span className="swatch-fabric w-6 h-6 rounded-full border-2 border-surface/70 tex-velvet" />
                      <span className="swatch-fabric w-6 h-6 rounded-full border-2 border-surface/70 tex-boucle" />
                      <span className="swatch-fabric w-6 h-6 rounded-full border-2 border-surface/70 tex-chenille" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative hidden md:block">
                <div className="relative">
                  {/* Offset blue frame */}
                  <div aria-hidden="true" className="absolute -inset-3 rounded-[30px] border border-accent/50 translate-x-5 translate-y-5 pointer-events-none" />

                  <div className="relative rounded-3xl overflow-hidden shadow-brand border border-surface/10">
                    <img
                      src="/images/hero-fabric-rolls.jpg"
                      alt={isRu ? 'Рулоны мебельных тканей' : 'Mebel matolari rulonlari'}
                      className="w-full h-full object-cover aspect-[4/5]"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />

                    {/* corner ticks */}
                    <span aria-hidden="true" className="corner-tick corner-tick-tl text-cream-200/70" />
                    <span aria-hidden="true" className="corner-tick corner-tick-tr text-cream-200/70" />
                    <span aria-hidden="true" className="corner-tick corner-tick-bl text-cream-200/70" />
                    <span aria-hidden="true" className="corner-tick corner-tick-br text-cream-200/70" />

                    {/* Caption */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream-200/70">
                          {isRu ? 'Склад · Ташкент' : 'Ombor · Toshkent'}
                        </div>
                        <div className="text-sm font-black text-surface mt-1">
                          {isRu ? 'Velyur · Букле · Шенилл' : 'Velyur · Bukle · Shenill'}
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        <span className="swatch-fabric w-7 h-7 rounded-full border-2 border-surface/70 tex-velvet" />
                        <span className="swatch-fabric w-7 h-7 rounded-full border-2 border-surface/70 tex-boucle" />
                        <span className="swatch-fabric w-7 h-7 rounded-full border-2 border-surface/70 tex-chenille" />
                      </div>
                    </div>
                  </div>

                  {/* Floating SKU card */}
                  <div className="absolute -left-6 top-8 animate-float-slow">
                    <div className="glass-card rounded-2xl px-4 py-3 border-surface/20 shadow-brand">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-charcoal-950 text-brand-300 flex items-center justify-center font-mono text-[10px] font-bold">
                          F30D
                        </span>
                        <div>
                          <div className="text-[10px] font-bold text-muted uppercase tracking-wider">
                            {isRu ? 'В наличии' : 'Omborda'}
                          </div>
                          <div className="text-sm font-black text-heading">340 м</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating price tag */}
                  <div className="absolute -right-4 bottom-16 animate-float-slow" style={{ animationDelay: '1.2s' }}>
                    <div className="bg-accent text-surface rounded-2xl px-4 py-2.5 shadow-accent-glow">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand-100">
                        {isRu ? 'От 10 м — опт' : '10 m dan — ulgurji'}
                      </div>
                      <div className="text-sm font-black">
                        {isRu ? '−9% за метр' : '−9% metriga'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Ticker ── */}
          <div className="relative border-t border-surface/10 bg-charcoal-900/60 backdrop-blur-sm py-3.5 overflow-hidden">
            <div className="marquee-track">
              <div className="flex items-center shrink-0">{tickerRow(tickerWords)}</div>
              <div className="flex items-center shrink-0" aria-hidden="true">{tickerRow(tickerWords)}</div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. CATEGORIES — staggered editorial grid                 */}
        {/* ======================================================== */}
        <section className="paper-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-10">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="section-index">01 / {isRu ? 'Каталог' : 'Katalog'}</div>
                <h2 className="text-3xl sm:text-5xl font-black text-heading tracking-tight leading-[1.05] text-balance">
                  {isRu ? (
                    <>Пять направлений.<br /><span className="text-muted font-medium">Весь цех в одном месте.</span></>
                  ) : (
                    <>Besh yo‘nalish.<br /><span className="text-muted font-medium">Butun sex bir joyda.</span></>
                  )}
                </h2>
              </div>
              <Link
                href={`/${locale}/catalog`}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-black text-accent hover:text-accent-hover uppercase tracking-wider transition shrink-0"
              >
                <span>{isRu ? 'Весь каталог' : 'Barcha katalog'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Staggered 7/5 — 5/7 — full-width rows */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
              {heroCategories.slice(0, 2).map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/${locale}/catalog/${cat.slug}`}
                  className={`group relative rounded-3xl overflow-hidden border border-border/70 bg-charcoal-950 text-surface transition-all duration-300 hover:shadow-card-hover ${
                    idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                  }`}
                >
                  <div className="absolute inset-0">
                    <img
                      src={cat.image}
                      alt={isRu ? cat.nameRu : cat.nameUz}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/25 to-transparent" />
                  </div>
                  <div className="relative p-6 sm:p-8 min-h-[300px] sm:min-h-[360px] flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-brand-300">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-surface/10 backdrop-blur-sm border border-surface/20 text-[10px] font-bold uppercase tracking-wider text-cream-200">
                        {cat.productCount} {isRu ? 'позиций' : 'ta pozitsiya'}
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      <h3 className="text-2xl sm:text-3xl font-black text-surface tracking-tight">
                        {isRu ? cat.nameRu : cat.nameUz}
                      </h3>
                      <p className="text-xs sm:text-sm text-cream-200/80 font-medium leading-relaxed max-w-md">
                        {isRu ? cat.descriptionRu : cat.descriptionUz}
                      </p>
                      <div className="pt-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-300">
                        <span>{isRu ? 'Смотреть раздел' : 'Bo‘limni ko‘rish'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <span aria-hidden="true" className="corner-tick corner-tick-tl text-brand-300/80" />
                  <span aria-hidden="true" className="corner-tick corner-tick-br text-brand-300/80" />
                </Link>
              ))}

              {heroCategories.slice(2, 4).map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/${locale}/catalog/${cat.slug}`}
                  className={`group relative rounded-3xl overflow-hidden border border-border/70 bg-charcoal-950 text-surface transition-all duration-300 hover:shadow-card-hover ${
                    idx === 0 ? 'lg:col-span-5' : 'lg:col-span-7'
                  }`}
                >
                  <div className="absolute inset-0">
                    <img
                      src={cat.image}
                      alt={isRu ? cat.nameRu : cat.nameUz}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/25 to-transparent" />
                  </div>
                  <div className="relative p-6 sm:p-8 min-h-[300px] sm:min-h-[360px] flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-brand-300">
                        {String(idx + 3).padStart(2, '0')}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-surface/10 backdrop-blur-sm border border-surface/20 text-[10px] font-bold uppercase tracking-wider text-cream-200">
                        {cat.productCount} {isRu ? 'позиций' : 'ta pozitsiya'}
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      <h3 className="text-2xl sm:text-3xl font-black text-surface tracking-tight">
                        {isRu ? cat.nameRu : cat.nameUz}
                      </h3>
                      <p className="text-xs sm:text-sm text-cream-200/80 font-medium leading-relaxed max-w-md">
                        {isRu ? cat.descriptionRu : cat.descriptionUz}
                      </p>
                      <div className="pt-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-300">
                        <span>{isRu ? 'Смотреть раздел' : 'Bo‘limni ko‘rish'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <span aria-hidden="true" className="corner-tick corner-tick-tl text-brand-300/80" />
                  <span aria-hidden="true" className="corner-tick corner-tick-br text-brand-300/80" />
                </Link>
              ))}

              {/* Fifth category — wide horizontal card */}
              {heroCategories[4] && (
                <Link
                  href={`/${locale}/catalog/${heroCategories[4].slug}`}
                  className="group relative lg:col-span-12 rounded-3xl overflow-hidden border border-border/70 bg-charcoal-950 text-surface transition-all duration-300 hover:shadow-card-hover"
                >
                  <div className="absolute inset-0">
                    <img
                      src={heroCategories[4].image}
                      alt={isRu ? heroCategories[4].nameRu : heroCategories[4].nameUz}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/50 to-transparent" />
                  </div>
                  <div className="relative p-6 sm:p-10 min-h-[220px] sm:min-h-[240px] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div className="space-y-2.5 max-w-lg">
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-brand-300">05</span>
                      <h3 className="text-2xl sm:text-4xl font-black text-surface tracking-tight">
                        {isRu ? heroCategories[4].nameRu : heroCategories[4].nameUz}
                      </h3>
                      <p className="text-xs sm:text-sm text-cream-200/80 font-medium leading-relaxed">
                        {isRu ? heroCategories[4].descriptionRu : heroCategories[4].descriptionUz}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="px-3 py-1.5 rounded-full bg-surface/10 backdrop-blur-sm border border-surface/20 text-[11px] font-bold uppercase tracking-wider text-cream-200">
                        {heroCategories[4].productCount} {isRu ? 'позиций' : 'ta pozitsiya'}
                      </span>
                      <span className="w-11 h-11 rounded-full border border-brand-300/60 flex items-center justify-center text-brand-300 group-hover:bg-accent group-hover:text-surface group-hover:border-accent transition">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                  <span aria-hidden="true" className="corner-tick corner-tick-tr text-brand-300/80" />
                  <span aria-hidden="true" className="corner-tick corner-tick-bl text-brand-300/80" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. POPULAR — what workshops actually re-order            */}
        {/* ======================================================== */}
        <section className="bg-secondary/60 border-y border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-10">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="section-index">02 / {isRu ? 'Ходовые позиции' : 'Talabgir pozitsiyalar'}</div>
                <h2 className="text-3xl sm:text-5xl font-black text-heading tracking-tight leading-[1.05] text-balance">
                  {isRu ? (
                    <>Чаще всего заказывают<br /><span className="text-muted font-medium">в мебельных цехах.</span></>
                  ) : (
                    <>Mebel sexlari<br /><span className="text-muted font-medium">eng ko‘p buyurtma qiladi.</span></>
                  )}
                </h2>
              </div>
              <Link
                href={`/${locale}/catalog`}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-black text-accent hover:text-accent-hover uppercase tracking-wider transition shrink-0"
              >
                <span>{isRu ? 'Все позиции' : 'Barcha pozitsiyalar'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>

            <div className="flex sm:hidden justify-center">
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center gap-2 text-xs font-black text-accent uppercase tracking-wider"
              >
                <span>{isRu ? 'Все позиции' : 'Barcha pozitsiyalar'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. FABRIC TEXTURES — cloth you can almost touch           */}
        {/* ======================================================== */}
        <section className="paper-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
            <div className="max-w-2xl space-y-3">
              <div className="section-index">03 / {isRu ? 'Фактуры' : 'Fakturalar'}</div>
              <h2 className="text-3xl sm:text-5xl font-black text-heading tracking-tight leading-[1.05] text-balance">
                {isRu ? 'Ткань — это не только цвет.' : 'Mato — faqat rang emas.'}
              </h2>
              <p className="text-sm text-muted font-medium leading-relaxed">
                {isRu
                  ? 'Каждая фактура решает свою задачу в конструкции мебели. Выберите свою — и смотрите ткани этой фактуры в каталоге.'
                  : 'Har bir faktura mebel konstruksiyasida o‘z vazifasini bajaradi. O‘zingiznikini tanlang — va shu fakturadagi matolarni katalogda ko‘ring.'}
              </p>
            </div>

            <div className="divide-y divide-border/70 border-y border-border/70">
              {fabricTypes.map((item, idx) => (
                <Link key={idx} href={item.href} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8 py-6 sm:py-7">
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-accent w-8">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-5 sm:gap-8 min-w-0">
                    <span
                      className={`${item.texture} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shrink-0 border border-charcoal-900/10 shadow-xs group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300`}
                    />
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-3xl font-black text-heading tracking-tight group-hover:text-accent transition">
                        {isRu ? item.nameRu : item.nameUz}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted font-medium leading-relaxed mt-1 line-clamp-2">
                        {isRu ? item.descRu : item.descUz}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-wider text-accent shrink-0">
                    <span>{isRu ? 'Смотреть' : 'Ko‘rish'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="sm:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center text-accent shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. B2B — for workshops, written like a workshop           */}
        {/* ======================================================== */}
        <section className="relative bg-charcoal-950 text-surface overflow-hidden">
          <div aria-hidden="true" className="pattern-rings-dark pattern-fade absolute inset-0 pointer-events-none opacity-50" />
          <div
            aria-hidden="true"
            className="absolute -bottom-52 -left-52 w-[560px] h-[560px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(40,53,147,0.35), transparent 65%)' }}
          />
          <div aria-hidden="true" className="paper-grain absolute inset-0 pointer-events-none opacity-60" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Workshop photo */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[30px] border border-accent/40 -translate-x-4 translate-y-4 pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden shadow-brand border border-surface/10">
                <img
                  src="/images/workshop-hands.jpg"
                  alt={isRu ? 'Руки мастера в мебельном цехе' : 'Mebel sexida usta qo‘llari'}
                  className="w-full h-full object-cover aspect-[4/5]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream-200/70">
                    {isRu ? 'Работа с тканью · замер' : 'Mato bilan ish · o‘lchov'}
                  </div>
                  <div className="text-sm font-black text-surface mt-1">
                    {isRu ? 'Точный отрез под заказ' : 'Buyurtmaga aniq kesim'}
                  </div>
                </div>
                <span aria-hidden="true" className="corner-tick corner-tick-tl text-brand-300/80" />
                <span aria-hidden="true" className="corner-tick corner-tick-br text-brand-300/80" />
              </div>
            </div>

            {/* Copy + steps */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3 max-w-xl">
                <div className="brand-kicker text-cream-200/70">
                  <span className="brand-rule" />
                  <span>{isRu ? 'Для фабрик, цехов и мастеров' : 'Fabrika, sex va ustalar uchun'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-surface tracking-tight leading-[1.05] text-balance">
                  {isRu ? (
                    <>Вы делаете мебель.<br /><span className="text-brand-300">Мы даём материал.</span></>
                  ) : (
                    <>Siz mebel yasaysiz.<br /><span className="text-brand-300">Biz material beramiz.</span></>
                  )}
                </h2>
                <p className="text-sm text-cream-200/75 font-medium leading-relaxed">
                  {isRu
                    ? 'Постоянные закупки — без лишних шагов: повторные заказы по артикулам, цена от объёма партии и доставка в цех.'
                    : 'Doimiy xaridlar — ortiqcha qadamlarsiz: artikul bo‘yicha qayta buyurtma, partiya hajmiga qarab narx va sexgacha yetkazib berish.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {b2bSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.num} className="group relative bg-surface/5 border border-surface/10 rounded-2xl p-5 hover:border-accent/50 hover:bg-surface/10 transition">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-surface/15 group-hover:text-accent/40 transition select-none">
                          {step.num}
                        </span>
                        <Icon className="w-5 h-5 text-brand-300" />
                      </div>
                      <h3 className="text-sm font-black text-surface mt-3">
                        {isRu ? step.titleRu : step.titleUz}
                      </h3>
                      <p className="text-xs text-cream-200/65 font-medium leading-relaxed mt-1.5">
                        {isRu ? step.textRu : step.textUz}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/${locale}/wholesale`}
                  className="btn-sheen inline-flex items-center gap-2.5 px-7 py-4 bg-accent hover:bg-accent-hover text-surface font-black text-xs sm:text-sm rounded-xl shadow-accent-glow transition active:scale-98"
                >
                  <span>{isRu ? 'Условия для B2B' : 'B2B shartlari'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/sample-box`}
                  className="inline-flex items-center gap-2 px-5 py-4 bg-surface/5 hover:bg-surface/10 text-cream-100 border border-surface/20 font-bold text-xs sm:text-sm rounded-xl transition"
                >
                  <Package className="w-4 h-4 text-brand-300" />
                  <span>{isRu ? 'Sample Box' : 'Sample Box'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. SAMPLE BOX — stitched CTA panel                       */}
        {/* ======================================================== */}
        <section className="paper-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="relative bg-surface rounded-[26px] p-6 sm:p-10 lg:p-14 shadow-brand-sm overflow-hidden">
              <div className="absolute inset-4 rounded-[22px] border border-dashed border-accent/50 pointer-events-none" />
              <span aria-hidden="true" className="corner-tick corner-tick-tl text-accent" />
              <span aria-hidden="true" className="corner-tick corner-tick-tr text-accent" />
              <span aria-hidden="true" className="corner-tick corner-tick-bl text-accent" />
              <span aria-hidden="true" className="corner-tick corner-tick-br text-accent" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="section-index">04 / Sample Box</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-heading tracking-tight leading-[1.05] text-balance">
                    {isRu
                      ? 'Сначала в руки — потом в заказ.'
                      : 'Avval qo‘lda ko‘ring — keyin buyurtma qiling.'}
                  </h2>
                  <p className="text-sm text-muted font-medium leading-relaxed max-w-lg">
                    {isRu
                      ? 'Выберите ткани из каталога и оставьте заявку — соберём раскладку образцов, чтобы вы и ваш клиент увидели реальные цвет и фактуру до заказа.'
                      : 'Katalogdan matolarni tanlab, so‘rov qoldiring — siz va mijozingiz haqiqiy rang va fakturani buyurtmadan oldin ko‘rishingiz uchun namunalar to‘plamini tayyorlaymiz.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/${locale}/sample-box`}
                      className="btn-sheen inline-flex items-center gap-2.5 px-7 py-4 bg-accent hover:bg-accent-hover text-surface font-black text-xs sm:text-sm rounded-xl shadow-brand-sm transition active:scale-98"
                    >
                      <span>{isRu ? 'Заказать Sample Box' : 'Sample Box so‘rash'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-muted">
                      <PhoneCall className="w-3.5 h-3.5 text-accent" />
                      {isRu ? 'Согласует менеджер' : 'Menejer tasdiqlaydi'}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 gap-3">
                  {[
                    { n: '01', tUz: 'Matolarni tanlash', tRu: 'Выбор тканей', dUz: 'Velyur, bukle, shenill, rogojka', dRu: 'Велюр, букле, шенилл, рогожка' },
                    { n: '02', tUz: 'So‘rov qoldirish', tRu: 'Заявка', dUz: 'Ism va telefon', dRu: 'Имя и телефон' },
                    { n: '03', tUz: 'Namunalarni tayyorlash', tRu: 'Подготовка образцов', dUz: 'Menejer tasdiqlaydi', dRu: 'Согласует менеджер' },
                    { n: '04', tUz: 'Aniq buyurtma', tRu: 'Точный заказ', dUz: 'Xatosiz tanlov', dRu: 'Выбор без ошибок' },
                  ].map((s) => (
                    <div key={s.n} className="bg-cream-200/60 rounded-2xl p-4 sm:p-5 border border-border/60">
                      <div className="font-mono text-[11px] font-bold tracking-[0.2em] text-accent">{s.n}</div>
                      <div className="text-sm font-black text-heading mt-2">{isRu ? s.tRu : s.tUz}</div>
                      <div className="text-[11px] text-muted font-medium mt-1">{isRu ? s.dRu : s.dUz}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro trust row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
              {[
                { icon: Ruler, tUz: '0,5 m qadam bilan kesish', tRu: 'Отрез с шагом 0,5 м' },
                { icon: Layers, tUz: 'ST / EL / HR paralon zaxiralari', tRu: 'Поролон ST / EL / HR в наличии' },
                { icon: CheckCircle2, tUz: 'SKU bo‘yicha qayta buyurtma', tRu: 'Повторный заказ по SKU' },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.tUz} className="flex items-center gap-3.5 border-b border-border/70 pb-5">
                    <Icon className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-heading">{isRu ? f.tRu : f.tUz}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
