import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { storefrontConfig } from '@/config/storefront';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  const telegramLink = storefrontConfig.telegramChannelUrl || storefrontConfig.telegramBotOrManagerUrl || '';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-accent-light text-accent px-3 py-1 rounded-full text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{locale === 'ru' ? 'База знаний' : 'Bilimlar bazasi'}</span>
          </div>
          <h1 className="text-3xl font-black text-heading tracking-tight">
            {locale === 'ru' ? 'Для мебельщиков' : 'Mebelchilar uchun'}
          </h1>
          <p className="text-xs text-muted mt-1 font-medium">
            {locale === 'ru'
              ? 'Материалы по выбору тканей, поролона и мебельной фурнитуры'
              : 'Mato, paralon va mebel furniturasi tanlovi bo‘yicha materiallar'}
          </p>
        </div>

        {/* Neutral empty state — articles will be published with real content */}
        <div className="bg-surface rounded-3xl border border-border p-12 text-center shadow-xs max-w-2xl mx-auto space-y-4">
          <FileQuestion className="w-14 h-14 text-muted/50 mx-auto stroke-1" />
          <h2 className="text-xl font-bold text-heading">
            {locale === 'ru' ? 'Статьи готовятся' : 'Maqolalar tayyorlanmoqda'}
          </h2>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            {locale === 'ru'
              ? 'Полезные материалы по подбору тканей, поролона и механизмов появятся здесь. Вопросы по материалам можно задать менеджеру.'
              : 'Mato, paralon va mexanizmlar tanlovi bo‘yicha foydali materiallar tez orada shu yerda chiqadi. Materiallar bo‘yicha savollarni menejerga berishingiz mumkin.'}
          </p>
          {telegramLink && (
            <Link
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow transition"
            >
              <span>{locale === 'ru' ? 'Спросить менеджера' : 'Menejerdan so‘rash'}</span>
            </Link>
          )}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
