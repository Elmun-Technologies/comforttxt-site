'use client';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FavoritesClientProps {
  allProducts: any[];
  locale: string;
}

export function FavoritesClient({ allProducts, locale }: FavoritesClientProps) {
  const { productIds } = useFavoritesStore();

  const favoriteProducts = allProducts.filter((p) => productIds.includes(p.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-heading tracking-tight">
            {locale === 'ru' ? 'Избранные товары' : 'Tanlanganlar'}
          </h1>
          <p className="text-xs text-muted mt-1">
            {locale === 'ru'
              ? `Сохранено ${favoriteProducts.length} товаров`
              : `${favoriteProducts.length} ta mahsulot saqlangan`}
          </p>
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="bg-surface rounded-2xl p-12 text-center border border-border shadow-xs my-8 space-y-4 max-w-md mx-auto">
          <Heart className="w-16 h-16 text-muted/40 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-heading">
            {locale === 'ru' ? 'В избранном пока ничего нет' : 'Tanlanganlarda hozircha hech narsa yo‘q'}
          </h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            {locale === 'ru'
              ? 'Нажмите на иконку сердечка на карточке товара, чтобы сохранить его для повторного заказа.'
              : 'Mahsulot kartasidagi yurakcha belgisini bosib, uni qayta buyurtma qilish uchun saqlang.'}
          </p>
          <Link
            href={`/${locale}/catalog`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow transition"
          >
            <span>{locale === 'ru' ? 'В каталог' : 'Katalogga o‘tish'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
