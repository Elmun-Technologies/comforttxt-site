import { redirect } from 'next/navigation';

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/**
 * No real articles exist yet — every slug redirects to the blog index,
 * which shows a neutral "articles coming soon" state.
 * Real articles (with real content) will be added with ShopFlow CMS.
 */
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/blog`);
}
