import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Outfit, Inter } from 'next/font/google';
import { ToastContainer } from '@/components/ui/ToastContainer';
import '../globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "Comfort TXT — Premium Mebel Matolari va Paralon Ulgurji Platformasi",
  description: "Mebel matolari, paralon ST/EL, mexanizmlar va sarf materiallarini ulgurji hamda chakana sotish platformasi",
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
    <html lang={locale} className={`${outfit.variable} ${inter.variable}`}>
      <body className="bg-background text-body antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
