'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Scale, ShoppingBag, Zap, Check } from 'lucide-react';
import { StorefrontProduct } from '@/services/storefront/types';
import { formatPrice, formatUnit } from '@/lib/formatters';
import { resolveImageFit, discountPercent } from '@/lib/media';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useAuthStore } from '@/store/useAuthStore';
import { QuickOrderModal } from '@/components/modals/QuickOrderModal';
import { ProductImage } from '@/components/product/ProductImage';
import { StockIndicator } from '@/components/product/StockIndicator';
import { CopyButton } from '@/components/ui/CopyButton';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { calculateSubtotal } from '@/lib/calc';
import { useTimedFlag } from '@/lib/hooks/useTimedFlag';

interface ProductCardProps {
  product: StorefrontProduct | any;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [addedToast, triggerAddedToast] = useTimedFlag(1500);

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

  // Promo state comes from the retail pair (price vs oldPrice) so the badge
  // means the same thing for retail and B2B viewers; a broken pair shows nothing.
  const discountPct = discountPercent(selectedVariant?.price, selectedVariant?.oldPrice);

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
      minQuantity: selectedVariant.minQuantity,
      quantity,
    });

    triggerAddedToast();
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickOrderOpen(true);
  };

  const isFabric = resolveImageFit(product) === 'cover';
  const maxVisibleSwatches = 5;
  const hasExtraSwatches = variants.length > maxVisibleSwatches;

  return (
    <>
      <div className="group relative bg-surface rounded-2xl border border-border/70 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden">
        {/* ── Visual zone ── */}
        <div className="relative aspect-square bg-cream-100 overflow-hidden">
          <Link href={`/${locale}/product/${product.slug}`} className="block w-full h-full">
            <ProductImage
              src={mainImage}
              alt={locale === 'ru' ? product.titleRu : product.titleUz}
              fit={resolveImageFit(product)}
              locale={locale}
              className="w-full h-full"
              imgClassName={`transition-transform duration-700 group-hover:scale-[1.06] ${isFabric ? '' : 'p-4'}`}
            />
          </Link>

          {/* Corner ticks — cutting-guide marks */}
          <span aria-hidden="true" className="corner-tick corner-tick-tl text-accent/40 opacity-0 group-hover:opacity-100 transition" />
          <span aria-hidden="true" className="corner-tick corner-tick-br text-accent/40 opacity-0 group-hover:opacity-100 transition" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
            <StockIndicator
              stockStatus={selectedVariant?.stockStatus || 'IN_STOCK'}
              onHandQuantity={selectedVariant?.onHandQuantity}
              unitType={product.unitType || 'meter'}
              locale={locale}
              className="backdrop-blur-md"
            />
            {discountPct > 0 && (
              <span className="bg-copper-500 text-surface text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs w-fit">
                −{discountPct}%
              </span>
            )}
            {b2bActive && (
              <span className="bg-brand-700/90 text-surface text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs w-fit">
                B2B {locale === 'ru' ? 'Опт' : 'Ulgurji'}
              </span>
            )}
            {product.isNew && (
              <span className="bg-accent text-surface text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs w-fit">
                {locale === 'ru' ? 'Новинка' : 'Yangi'}
              </span>
            )}
            {product.isPopular && (
              <span className="bg-ink text-cream-200 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs w-fit">
                ★ {locale === 'ru' ? 'Хит' : 'Ommabop'}
              </span>
            )}
          </div>

          {/* Floating actions — slide in on hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 sm:opacity-0 sm:translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product.id, locale);
              }}
              className={`p-2 rounded-xl backdrop-blur-md shadow-xs transition ${
                favorite
                  ? 'bg-accent/20 text-accent border border-accent/40'
                  : 'bg-surface/90 text-muted hover:text-accent hover:bg-surface border border-border/60'
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
                }, locale);
              }}
              className={`p-2 rounded-xl backdrop-blur-md shadow-xs transition ${
                inCompare
                  ? 'bg-accent-light text-accent border border-accent/40'
                  : 'bg-surface/90 text-muted hover:text-accent hover:bg-surface border border-border/60'
              }`}
              title={locale === 'ru' ? 'Сравнить' : 'Taqqoslash'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Content body ── */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Category + SKU */}
            <div className="flex items-center justify-between text-[11px] text-muted mb-1.5 gap-2">
              <span className="truncate font-semibold uppercase tracking-wider text-[10px]">
                {product.collectionName || (locale === 'ru' ? product.categoryNameRu : product.categoryNameUz)}
              </span>
              {selectedVariant?.sku && (
                <span className="inline-flex items-center gap-1 font-mono bg-ink text-cream-200 px-1.5 py-0.5 rounded font-bold text-[10px] shrink-0">
                  {selectedVariant.sku}
                  <CopyButton value={selectedVariant.sku} locale={locale} className="!text-cream-200/70 hover:!text-cream-200" />
                </span>
              )}
            </div>

            {/* Product Title */}
            <Link href={`/${locale}/product/${product.slug}`}>
              <h3 className="text-xs sm:text-sm font-black text-ink line-clamp-2 hover:text-accent transition leading-snug">
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
                    className={`swatch-fabric w-4 h-4 rounded-full border border-ink/15 transition-all ${
                      selectedVariantIdx === idx
                        ? 'ring-2 ring-copper-500 ring-offset-1 scale-110 shadow-xs'
                        : 'hover:scale-105 opacity-85 hover:opacity-100'
                    } ${v.colorHex ? '' : 'swatch-no-color'}`}
                    style={v.colorHex ? { backgroundColor: v.colorHex } : undefined}
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

          {/* ── Pricing & actions ── */}
          <div className="pt-3 border-t border-dashed border-border space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline flex-wrap">
                <span className="text-base font-black text-ink">
                  {formatPrice(currentPrice, locale)}
                </span>
                {discountPct > 0 && (
                  <span className="text-[11px] text-muted font-bold line-through ml-1.5">
                    {formatPrice(selectedVariant?.oldPrice || 0, locale)}
                  </span>
                )}
                <span className="text-xs text-muted font-medium ml-1">
                  / {unitLabel}
                </span>
              </div>
              {selectedVariant?.wholesalePrice && !b2bActive && (
                <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200 shrink-0" title="Ulgurji mijozlar uchun">
                  B2B {formatPrice(selectedVariant.wholesalePrice, locale)}
                </span>
              )}
            </div>

            {/* Quantity + subtotal — the workshop needs 45 m, not "one" */}
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
                <strong className="text-ink">{formatPrice(calculateSubtotal(currentPrice, quantity), locale)}</strong>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleQuickOrder}
                className="inline-flex items-center justify-center gap-1 py-2.5 px-2 bg-cream-200/70 hover:bg-cream-300 text-ink text-xs font-bold rounded-xl transition active:scale-98 border border-border/50"
              >
                <Zap className="w-3.5 h-3.5 text-copper-600" />
                <span className="hidden sm:inline">{locale === 'ru' ? '1-Клик' : '1-Klik'}</span>
              </button>

              <button
                onClick={handleAddToCart}
                className={`btn-sheen inline-flex items-center justify-center gap-1.5 py-2.5 px-2 text-surface text-xs font-black rounded-xl transition shadow-xs active:scale-98 ${
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
