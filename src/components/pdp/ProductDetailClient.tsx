'use client';

import { useState } from 'react';
import {
  Heart,
  Scale,
  ShoppingBag,
  Zap,
  Send,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  Check,
  ChevronDown,
} from 'lucide-react';
import { StorefrontProduct } from '@/services/storefront/types';
import { formatPrice, formatStockStatus, formatUnit } from '@/lib/formatters';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useAuthStore } from '@/store/useAuthStore';
import { QuickOrderModal } from '@/components/modals/QuickOrderModal';
import { StickyMobilePurchaseBar } from '@/components/layout/StickyMobilePurchaseBar';
import { MissingImage } from '@/components/product/MissingImage';
import { validateQuantity, calculateSubtotal } from '@/lib/calc';
import { storefrontConfig } from '@/config/storefront';

interface PDPClientProps {
  product: StorefrontProduct;
  locale: string;
}

// Show first N swatches on PDP, expand on demand — avoids a wall of circles
const MAX_VISIBLE_SWATCHES = 12;

export function ProductDetailClient({ product, locale }: PDPClientProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(product.variants[0]?.minQuantity || product.minQtyStep || 1);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery'>('desc');
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [showAllSwatches, setShowAllSwatches] = useState(false);

  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const images = selectedVariant?.images || [];
  const currentImage = images[selectedImageIdx] || images[0] || '';

  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { toggleCompare, isInCompare } = useCompareStore();
  const { isB2B } = useAuthStore();

  const b2bActive = isB2B();
  const favorite = isFavorite(product.id);
  const inCompare = isInCompare(product.id);
  const stockInfo = formatStockStatus(selectedVariant?.stockStatus || 'IN_STOCK', locale);
  const unitLabel = formatUnit(product.unitType, locale);

  const currentPrice = b2bActive
    ? (selectedVariant?.wholesalePrice ?? selectedVariant?.price ?? 0)
    : (selectedVariant?.price ?? 0);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productTitle: locale === 'ru' ? product.titleRu : product.titleUz,
      sku: selectedVariant.sku,
      variantName: locale === 'ru' ? (selectedVariant.nameRu || selectedVariant.colorNameRu || '') : (selectedVariant.nameUz || selectedVariant.colorNameUz || ''),
      image: currentImage,
      price: selectedVariant.price,
      wholesalePrice: selectedVariant.wholesalePrice ?? selectedVariant.price,
      unitType: product.unitType,
      minQtyStep: selectedVariant.quantityStep || product.minQtyStep || 1,
      quantity,
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  // Telegram order link uses the configured public Telegram link (never an invented bot)
  const telegramLink = storefrontConfig.telegramShortUrl || storefrontConfig.telegramChannelUrl || storefrontConfig.telegramBotOrManagerUrl
    ? `${storefrontConfig.telegramShortUrl || storefrontConfig.telegramChannelUrl || storefrontConfig.telegramBotOrManagerUrl}`
    : '';

  const swatchesToShow = showAllSwatches
    ? product.variants
    : product.variants.slice(0, MAX_VISIBLE_SWATCHES);
  const hiddenSwatchCount = product.variants.length - swatchesToShow.length;

  return (
    <>
      <div className="bg-surface rounded-3xl border border-border p-6 lg:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden border border-border">
            {currentImage ? (
              <img
                src={currentImage}
                alt={locale === 'ru' ? product.titleRu : product.titleUz}
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <MissingImage locale={locale} />
            )}
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border shadow-xs ${stockInfo.color}`}>
                {stockInfo.label}
              </span>
              {b2bActive && (
                <span className="bg-brand-700 text-surface text-xs font-black px-2.5 py-1 rounded-md shadow-xs">
                  B2B {locale === 'ru' ? 'Опт' : 'Ulgurji'}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImageIdx === idx
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-border hover:border-muted'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info & Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Category & Collection */}
            <div className="flex items-center gap-2 text-xs font-bold text-muted flex-wrap">
              <span className="bg-secondary px-2.5 py-1 rounded-md text-body">
                {locale === 'ru' ? product.categoryNameRu : product.categoryNameUz}
              </span>
              {product.collectionName && (
                <span className="bg-accent-light text-accent px-2.5 py-1 rounded-md">
                  {product.collectionName}
                </span>
              )}
            </div>

            {/* Title — wraps naturally, no overflow */}
            <h1 className="text-2xl lg:text-3xl font-black text-heading leading-tight">
              {locale === 'ru' ? product.titleRu : product.titleUz}
            </h1>

            {/* SKU Badge + current variant */}
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <span className="font-mono bg-charcoal-900 text-surface font-bold px-2.5 py-1 rounded-md">
                SKU: {selectedVariant?.sku}
              </span>
              <span className="text-body font-semibold">
                {locale === 'ru'
                  ? (selectedVariant?.nameRu || selectedVariant?.colorNameRu || '')
                  : (selectedVariant?.nameUz || selectedVariant?.colorNameUz || '')}
              </span>
              {selectedVariant?.colorHex && (
                <span
                  className="w-4 h-4 rounded-full border border-border inline-block"
                  style={{ backgroundColor: selectedVariant.colorHex }}
                />
              )}
            </div>

            {/* Price Box */}
            <div className="bg-secondary p-4 rounded-2xl border border-border flex items-baseline justify-between">
              <div>
                <div className="text-xs text-muted font-bold mb-0.5">
                  {b2bActive
                    ? locale === 'ru'
                      ? 'Ваша B2B оптовая цена:'
                      : 'Sizning B2B ulgurji narxingiz:'
                    : locale === 'ru'
                    ? 'Розничная цена:'
                    : 'Chakana narxi:'}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-accent">
                    {formatPrice(currentPrice, locale)}
                  </span>
                  <span className="text-xs font-bold text-muted">
                    / {unitLabel}
                  </span>
                </div>
              </div>

              {!b2bActive && selectedVariant?.wholesalePrice && (
                <div className="text-right">
                  <div className="text-[11px] text-brand-700 font-bold">
                    {locale === 'ru' ? 'Оптом B2B:' : 'Ulgurji B2B:'}
                  </div>
                  <div className="text-base font-black text-brand-700">
                    {formatPrice(selectedVariant.wholesalePrice, locale)}
                  </div>
                </div>
              )}
            </div>

            {/* Color / Variant Swatches — full discovery with overflow control */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-heading block uppercase tracking-wider">
                  {locale === 'ru' ? 'Варианты (цвет):' : 'Variantlar (rang):'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {swatchesToShow.map((v, idx) => {
                    const variantIdx = product.variants.indexOf(v);
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariantIdx(variantIdx);
                          setSelectedImageIdx(0);
                          const newStep = v.quantityStep || product.minQtyStep || 1;
                          setQuantity(v.minQuantity || newStep);
                          setInputValue((v.minQuantity || newStep).toString());
                        }}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                          selectedVariantIdx === variantIdx
                            ? 'border-accent bg-accent-light text-accent ring-2 ring-accent/20'
                            : 'border-border bg-surface text-body hover:bg-secondary'
                        }`}
                        title={locale === 'ru' ? (v.colorNameRu || v.nameRu || v.sku) : (v.colorNameUz || v.nameUz || v.sku)}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-border"
                          style={{ backgroundColor: v.colorHex || '#ccc' }}
                        />
                        <span>{v.sku}</span>
                      </button>
                    );
                  })}
                  {hiddenSwatchCount > 0 && (
                    <button
                      onClick={() => setShowAllSwatches(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-dashed border-muted text-xs font-bold text-muted hover:text-accent hover:border-accent transition"
                    >
                      +{hiddenSwatchCount} {locale === 'ru' ? 'ещё' : 'yana'}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-heading block uppercase tracking-wider">
                {locale === 'ru' ? 'Количество:' : 'Miqdori:'}
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center bg-surface border border-border rounded-xl shadow-xs">
                  <button
                    onClick={() => {
                      const newQty = validateQuantity(quantity - (selectedVariant.quantityStep || product.minQtyStep || 1), product.unitType, selectedVariant.quantityStep || product.minQtyStep || 1);
                      setQuantity(newQty);
                      setInputValue(newQty.toString());
                    }}
                    className="p-2.5 text-body hover:bg-secondary rounded-l-xl transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    step={selectedVariant.quantityStep || product.minQtyStep}
                    min={selectedVariant.minQuantity || selectedVariant.quantityStep || product.minQtyStep}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => {
                      const newQty = validateQuantity(parseFloat(inputValue), product.unitType, selectedVariant.quantityStep || product.minQtyStep || 1);
                      setQuantity(newQty);
                      setInputValue(newQty.toString());
                    }}
                    className="w-24 text-center font-black text-heading text-sm focus:outline-none bg-transparent"
                  />
                  <button
                    onClick={() => {
                      const newQty = validateQuantity(quantity + (selectedVariant.quantityStep || product.minQtyStep || 1), product.unitType, selectedVariant.quantityStep || product.minQtyStep || 1);
                      setQuantity(newQty);
                      setInputValue(newQty.toString());
                    }}
                    className="p-2.5 text-body hover:bg-secondary rounded-r-xl transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs font-bold text-muted">
                  {unitLabel} • {locale === 'ru' ? 'Итого:' : 'Jami:'}{' '}
                  <strong className="text-accent text-base">{formatPrice(calculateSubtotal(currentPrice, quantity), locale)}</strong>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.isAvailable}
                className="py-3.5 px-6 bg-accent hover:bg-accent-hover text-surface font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addedToast ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{locale === 'ru' ? 'Добавлено!' : 'Qo‘shildi!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{locale === 'ru' ? 'В корзину' : 'Savatchaga qo‘shish'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setQuickOrderOpen(true)}
                disabled={!selectedVariant?.isAvailable}
                className="py-3.5 px-6 bg-secondary hover:bg-border text-heading font-bold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 border border-border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-5 h-5 text-accent" />
                <span>{locale === 'ru' ? 'Купить в 1 клик' : '1-Klikda xarid qilish'}</span>
              </button>
            </div>

            {/* Telegram & Favorites */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {telegramLink && (
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-accent-hover bg-accent-light px-4 py-2 rounded-xl border border-accent/30 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{locale === 'ru' ? 'Написать в Telegram' : 'Telegram orqali bog‘lanish'}</span>
                </a>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    favorite ? 'bg-accent-light text-accent border-accent/20' : 'bg-secondary text-body hover:bg-border border-border'
                  }`}
                  title={locale === 'ru' ? 'В избранное' : 'Tanlanganlarga qo‘shish'}
                >
                  <Heart className={`w-4 h-4 ${favorite ? 'fill-accent' : ''}`} />
                </button>
                <button
                  onClick={() =>
                    toggleCompare({
                      id: product.id,
                      slug: product.slug,
                      titleUz: product.titleUz,
                      titleRu: product.titleRu,
                      categoryName: locale === 'ru' ? product.categoryNameRu : product.categoryNameUz,
                      unitType: product.unitType,
                      price: selectedVariant?.price || 0,
                      specs: (product.specs || []).map((s) => ({
                        specKey: s.key,
                        specValueUz: s.valueUz,
                        specValueRu: s.valueRu,
                      })),
                      image: currentImage,
                    })
                  }
                  className={`p-2.5 rounded-xl border transition ${
                    inCompare ? 'bg-accent-light text-accent border-accent/30' : 'bg-secondary text-body hover:bg-border border-border'
                  }`}
                  title={locale === 'ru' ? 'Сравнить' : 'Taqqoslash'}
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section below PDP */}
      <div className="bg-surface rounded-3xl border border-border p-6 lg:p-8 shadow-xs space-y-6 mt-8">
        <div className="flex border-b border-border space-x-6 overflow-x-auto">
          {[
            { id: 'desc', label: locale === 'ru' ? 'Описание' : 'Tavsif' },
            { id: 'specs', label: locale === 'ru' ? 'Характеристики' : 'Texnik ko‘rsatkichlar' },
            { id: 'delivery', label: locale === 'ru' ? 'Доставка' : 'Yetkazib berish' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-heading'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'desc' && (
          <div className="text-xs sm:text-sm text-body leading-relaxed max-w-3xl space-y-2">
            <p>{locale === 'ru' ? product.descriptionRu : product.descriptionUz}</p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="bg-secondary rounded-2xl p-4 border border-border space-y-2 max-w-2xl">
            {product.specs && product.specs.length > 0 ? (
              product.specs.map((s, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1.5 border-b last:border-0 border-border">
                  <span className="text-muted font-bold">
                    {locale === 'ru' ? s.labelRu || s.key : s.labelUz || s.key}
                  </span>
                  <span className="font-bold text-heading">{locale === 'ru' ? s.valueRu : s.valueUz}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted py-2">
                {locale === 'ru'
                  ? 'Технические характеристики уточняйте у менеджера.'
                  : 'Texnik xususiyatlarni menejer bilan aniqlashtiring.'}
              </p>
            )}
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="text-xs text-body space-y-1">
            <p>
              {locale === 'ru'
                ? '• Самовывоз или доставка — способ и условия подтверждает менеджер после оформления заказа.'
                : '• O‘zi olib ketish yoki yetkazib berish — usul va shartlarni buyurtmadan keyin menejer tasdiqlaydi.'}
            </p>
            <p>
              {locale === 'ru'
                ? '• Для цехов и фабрик возможна доставка партии по согласованию.'
                : '• Sex va fabrikalar uchun partiya yetkazib berish kelishuv asosida mumkin.'}
            </p>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bar */}
      <StickyMobilePurchaseBar
        variant={selectedVariant}
        product={product}
        quantity={quantity}
        currentPrice={currentPrice}
        locale={locale}
        onOpenQuickOrder={() => setQuickOrderOpen(true)}
      />

      <QuickOrderModal
        isOpen={quickOrderOpen}
        onClose={() => setQuickOrderOpen(false)}
        productTitle={locale === 'ru' ? product.titleRu : product.titleUz}
        sku={selectedVariant?.sku || ''}
        price={currentPrice}
        unitType={product.unitType}
        minQtyStep={selectedVariant?.quantityStep || product.minQtyStep || 1}
        locale={locale}
      />
    </>
  );
}
