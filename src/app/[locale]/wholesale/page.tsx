import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WholesalePortalClient } from '@/components/b2b/WholesalePortalClient';

interface WholesalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function WholesalePage({ params }: WholesalePageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <WholesalePortalClient locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
