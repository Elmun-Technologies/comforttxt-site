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
import { Product } from '@/types';
import { formatPrice, formatStockStatus, formatUnit } from '@/lib/formatters';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useAuthStore } from '@/store/useAuthStore';
import { QuickOrderModal } from '@/components/modals/QuickOrderModal';
import { StickyMobilePurchaseBar } from '@/components/layout/StickyMobilePurchaseBar';
import { validateQuantity, calculateSubtotal } from '@/lib/calc';

interface PDPClientProps {
  product: Product;
  locale: string;
}

export function ProductDetailClient({ product, locale }: PDPClientProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(product.variants[0]?.minQtyStep || (product.unitType === 'meter' ? 0.5 : 1));
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'care' | 'delivery'>('desc');
  const [inputValue, setInputValue] = useState(quantity.toString());

  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const images = selectedVariant?.images || [];
  const currentImage = images[selectedImageIdx] || images[0] || 'https://via.placeholder.com/600';

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

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productTitle: locale === 'ru' ? product.titleRu : product.titleUz,
      sku: selectedVariant.sku,
      variantName: locale === 'ru' ? selectedVariant.nameRu : selectedVariant.nameUz,
      image: currentImage,
      price: selectedVariant.price,
      wholesalePrice: selectedVariant.wholesalePrice,
      unitType: product.unitType,
      minQtyStep: selectedVariant.minQtyStep || product.minQtyStep || 1,
      quantity,
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const telegramLink = `https://t.me/comforttxt_bot?start=${encodeURIComponent(selectedVariant?.sku || product.slug)}`;

  return (
    <>
      <div className="bg-surface rounded-3xl border border-border p-6 lg:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: 55% Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden border border-border">
            <img
              src={currentImage}
              alt={product.titleUz}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border shadow-xs ${stockInfo.color}`}>
                {stockInfo.label}
              </span>
              {b2bActive && (
                <span className="bg-emerald-700 text-surface text-xs font-black px-2.5 py-1 rounded-md shadow-xs">
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

        {/* Right Column: 45% Info & Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Category & Collection */}
            <div className="flex items-center gap-2 text-xs font-bold text-muted">
              <span className="bg-secondary px-2.5 py-1 rounded-md text-body">
                {locale === 'ru' ? product.categoryNameRu : product.categoryNameUz}
              </span>
              {product.collectionName && (
                <span className="bg-accent-light text-accent px-2.5 py-1 rounded-md">
                  {product.collectionName}
                </span>
              )}
              {product.brand && <span>• {product.brand}</span>}
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-black text-heading leading-tight">
              {locale === 'ru' ? product.titleRu : product.titleUz}
            </h1>

            {/* SKU Badge */}
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono bg-charcoal-900 text-surface font-bold px-2.5 py-1 rounded-md">
                SKU: {selectedVariant?.sku}
              </span>
              <span className="text-body font-semibold">
                {locale === 'ru' ? selectedVariant?.nameRu : selectedVariant?.nameUz}
              </span>
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
                    {formatPrice(currentPrice || 0, locale)}
                  </span>
                  <span className="text-xs font-bold text-muted">
                    / {unitLabel}
                  </span>
                </div>
              </div>

              {!b2bActive && selectedVariant?.wholesalePrice && (
                <div className="text-right">
                  <div className="text-[11px] text-emerald-800 font-bold">
                    {locale === 'ru' ? 'Оптом B2B:' : 'Ulgurji B2B:'}
                  </div>
                  <div className="text-base font-black text-emerald-700">
                    {formatPrice(selectedVariant.wholesalePrice, locale)}
                  </div>
                </div>
              )}
            </div>

            {/* Color Swatches */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-heading block uppercase tracking-wider">
                  {locale === 'ru' ? 'Выберите цвет / вариант:' : 'Rang variantini tanlang:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariantIdx(idx);
                        setSelectedImageIdx(0);
                        const newStep = product.variants[idx].minQtyStep || 1;
                        setQuantity(newStep);
                        setInputValue(newStep.toString());
                      }}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                        selectedVariantIdx === idx
                          ? 'border-accent bg-accent-light text-accent ring-2 ring-accent/20'
                          : 'border-border bg-surface text-body hover:bg-secondary'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-border"
                        style={{ backgroundColor: v.colorHex || '#ccc' }}
                      />
                      <span>{v.sku} ({v.colorName || v.nameUz})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Decimal Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-heading block uppercase tracking-wider">
                {locale === 'ru' ? 'Укажите количество:' : 'Miqdorni ko\'rsating:'}
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center bg-surface border border-border rounded-xl shadow-xs">
                  <button
                    onClick={() => {
                      const newQty = validateQuantity(quantity - (selectedVariant.minQtyStep || 1), product.unitType, selectedVariant.minQtyStep);
                      setQuantity(newQty);
                      setInputValue(newQty.toString());
                    }}
                    className="p-2.5 text-body hover:bg-secondary rounded-l-xl transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    step={selectedVariant.minQtyStep}
                    min={selectedVariant.minQtyStep}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => {
                      const newQty = validateQuantity(parseFloat(inputValue), product.unitType, selectedVariant.minQtyStep);
                      setQuantity(newQty);
                      setInputValue(newQty.toString());
                    }}
                    className="w-24 text-center font-black text-heading text-sm focus:outline-none bg-transparent"
                  />
                  <button
                    onClick={() => {
                      const newQty = validateQuantity(quantity + (selectedVariant.minQtyStep || 1), product.unitType, selectedVariant.minQtyStep);
                      setQuantity(newQty);
                      setInputValue(newQty.toString());
                    }}
                    className="p-2.5 text-body hover:bg-secondary rounded-r-xl transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs font-bold text-muted">
                  {unitLabel} • Jami: <strong className="text-accent text-base">{formatPrice(calculateSubtotal(currentPrice || 0, quantity), locale)}</strong>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-6 bg-accent hover:bg-accent-hover text-surface font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Qo'shildi!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{locale === 'ru' ? 'В корзину' : 'Savatchaga qo\'shish'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setQuickOrderOpen(true)}
                className="py-3.5 px-6 bg-secondary hover:bg-border text-heading font-bold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 border border-border"
              >
                <Zap className="w-5 h-5 text-amber-600 fill-current" />
                <span>{locale === 'ru' ? 'Купить в 1 клик' : '1-Klikda Xarid Qilish'}</span>
              </button>
            </div>

            {/* Telegram & Favorites */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <a
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 transition"
              >
                <Send className="w-4 h-4" />
                <span>{locale === 'ru' ? 'Заказать через Telegram' : 'Telegram orqali so\'rash'}</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    favorite ? 'bg-accent-light text-accent border-accent/20' : 'bg-secondary text-body hover:bg-border border-border'
                  }`}
                  title="Favorite"
                >
                  <Heart className="w-4 h-4 fill-current" />
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
                      specs: product.specs || [],
                      image: currentImage,
                    })
                  }
                  className={`p-2.5 rounded-xl border transition ${
                    inCompare ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-secondary text-body hover:bg-border border-border'
                  }`}
                  title="Compare"
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Accordion Section below PDP */}
      <div className="bg-surface rounded-3xl border border-border p-6 lg:p-8 shadow-xs space-y-6 mt-8">
        <div className="flex border-b border-border space-x-6">
          {[
            { id: 'desc', label: locale === 'ru' ? 'Описание' : 'Tavsif' },
            { id: 'specs', label: locale === 'ru' ? 'Характеристики' : 'Texnik ko\'rsatkichlar' },
            { id: 'care', label: locale === 'ru' ? 'Уход va Parvarish' : 'Parvarish' },
            { id: 'delivery', label: locale === 'ru' ? 'Доставка' : 'Yetkazib berish' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-bold border-b-2 transition ${
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
            {product.specs.map((s, idx) => (
              <div key={idx} className="flex justify-between text-xs py-1.5 border-b last:border-0 border-border">
                <span className="text-muted font-bold capitalize">{s.specKey}</span>
                <span className="font-bold text-heading">{locale === 'ru' ? s.specValueRu : s.specValueUz}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'care' && (
          <div className="text-xs text-body space-y-1">
            <p>• Chang va changsorish bilan doimiy tozalash tavsiya etiladi.</p>
            <p>• Dog'lar paydo bo'lganda sovunli suv yoki neytral tozalagich bilan tozalang.</p>
            <p>• Xlorli va tajovuzkor kimyoviy moddalardan foydalanmang.</p>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="text-xs text-body space-y-1">
            <p>• Toshkent bo'ylab kuryerlik yetkazib berish 24 soat ichida.</p>
            <p>• O'zbekiston viloyatlariga kuryerlik yoki yuk tashish xizmatlari orqali 1-3 kun.</p>
            <p>• Ombordan o'zi olib ketish (Self-pickup) imkoniyati bor.</p>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bar */}
      <StickyMobilePurchaseBar
        variant={selectedVariant}
        product={product}
        quantity={quantity}
        currentPrice={currentPrice || 0}
        locale={locale}
        onOpenQuickOrder={() => setQuickOrderOpen(true)}
      />

      <QuickOrderModal
        isOpen={quickOrderOpen}
        onClose={() => setQuickOrderOpen(false)}
        productTitle={locale === 'ru' ? product.titleRu : product.titleUz}
        sku={selectedVariant?.sku || ''}
        price={currentPrice || 0}
        unitType={product.unitType}
        minQtyStep={selectedVariant?.minQtyStep || product.minQtyStep || 1}
        locale={locale}
      />
    </>
  );
}
