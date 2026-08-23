import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { brandIdentity } from '@/config/brand';
import { storefrontConfig } from '@/config/storefront';
import { exo2 } from '@/lib/fonts';
import '../globals.css';

// Absolute base for resolving Open Graph / icon URLs. Set NEXT_PUBLIC_SITE_URL
// to the production origin at deploy time.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: `${brandIdentity.name} — Mebel matolari, paralon, mexanizmlar va furnitura`,
  description: "Mebel matolari, paralon, transformatsiya mexanizmlari, furnitura va professional sarf materiallari — katalog va SKU bo‘yicha buyurtma",
  // Approved Comfort Textile badge drives the tab icon, the iOS home-screen
  // icon and the social preview image.
  ...(storefrontConfig.logo.image
    ? {
        icons: {
          icon: storefrontConfig.logo.image,
          apple: '/images/brand/apple-touch-icon.png',
        },
        openGraph: {
          title: `${brandIdentity.name} — Mebel matolari, paralon, mexanizmlar va furnitura`,
          siteName: brandIdentity.name,
          images: [{ url: storefrontConfig.logo.image }],
        },
      }
    : {}),
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
    <html lang={locale} className={exo2.variable}>
      <body className="bg-background text-body antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
