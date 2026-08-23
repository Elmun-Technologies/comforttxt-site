'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Scale, ShoppingBag, Zap, Check } from 'lucide-react';
import { StorefrontProduct } from '@/services/storefront/types';
import { formatPrice, formatUnit } from '@/lib/formatters';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useAuthStore } from '@/store/useAuthStore';
import { QuickOrderModal } from '@/components/modals/QuickOrderModal';
import { MissingImage } from '@/components/product/MissingImage';
import { StockIndicator } from '@/components/product/StockIndicator';
import { CopyButton } from '@/components/ui/CopyButton';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { calculateSubtotal } from '@/lib/calc';

interface ProductCardProps {
  product: StorefrontProduct | any;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const variants = product.variants || [];
  const selectedVariant = variants[selectedVariantIdx] || variants[0];
  const mainImage = selectedVariant?.images?.[0] || product.primaryImage || '';

  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { toggleCompare, isInCompare } = useCompareStore();
  const { isB2B } = useAuthStore();

  const b2bActive = isB2B();
  const favorite = isFavorite(product.id);
  const inCompare = isInCompare(product.id);
  const unitLabel = formatUnit(product.unitType || 'meter', locale);
  const step = selectedVariant?.quantityStep || (product.unitType === 'meter' ? 0.5 : 1);

  const [quantity, setQuantity] = useState(selectedVariant?.minQuantity || step);

  // Reset the visible quantity to this variant's own minimum when the buyer
  // switches swatches, so a leftover "45" from another colour never carries over.
  useEffect(() => {
    setQuantity(selectedVariant?.minQuantity || step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariantIdx]);

  const currentPrice = b2bActive && selectedVariant?.wholesalePrice
    ? selectedVariant.wholesalePrice
    : (selectedVariant?.price || 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productTitle: locale === 'ru' ? product.titleRu : product.titleUz,
      sku: selectedVariant.sku,
      variantName: locale === 'ru' ? (selectedVariant.nameRu || selectedVariant.colorNameRu || '') : (selectedVariant.nameUz || selectedVariant.colorNameUz || ''),
      image: mainImage,
      price: selectedVariant.price,
      wholesalePrice: selectedVariant.wholesalePrice || selectedVariant.price,
      unitType: product.unitType,
      minQtyStep: step,
      quantity,
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1500);
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickOrderOpen(true);
  };

  const isFabric = product.categorySlug === 'mebel-matolari';
  const maxVisibleSwatches = 5;
  const hasExtraSwatches = variants.length > maxVisibleSwatches;

  return (
    <>
      <div className="group bg-surface rounded-2xl border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-250 flex flex-col justify-between overflow-hidden relative">
        {/* Visual Zone */}
        <div className="relative aspect-square bg-secondary/50 overflow-hidden">
          <Link href={`/${locale}/product/${product.slug}`} className="block w-full h-full">
            {mainImage ? (
              <img
                src={mainImage}
                alt={locale === 'ru' ? product.titleRu : product.titleUz}
                className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                  isFabric ? 'object-cover' : 'object-contain p-3'
                }`}
                loading="lazy"
              />
            ) : (
              <MissingImage locale={locale} />
            )}
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            <StockIndicator
              stockStatus={selectedVariant?.stockStatus || 'IN_STOCK'}
              onHandQuantity={selectedVariant?.onHandQuantity}
              unitType={product.unitType || 'meter'}
              locale={locale}
              className="backdrop-blur-md"
            />
            {b2bActive && (
              <span className="bg-brand-700/90 text-surface text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                B2B {locale === 'ru' ? 'Опт' : 'Ulgurji'}
              </span>
            )}
            {product.isNew && (
              <span className="bg-accent text-surface text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                {locale === 'ru' ? 'Новинка' : 'Yangi'}
              </span>
            )}
          </div>

          {/* Floating Actions */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product.id);
              }}
              className={`p-2 rounded-xl backdrop-blur-md shadow-xs transition ${
                favorite
                  ? 'bg-accent/20 text-accent border border-accent/40'
                  : 'bg-surface/85 text-muted hover:text-accent hover:bg-surface border border-border/60'
              }`}
              title={locale === 'ru' ? 'В избранное' : 'Tanlanganlarga qo‘shish'}
            >
              <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-accent' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompare({
                  id: product.id,
                  slug: product.slug,
                  titleUz: product.titleUz,
                  titleRu: product.titleRu,
                  categoryName: locale === 'ru' ? (product.categoryNameRu || '') : (product.categoryNameUz || ''),
                  unitType: product.unitType,
                  price: selectedVariant?.price || 0,
                  specs: (product.specs || []).map((s: any) => ({
                    specKey: s.key || s.specKey,
                    specValueUz: s.valueUz || s.specValueUz || '',
                    specValueRu: s.valueRu || s.specValueRu || '',
                  })),
                  image: mainImage,
                });
              }}
              className={`p-2 rounded-xl backdrop-blur-md shadow-xs transition ${
                inCompare
                  ? 'bg-accent-light text-accent border border-accent/40'
                  : 'bg-surface/85 text-muted hover:text-accent hover:bg-surface border border-border/60'
              }`}
              title={locale === 'ru' ? 'Сравнить' : 'Taqqoslash'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Category / Collection Tag & SKU */}
            <div className="flex items-center justify-between text-[11px] text-muted mb-1.5">
              <span className="truncate font-semibold uppercase tracking-wider text-[10px]">
                {product.collectionName || (locale === 'ru' ? product.categoryNameRu : product.categoryNameUz)}
              </span>
              <span className="inline-flex items-center gap-1 font-mono bg-secondary border border-border/80 px-1.5 py-0.5 rounded text-heading font-bold text-[10px]">
                {selectedVariant?.sku}
                {selectedVariant?.sku && <CopyButton value={selectedVariant.sku} locale={locale} />}
              </span>
            </div>

            {/* Product Title */}
            <Link href={`/${locale}/product/${product.slug}`}>
              <h3 className="text-xs sm:text-sm font-black text-heading line-clamp-2 hover:text-accent transition leading-snug">
                {locale === 'ru' ? product.titleRu : product.titleUz}
              </h3>
            </Link>

            {/* Tactile Color Swatches */}
            {variants.length > 1 && (
              <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                {variants.slice(0, maxVisibleSwatches).map((v: any, idx: number) => (
                  <button
                    key={v.id || v.sku}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`w-4 h-4 rounded-full border border-border transition-all ${
                      selectedVariantIdx === idx
                        ? 'ring-2 ring-accent ring-offset-1 scale-110 shadow-xs'
                        : 'hover:scale-105 opacity-85 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: v.colorHex || '#d1d5db' }}
                    title={locale === 'ru' ? (v.colorNameRu || v.nameRu || v.sku) : (v.colorNameUz || v.nameUz || v.sku)}
                  />
                ))}
                {hasExtraSwatches && (
                  <Link
                    href={`/${locale}/product/${product.slug}`}
                    className="text-[10px] font-bold text-muted hover:text-accent pl-0.5 transition"
                  >
                    +{variants.length - maxVisibleSwatches} {locale === 'ru' ? 'цв.' : 'rang'}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Pricing & Actions */}
          <div className="pt-2.5 border-t border-border/80 space-y-2.5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-base font-black text-heading">
                  {formatPrice(currentPrice, locale)}
                </span>
                <span className="text-xs text-muted font-medium ml-1">
                  / {unitLabel}
                </span>
              </div>
              {selectedVariant?.wholesalePrice && !b2bActive && (
                <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200" title="Ulgurji mijozlar uchun">
                  B2B {formatPrice(selectedVariant.wholesalePrice, locale)}
                </span>
              )}
            </div>

            {/* Quantity stepper — visible on the card itself (pattern #25): a
                workshop buyer needs 45 m, not "one", so the control belongs
                here rather than only on the product page. */}
            <div className="flex items-center justify-between gap-2">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                step={step}
                unitType={product.unitType || 'meter'}
                min={selectedVariant?.minQuantity}
                size="sm"
              />
              <span className="text-[11px] font-bold text-muted">
                {locale === 'ru' ? 'Итого' : 'Jami'}{' '}
                <strong className="text-heading">{formatPrice(calculateSubtotal(currentPrice, quantity), locale)}</strong>
              </span>
            </div>

            {/* CTA Buttons — primary: Savatchaga, secondary: 1-Klik (icon on mobile) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleQuickOrder}
                className="inline-flex items-center justify-center gap-1 py-2 px-2 bg-secondary hover:bg-border text-heading text-xs font-bold rounded-xl transition active:scale-98"
              >
                <Zap className="w-3.5 h-3.5 text-accent" />
                <span className="hidden sm:inline">{locale === 'ru' ? '1-Клик' : '1-Klik'}</span>
              </button>

              <button
                onClick={handleAddToCart}
                className={`inline-flex items-center justify-center gap-1.5 py-2 px-2 text-surface text-xs font-black rounded-xl transition shadow-xs active:scale-98 ${
                  addedToast ? 'bg-emerald-700' : 'bg-accent hover:bg-accent-hover'
                }`}
              >
                {addedToast ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span className="hidden sm:inline">{locale === 'ru' ? 'Добавлено' : 'Qo‘shildi'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="truncate">{locale === 'ru' ? 'В корзину' : 'Savatchaga'}</span>
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
        price={currentPrice}
        unitType={product.unitType}
        minQtyStep={selectedVariant?.quantityStep || (product.unitType === 'meter' ? 0.5 : 1)}
        locale={locale}
      />
    </>
  );
}
