import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CompareClient } from '@/components/compare/CompareClient';

interface ComparePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <CompareClient locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
