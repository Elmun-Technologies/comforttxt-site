import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ToastContainer } from '@/components/ui/ToastContainer';
import '../globals.css';

// NOTE: brand fonts can be added via next/font/local once Comfort TXT
// provides font assets. The system stack below keeps the site fast and
// fully offline (no Google Fonts runtime dependency).

export const metadata = {
  title: "Comfort TXT — Mebel matolari, paralon, mexanizmlar va furnitura",
  description: "Mebel matolari, paralon, transformatsiya mexanizmlari, furnitura va professional sarf materiallari — katalog va SKU bo‘yicha buyurtma",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-background text-body antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
