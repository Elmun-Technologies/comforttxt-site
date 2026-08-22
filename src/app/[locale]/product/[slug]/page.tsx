import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailClient } from '@/components/pdp/ProductDetailClient';
import { ProductCard } from '@/components/product/ProductCard';
import { storefrontService } from '@/services/storefront';

interface PDPProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProductDetailPage({ params }: PDPProps) {
  const { locale, slug } = await params;

  const product = await storefrontService.getProduct(slug, locale);

  if (!product) {
    notFound();
  }

  const relatedProducts = await storefrontService.getRelatedProducts(product.id, locale);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full space-y-12">
        <ProductDetailClient product={product as any} locale={locale} />

        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-12 space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                {locale === 'ru' ? 'Сопутствующие товары' : 'Birga xarid qilishadi'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-heading tracking-tight mt-0.5">
                {locale === 'ru' ? 'Рекомендуемые Материалы и Расходники' : 'Tavsiya Etiladigan Sarf Materiallari'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp as any} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer locale={locale} />
    </div>
  );
}
