import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AccountClient } from '@/components/account/AccountClient';
import { storefrontService } from '@/services/storefront';

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;

  // No fake customer data by default: the mock service returns null / [].
  // ShopFlow will later provide the real customer profile and orders.
  const customer = await storefrontService.getCustomer('current');
  const orders = customer ? await storefrontService.getCustomerOrders(customer.id) : [];

  const formattedOrders = orders.map((ord) => ({
    id: ord.id,
    number: ord.orderNumber,
    date: new Date(ord.createdAt).toLocaleDateString('uz-UZ'),
    total: ord.total,
    status: ord.status,
    items: ord.items.map((i) => `${i.productTitle} - ${i.sku} (${i.quantity} ${i.unitType})`),
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <AccountClient locale={locale} currentUser={customer} initialOrders={formattedOrders} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
