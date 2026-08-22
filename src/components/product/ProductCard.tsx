'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Scale, ShoppingBag, Zap, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, formatStockStatus, formatUnit } from '@/lib/formatters';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useAuthStore } from '@/store/useAuthStore';
import { QuickOrderModal } from '@/components/modals/QuickOrderModal';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const mainImage = selectedVariant?.images[0] || 'https://via.placeholder.com/400';

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
      minQtyStep: (selectedVariant as any)?.minQtyStep || (product.unitType === 'meter' ? 0.5 : 1),
      quantity: (selectedVariant as any)?.minQtyStep || (product.unitType === 'meter' ? 0.5 : 1),
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1500);
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickOrderOpen(true);
  };

  return (
    <>
      <div className="group bg-surface rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden relative">
        {/* Aspect Ratio Viewport */}
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <Link href={`/${locale}/product/${product.slug}`}>
            <img
              src={mainImage}
              alt={product.titleUz}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${stockInfo.color}`}>
              {stockInfo.label}
            </span>
            {b2bActive && (
              <span className="bg-emerald-700 text-surface text-[10px] font-black px-2 py-0.5 rounded">
                B2B {locale === 'ru' ? 'Опт' : 'Ulgurji'}
              </span>
            )}
            {product.isNew && (
              <span className="bg-accent text-surface text-[10px] font-black px-2 py-0.5 rounded">
                {locale === 'ru' ? 'Новинка' : 'Yangi'}
              </span>
            )}
          </div>

          {/* Action Icons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product.id);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition ${
                favorite
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'bg-surface/80 text-muted hover:text-accent hover:bg-surface'
              }`}
              title="Favorite"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompare({
                  id: product.id,
                  slug: product.slug,
                  titleUz: product.titleUz,
                  titleRu: product.titleRu,
                  categoryName: locale === 'ru' ? product.categoryNameRu : product.categoryNameUz,
                  unitType: product.unitType,
                  price: selectedVariant?.price || 0,
                  specs: product.specs || [],
                  image: mainImage,
                });
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition ${
                inCompare
                  ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                  : 'bg-surface/80 text-muted hover:text-amber-600 hover:bg-surface'
              }`}
              title="Compare"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Info Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-[11px] text-muted mb-1">
              <span className="truncate font-semibold">
                {locale === 'ru' ? product.categoryNameRu : product.categoryNameUz}
              </span>
              <span className="font-mono bg-secondary border border-border px-1.5 py-0.5 rounded text-body font-bold text-[10px]">
                {selectedVariant?.sku}
              </span>
            </div>

            {/* Title */}
            <Link href={`/${locale}/product/${product.slug}`}>
              <h3 className="text-xs font-bold text-heading line-clamp-2 hover:text-accent transition leading-snug">
                {locale === 'ru' ? product.titleRu : product.titleUz}
              </h3>
            </Link>

            {/* Tactile Color Swatches (if variants > 1) */}
            {product.variants.length > 1 && (
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`w-4 h-4 rounded-full border border-border transition ${
                      selectedVariantIdx === idx
                        ? 'ring-2 ring-accent ring-offset-1 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: v.colorHex || '#ccc' }}
                    title={v.colorName || v.sku}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-sm font-black text-accent">
                  {formatPrice(currentPrice || 0, locale)}
                </span>
                <span className="text-[11px] text-muted font-medium ml-1">
                  / {unitLabel}
                </span>
              </div>
              {selectedVariant?.wholesalePrice && !b2bActive && (
                <div className="text-[10px] text-muted text-right">
                  B2B: <span className="font-bold text-emerald-700">{formatPrice(selectedVariant.wholesalePrice, locale)}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleQuickOrder}
                className="inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-secondary hover:bg-border text-heading text-xs font-bold rounded-lg transition"
              >
                <Zap className="w-3 h-3 text-amber-600" />
                <span>1-Klik</span>
              </button>
              <button
                onClick={handleAddToCart}
                className={`inline-flex items-center justify-center gap-1 py-1.5 px-2 text-surface text-xs font-bold rounded-lg transition ${
                  addedToast ? 'bg-emerald-700' : 'bg-accent hover:bg-accent-hover'
                }`}
              >
                {addedToast ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Qo'shildi</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3 h-3" />
                    <span>Savatchaga</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuickOrderModal
        isOpen={quickOrderOpen}
        onClose={() => setQuickOrderOpen(false)}
        productTitle={locale === 'ru' ? product.titleRu : product.titleUz}
        sku={selectedVariant?.sku || ''}
        price={currentPrice || 0}
        unitType={product.unitType}
        minQtyStep={(selectedVariant as any)?.minQtyStep || (product.unitType === 'meter' ? 0.5 : 1)}
        locale={locale}
      />
    </>
  );
}
