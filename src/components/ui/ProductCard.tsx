'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Scale, ShoppingBag, Zap, Check } from 'lucide-react';
import { formatPrice, formatStockStatus, formatUnit } from '@/lib/formatters';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useAuthStore } from '@/store/useAuthStore';
import { QuickOrderModal } from '@/components/modals/QuickOrderModal';

interface Variant {
  id: string;
  sku: string;
  nameUz: string;
  nameRu: string;
  colorHex?: string | null;
  colorName?: string | null;
  price: number;
  wholesalePrice: number;
  stock: number;
  imagesJson: string;
}

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    titleUz: string;
    titleRu: string;
    unitType: string;
    minQtyStep: number;
    brand?: string | null;
    category?: { nameUz: string; nameRu: string } | null;
    variants: Variant[];
    specs?: { specKey: string; specValueUz: string; specValueRu: string }[];
  };
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const images = selectedVariant?.imagesJson ? JSON.parse(selectedVariant.imagesJson) : [];
  const mainImage = images[0] || 'https://via.placeholder.com/400';

  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { toggleCompare, isInCompare } = useCompareStore();
  const { isB2B } = useAuthStore();

  const b2bActive = isB2B();
  const favorite = isFavorite(product.id);
  const inCompare = isInCompare(product.id);
  const stockInfo = formatStockStatus(selectedVariant?.stock ?? 0, locale);
  const unitLabel = formatUnit(product.unitType, locale);

  const currentPrice = b2bActive
    ? selectedVariant?.wholesalePrice
    : selectedVariant?.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productTitle: locale === 'ru' ? product.titleRu : product.titleUz,
      sku: selectedVariant.sku,
      variantName: locale === 'ru' ? selectedVariant.nameRu : selectedVariant.nameUz,
      image: mainImage,
      price: selectedVariant.price,
      wholesalePrice: selectedVariant.wholesalePrice,
      unitType: product.unitType,
      minQtyStep: product.minQtyStep,
      quantity: product.minQtyStep,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickOrderOpen(true);
  };

  return (
    <>
      <div className="group bg-white rounded-xl border border-gray-200 hover:border-brand-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
        {/* Card Header & Badges */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Link href={`/${locale}/product/${product.slug}`}>
            <img
              src={mainImage}
              alt={product.titleUz}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Top Left Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border shadow-sm ${stockInfo.color}`}
            >
              {stockInfo.label}
            </span>
            {b2bActive && (
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                B2B {locale === 'ru' ? 'Опт' : 'Ulgurji'}
              </span>
            )}
          </div>

          {/* Top Right Action Icons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product.id);
              }}
              className={`p-2 rounded-full shadow-md backdrop-blur-md transition ${
                favorite
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-white/80 text-gray-600 hover:text-red-600 hover:bg-white'
              }`}
              title="Favorite"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompare({
                  id: product.id,
                  slug: product.slug,
                  titleUz: product.titleUz,
                  titleRu: product.titleRu,
                  categoryName: product.category?.nameUz || '',
                  unitType: product.unitType,
                  price: selectedVariant?.price || 0,
                  specs: product.specs || [],
                  image: mainImage,
                });
              }}
              className={`p-2 rounded-full shadow-md backdrop-blur-md transition ${
                inCompare
                  ? 'bg-amber-50 text-amber-600 border border-amber-200'
                  : 'bg-white/80 text-gray-600 hover:text-amber-600 hover:bg-white'
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
              <span className="truncate">
                {locale === 'ru' ? product.category?.nameRu : product.category?.nameUz}
              </span>
              <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                {selectedVariant?.sku}
              </span>
            </div>

            {/* Title */}
            <Link href={`/${locale}/product/${product.slug}`}>
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-brand-600 transition mb-2">
                {locale === 'ru' ? product.titleRu : product.titleUz}
              </h3>
            </Link>

            {/* Color Variant Swatches (if more than 1) */}
            {product.variants.length > 1 && (
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                <span className="text-[10px] text-gray-400 font-medium mr-1">
                  {product.variants.length} {locale === 'ru' ? 'цвета' : 'rang'}:
                </span>
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`w-4 h-4 rounded-full border border-gray-300 shadow-sm transition ${
                      selectedVariantIndex === idx ? 'ring-2 ring-brand-600 ring-offset-1 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: v.colorHex || '#ccc' }}
                    title={v.colorName || v.sku}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pricing & CTA buttons */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-base font-extrabold text-brand-700">
                  {formatPrice(currentPrice || 0, locale)}
                </span>
                <span className="text-xs text-gray-400 font-normal ml-1">
                  / {unitLabel}
                </span>
              </div>
              {!b2bActive && selectedVariant?.wholesalePrice && (
                <div className="text-[10px] text-gray-400 text-right">
                  B2B: <span className="font-semibold text-emerald-700">{formatPrice(selectedVariant.wholesalePrice, locale)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleQuickOrder}
                className="inline-flex items-center justify-center gap-1 py-2 px-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>1-Klik</span>
              </button>
              <button
                onClick={handleAddToCart}
                className={`inline-flex items-center justify-center gap-1 py-2 px-2.5 text-white text-xs font-semibold rounded-lg shadow transition ${
                  addedAnimation
                    ? 'bg-emerald-600'
                    : 'bg-brand-600 hover:bg-brand-700'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Qo'shildi</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Savatchaga</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Order Modal */}
      <QuickOrderModal
        isOpen={quickOrderOpen}
        onClose={() => setQuickOrderOpen(false)}
        productTitle={locale === 'ru' ? product.titleRu : product.titleUz}
        sku={selectedVariant?.sku || ''}
        price={currentPrice || 0}
        unitType={product.unitType}
        minQtyStep={product.minQtyStep}
        locale={locale}
      />
    </>
  );
}
