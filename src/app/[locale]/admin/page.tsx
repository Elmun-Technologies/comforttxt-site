import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

interface AdminPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;

  const orders = await db.order.findMany({
    include: {
      items: {
        include: {
          variant: {
            include: { product: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const products = await db.product.findMany({
    include: {
      category: true,
      variants: {
        include: {
          price: true,
          inventory: true,
        },
      },
    },
  });

  const wholesaleRequests = await db.wholesaleRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const sampleRequests = await db.sampleRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const quickOrders = await db.quickOrderRequest.findMany({
    include: {
      product: true,
      variant: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const cmsBlocks = await db.cmsBlock.findMany();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <AdminDashboardClient
          orders={orders as any}
          products={products as any}
          wholesaleRequests={wholesaleRequests}
          sampleRequests={sampleRequests}
          quickOrders={quickOrders}
          cmsBlocks={cmsBlocks}
          locale={locale}
        />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
