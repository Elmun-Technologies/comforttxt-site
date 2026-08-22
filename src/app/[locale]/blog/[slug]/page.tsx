import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params;

  const post = {
    slug,
    titleUz: 'Martindale nima va mebel matosi chidamliligi qanday o\'lchanadi?',
    titleRu: 'Что такое тест Мартиндейла и как измеряется износостойкость?',
    excerptUz: '50 000 sikl nimani anglatadi? Mebel sexlari va retail uchun to\'g\'ri tanlov.',
    excerptRu: 'Что означают 50 000 циклов? Руководство по выбору ткани.',
    contentUz: 'Martindale testi mebel matolarining ishqalanishga chidamliligini aniqlashning xalqaro standarti hisoblanadi. Maxsus apparat matoga doimiy ishqalanish beradi va necha siklda tola uzilishi hisoblab boriladi. Mebel sexlari va fabrikalar uchun 30 000+ sikl matolar maishiy foydalanishga, 50 000+ sikl esa tijorat joylari va mehmonxonalar uchun ideal hisoblanadi.',
    contentRu: 'Тест Мартиндейла — международный стандарт определения износостойкости мебельных тканей. Спецоборудование воздействует на ткань до появления первых потертостей.',
    category: 'Texnologiya',
    readTime: '4 min',
    coverImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
    createdAt: '2026-08-20',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full space-y-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-accent transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'ru' ? 'Назад в блог' : 'Blogga qaytish'}</span>
        </Link>

        <article className="bg-surface rounded-3xl p-8 lg:p-12 border border-border shadow-lg space-y-6">
          <div className="space-y-4 text-center">
            <span className="bg-accent-light text-accent text-xs font-bold px-3 py-1 rounded-full inline-block">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-heading leading-tight">
              {locale === 'ru' ? post.titleRu : post.titleUz}
            </h1>
            <div className="flex items-center justify-center gap-4 text-xs text-muted font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.createdAt}
              </span>
            </div>
          </div>

          <div className="aspect-video bg-secondary rounded-2xl overflow-hidden shadow-inner">
            <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="max-w-none text-body text-sm leading-relaxed space-y-4 pt-4">
            <p className="font-bold text-base text-heading border-l-4 border-accent pl-4 py-1">
              {locale === 'ru' ? post.excerptRu : post.excerptUz}
            </p>
            <p className="whitespace-pre-line">
              {locale === 'ru' ? post.contentRu : post.contentUz}
            </p>
          </div>
        </article>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
