import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/rbac';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AccountClient } from '@/components/account/AccountClient';

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;
  const currentUser = await getCurrentUser();

  let userOrders: any[] = [];

  if (currentUser) {
    userOrders = await db.order.findMany({
      where: { userId: currentUser.id },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  const formattedOrders = userOrders.map((ord) => ({
    id: ord.id,
    number: ord.orderNumber,
    date: new Date(ord.createdAt).toLocaleDateString('uz-UZ'),
    total: ord.total,
    status: ord.orderStatus,
    items: ord.items.map((i: any) => `${i.productNameUz} (${i.quantity} ${i.unitType.toLowerCase()})`),
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <AccountClient locale={locale} currentUser={currentUser} initialOrders={formattedOrders} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
