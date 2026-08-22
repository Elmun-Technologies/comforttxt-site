import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { db } from '@/lib/db';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CollectionsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CollectionsPage({ params }: CollectionsPageProps) {
  const { locale } = await params;

  const dbCollections = await db.collection.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-accent-light text-accent px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusives</span>
          </div>
          <h1 className="text-3xl font-black text-heading tracking-tight">
            {locale === 'ru' ? 'Мебельные Коллекции' : 'Mebel Kolleksiyalari'}
          </h1>
          <p className="text-xs text-muted mt-1 font-medium">
            {locale === 'ru'
              ? 'Премиальные дизайны и сочетания тканей для вашей мебели'
              : 'Dizaynerlik mebellari uchun oliy navli mato to\'plamlari'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dbCollections.map((col) => {
            const count = col._count.products;
            return (
              <div
                key={col.id}
                className="bg-surface rounded-3xl border border-border overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={col.coverImage || ''} alt={col.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent flex items-end p-6">
                    <div className="text-surface space-y-1">
                      <span className="bg-accent text-surface font-black text-[10px] uppercase px-2 py-0.5 rounded">
                        Collection
                      </span>
                      <h2 className="text-2xl font-black">{col.name}</h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-body leading-relaxed">
                    {locale === 'ru' ? col.descriptionRu : col.descriptionUz}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-xs font-semibold text-muted">
                      {count} {locale === 'ru' ? 'позиций' : 'ta mahsulot'}
                    </span>
                    <Link
                      href={`/${locale}/catalog?collection=${col.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover"
                    >
                      <span>{locale === 'ru' ? 'Смотреть коллекцию' : 'Kolleksiyani ko\'rish'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
