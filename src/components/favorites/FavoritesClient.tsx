'use client';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { EmptyState } from '@/components/ui/EmptyState';

interface FavoritesClientProps {
  allProducts: any[];
  locale: string;
}

export function FavoritesClient({ allProducts, locale }: FavoritesClientProps) {
  const { productIds } = useFavoritesStore();

  const favoriteProducts = allProducts.filter((p) => productIds.includes(p.id));

  return (
    <div className="space-y-6">
      <PageHero
        icon={Heart}
        kicker={locale === 'ru' ? 'Избранное' : 'Tanlanganlar'}
        title={locale === 'ru' ? 'Избранные товары' : 'Tanlanganlar'}
        subtitle={
          locale === 'ru'
            ? `Сохранено ${favoriteProducts.length} товаров`
            : `${favoriteProducts.length} ta mahsulot saqlangan`
        }
      />

      {favoriteProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title={locale === 'ru' ? 'В избранном пока ничего нет' : 'Tanlanganlarda hozircha hech narsa yo‘q'}
          description={
            locale === 'ru'
              ? 'Нажмите на иконку сердечка на карточке товара, чтобы сохранить его для повторного заказа.'
              : 'Mahsulot kartasidagi yurakcha belgisini bosib, uni qayta buyurtma qilish uchun saqlang.'
          }
          action={
            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow transition"
            >
              <span>{locale === 'ru' ? 'В каталог' : 'Katalogga o‘tish'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
