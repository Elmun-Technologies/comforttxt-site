import Link from 'next/link';
import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
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
} from 'lucide-react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Fetch real products from DB
  const dbProducts = await db.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      variants: {
        where: { isActive: true },
        include: { price: true, inventory: true, images: true },
      },
      images: true,
    },
    take: 12,
  });

  // Map DB products to UI ProductCard domain structure
  const formattedProducts = dbProducts.map((p) => {
    const mainVar = p.variants[0];
    const image = mainVar?.images[0]?.url || p.images[0]?.url || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop';
    
    return {
      id: p.id,
      titleUz: p.titleUz,
      titleRu: p.titleRu,
      slug: p.slug,
      descriptionUz: p.descriptionUz,
      descriptionRu: p.descriptionRu,
      categorySlug: p.category.slug,
      unitType: p.unitType.toLowerCase(),
      isFeatured: p.isFeatured,
      isBestSeller: p.isPopular,
      variants: p.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        nameUz: v.nameUz || p.titleUz,
        nameRu: v.nameRu || p.titleRu,
        colorHex: v.colorHex || '#000000',
        colorName: locale === 'ru' ? (v.colorNameRu || 'Цвет') : (v.colorNameUz || 'Rang'),
        price: v.price?.retailPrice || 0,
        wholesalePrice: v.price?.wholesalePrice || v.price?.retailPrice || 0,
        stock: Number(v.inventory?.onHand || 0),
        images: v.images.length > 0 ? v.images.map((img) => img.url) : [image],
      })),
    };
  });

  const popularProducts = formattedProducts.filter((p) => p.isBestSeller).length > 0
    ? formattedProducts.filter((p) => p.isBestSeller)
    : formattedProducts.slice(0, 4);

  const categories = [
    {
      slug: 'mebel-matolari',
      title: locale === 'ru' ? 'Мебельные Ткани' : 'Mebel Matolari',
      desc: locale === 'ru' ? 'Велюр, букле, шенилл, рогожка, эко-кожа' : 'Velyur, bukle, shenill, rogojka, eko-charm',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
    },
    {
      slug: 'paralon',
      title: locale === 'ru' ? 'Поролон (ППУ)' : 'Paralon (Porolon)',
      desc: locale === 'ru' ? 'Марки ST, EL, HR любой толщины' : 'ST, EL, HR markali paralonlar',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop',
    },
    {
      slug: 'mexanizmlar',
      title: locale === 'ru' ? 'Механизмы Трансформации' : 'Mexanizmlar',
      desc: locale === 'ru' ? 'Газ-лифты, дельфин, аккордеон' : 'Gaz-liftlar va transformatsiyalar',
      icon: Settings,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop',
    },
    {
      slug: 'sarf-materiallar-va-instrumentlar',
      title: locale === 'ru' ? 'Клей и Инструменты' : 'Yelim va Asboblar',
      desc: locale === 'ru' ? 'Клей Akfix, скобы, пневмостеплеры' : 'Akfix sprey yelim, skoba va steplerlar',
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop',
    },
  ];

  const fabricsEditorial = [
    { title: 'Velyur', desc: 'Yumshoq baxmal tekstura', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop' },
    { title: 'Bukle', desc: 'Halqali bo\'rtma faktura', image: 'https://images.unsplash.com/photo-1540518614846-7ede433c517a?w=800&auto=format&fit=crop' },
    { title: 'Shenill', desc: 'Zich va issiq tekstura', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop' },
    { title: 'Rogojka', desc: 'Tabiiy pishiq to\'qima', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop' },
  ];

  const knowledgePosts = [
    {
      slug: 'st-vs-el-paralon-taqqoslash',
      titleUz: 'ST vs EL Paralon: Divan va Matras uchun qaysi birini tanlash kerak?',
      titleRu: 'ST vs EL Поролон: Что выбрать для дивана и матраса?',
      excerptUz: '50 000 sikl nimani anglatadi? Oliy navli matoni qanday tanlash kerak.',
      excerptRu: 'Что означают 50 000 циклов? Руководство по выбору ткани.',
      readTime: '4 min',
    },
    {
      slug: 'martindale-testi-nima',
      titleUz: 'Martindale testi nima va mebel matosining chidamliligi qanday o\'lchanadi?',
      titleRu: 'Что такое тест Мартиндейла и как измеряется износостойкость ткани?',
      excerptUz: '20 000 yoki 50 000 sikl nimani anglatadi? Uy va jamoat joylari uchun mato tanlash sirlari.',
      excerptRu: 'Что означают 20 000 или 50 000 циклов? Секреты выбора ткани для дома и HoReCa.',
      readTime: '6 min',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header locale={locale} />

      {/* HERO SECTION */}
      <section className="relative bg-background pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none rounded-l-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-surface border border-accent/20 px-4 py-2 rounded-full text-accent text-xs font-semibold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Premium Mebel Materiallari</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-heading text-balance">
              Mebelingiz uchun <br className="hidden lg:block"/>
              <span className="text-accent italic font-serif tracking-normal">mukammallik</span> asosi.
            </h1>

            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Oliy navli matolar, mustahkam paralonlar va ishonchli mexanizmlar. Dizaynerlar va professional ustalar tanlovi.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href={`/${locale}/catalog`}
                className="px-8 py-4 bg-heading hover:bg-body text-surface font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 group"
              >
                <span>Katalogni ko'rish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${locale}/sample-box`}
                className="px-8 py-4 bg-transparent hover:bg-secondary text-heading font-medium rounded-full border border-border transition-colors"
              >
                Sample Box
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative animate-zoom-in">
            <div className="relative mx-auto aspect-[4/5] max-w-md w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-surface">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7ede433c517a?w=800&auto=format&fit=crop"
                alt="Luxury Fabric"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-heading/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-surface text-accent rounded-xl shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Kafolatlangan Sifat
                  </div>
                  <div className="text-sm font-medium text-heading">100 000+ Sikl Martindale</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full relative">
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Kolleksiya</span>
          <h2 className="text-3xl sm:text-4xl font-medium text-heading tracking-tight">
            Nafislik va Sifat
          </h2>
          <p className="text-sm text-muted font-light">
            Eksklyuziv mebel yaratish uchun eng sara materiallar to'plami.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <Link
                key={idx}
                href={`/${locale}/catalog/${cat.slug}`}
                className="group relative rounded-[2rem] overflow-hidden bg-surface shadow-sm hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <div className="p-6 flex flex-col gap-2 relative bg-surface border border-t-0 border-border rounded-b-[2rem]">
                  <div className="absolute -top-6 right-6 p-3 bg-surface text-accent rounded-2xl shadow-lg border border-border group-hover:scale-110 transition-transform duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-heading pr-12">{cat.title}</h3>
                  <p className="text-xs text-muted font-light leading-relaxed">{cat.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Trend</span>
              <h2 className="text-3xl font-medium text-heading tracking-tight">
                Ko'p Tanlanayotganlar
              </h2>
            </div>
            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center text-sm font-medium text-heading hover:text-accent transition-colors group"
            >
              <span>Katalogni ochish</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {popularProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod as any} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}
