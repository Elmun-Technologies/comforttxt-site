import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { storefrontConfig } from '@/config/storefront';
import { PageHero } from '@/components/layout/PageHero';
import { EmptyState } from '@/components/ui/EmptyState';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  const telegramLink = storefrontConfig.telegramChannelUrl || storefrontConfig.telegramBotOrManagerUrl || '';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-8">
        <PageHero
          icon={BookOpen}
          kicker={locale === 'ru' ? 'База знаний' : 'Bilimlar bazasi'}
          title={locale === 'ru' ? 'Для мебельщиков' : 'Mebelchilar uchun'}
          subtitle={
            locale === 'ru'
              ? 'Материалы по выбору тканей, поролона и мебельной фурнитуры'
              : 'Mato, paralon va mebel furniturasi tanlovi bo‘yicha materiallar'
          }
        />

        {/* Neutral empty state — articles will be published with real content */}
        <EmptyState
          icon={FileQuestion}
          title={locale === 'ru' ? 'Статьи готовятся' : 'Maqolalar tayyorlanmoqda'}
          description={
            locale === 'ru'
              ? 'Полезные материалы по подбору тканей, поролона и механизмов появятся здесь. Вопросы по материалам можно задать менеджеру.'
              : 'Mato, paralon va mexanizmlar tanlovi bo‘yicha foydali materiallar tez orada shu yerda chiqadi. Materiallar bo‘yicha savollarni menejerga berishingiz mumkin.'
          }
          action={
            telegramLink ? (
              <Link
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow transition"
              >
                <span>{locale === 'ru' ? 'Спросить менеджера' : 'Menejerdan so‘rash'}</span>
              </Link>
            ) : undefined
          }
        />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
