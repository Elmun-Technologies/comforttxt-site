import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  const posts = [
    {
      id: 'post-1',
      slug: 'martindale-nima',
      titleUz: 'Martindale nima va mebel matosi chidamliligi qanday o\'lchanadi?',
      titleRu: 'Что такое тест Мартиндейла и как измеряется износостойкость?',
      excerptUz: '50 000 sikl nimani anglatadi? Mebel sexlari va retail uchun to\'g\'ri tanlov.',
      excerptRu: 'Что означают 50 000 циклов? Руководство по выбору ткани.',
      category: 'Texnologiya',
      readTime: '4 min',
      coverImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
    },
    {
      id: 'post-2',
      slug: 'st-el-hr-paralon-farqi',
      titleUz: 'ST, EL va HR paralon markalari o\'rtasidagi farq nimada?',
      titleRu: 'В чем разница между марками поролона ST, EL и HR?',
      excerptUz: 'Divan o\'tirg\'ichi va suyanchig\'i uchun qaysi zichlik to\'g\'ri keladi?',
      excerptRu: 'Как правильно подобрать плотность поролона для мебели?',
      category: 'Paralon',
      readTime: '5 min',
      coverImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop',
    },
    {
      id: 'post-3',
      slug: 'velyur-tanlash-sirlari',
      titleUz: 'Velyur mato tanlashda e\'tibor berish kerak bo\'lgan 5 ta omil',
      titleRu: '5 главных факторов при выборе велюра для мягкой мебели',
      excerptUz: 'Easy Clean va Pet Friendly texnologiyalarining afzalliklari.',
      excerptRu: 'Преимущества технологий Easy Clean и Pet Friendly.',
      category: 'Mebel matolari',
      readTime: '3 min',
      coverImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c517a?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-accent-light text-accent px-3 py-1 rounded-full text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="text-3xl font-black text-heading tracking-tight">
            {locale === 'ru' ? 'База Знаний для Мебельщиков' : 'Mebelchilar Uchun Bilimlar Bazasi'}
          </h1>
          <p className="text-xs text-muted mt-1 font-medium">
            {locale === 'ru'
              ? 'Профессиональные статьи, мануалы по выбору поролона и уходу за тканями'
              : 'Mebel matolariga qarash, paralon zichliklari va texnologiyalar bo\'yicha mutaxassis maslahatlari'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              className="group bg-surface rounded-3xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video overflow-hidden bg-secondary">
                  <img
                    src={post.coverImage}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="bg-accent-light text-accent font-bold px-2.5 py-0.5 rounded-md">
                      {post.category}
                    </span>
                    <span className="text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-heading group-hover:text-accent transition leading-snug">
                    {locale === 'ru' ? post.titleRu : post.titleUz}
                  </h3>
                  <p className="text-xs text-muted line-clamp-3">
                    {locale === 'ru' ? post.excerptRu : post.excerptUz}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                <span>{locale === 'ru' ? 'Читать дальше' : 'Batafsil o\'qish'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
