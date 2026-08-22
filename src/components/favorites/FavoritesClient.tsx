'use client';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { ProductCard } from '@/components/ui/ProductCard';
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
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {locale === 'ru' ? 'Избранные товары' : 'Saralangan Mahsulotlar'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {locale === 'ru'
              ? `Сохранено ${favoriteProducts.length} товаров`
              : `${favoriteProducts.length} ta mahsulot saqlangan`}
          </p>
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm my-8">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {locale === 'ru' ? 'В избранном пока ничего нет' : 'Saralanganlarda hech narsa yo\'q'}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            {locale === 'ru'
              ? 'Нажмите на иконку сердечка на товарах, чтобы сохранить их на потом.'
              : 'Mahsulotlardagi yurakchasini bosib keyinchalik xarid qilish uchun saqlang.'}
          </p>
          <Link
            href={`/${locale}/catalog`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white font-medium text-xs rounded-xl shadow transition"
          >
            <span>{locale === 'ru' ? 'В каталог' : 'Katalogga o\'tish'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
