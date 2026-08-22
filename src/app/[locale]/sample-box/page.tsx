import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SampleBoxClient } from '@/components/b2b/SampleBoxClient';
import { storefrontService } from '@/services/storefront';

interface SampleBoxPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SampleBoxPage({ params }: SampleBoxPageProps) {
  const { locale } = await params;

  const fabrics = await storefrontService.getProducts({ categorySlug: 'mebel-matolari' }, locale);
  const collections = await storefrontService.getCollections(locale);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <SampleBoxClient collections={collections as any} fabrics={fabrics as any} locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
