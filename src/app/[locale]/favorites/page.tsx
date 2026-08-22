import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FavoritesClient } from '@/components/favorites/FavoritesClient';
import { storefrontService } from '@/services/storefront';

interface FavoritesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { locale } = await params;
  const allProducts = await storefrontService.getProducts({}, locale);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <FavoritesClient allProducts={allProducts as any} locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
