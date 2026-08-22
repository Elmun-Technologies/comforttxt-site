import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { brandIdentity } from '@/config/brand';
import '../globals.css';

// The brandbook's licensed font files can be added through next/font/local
// when delivered. The current stack stays local and has no runtime font fetch.

export const metadata = {
  title: `${brandIdentity.name} — Mebel matolari, paralon, mexanizmlar va furnitura`,
  description: "Mebel matolari, paralon, transformatsiya mexanizmlari, furnitura va professional sarf materiallari — katalog va SKU bo‘yicha buyurtma",
};

export const viewport = {
  themeColor: brandIdentity.colors.primary,
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
