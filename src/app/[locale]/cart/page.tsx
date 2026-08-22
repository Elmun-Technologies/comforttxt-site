import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartClient } from '@/components/cart/CartClient';

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <CartClient locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
