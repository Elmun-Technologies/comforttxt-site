'use client';

import { useState } from 'react';
import { ShoppingBag, Zap, Check } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { useCartStore } from '@/store/useCartStore';
import { StorefrontProduct, StorefrontVariant } from '@/services/storefront/types';

interface StickyMobileBarProps {
  variant: StorefrontVariant;
  product: StorefrontProduct;
  quantity: number;
  currentPrice: number;
  locale: string;
  onOpenQuickOrder: () => void;
}

export function StickyMobilePurchaseBar({
  variant,
  product,
  quantity,
  currentPrice,
  locale,
  onOpenQuickOrder,
}: StickyMobileBarProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    if (!variant) return;
    addItem({
      variantId: variant.id,
      productId: product.id,
      productTitle: locale === 'ru' ? product.titleRu : product.titleUz,
      sku: variant.sku,
      variantName: locale === 'ru' ? (variant.nameRu || variant.colorNameRu || '') : (variant.nameUz || variant.colorNameUz || ''),
      image: variant.images?.[0] || product.primaryImage || '',
      price: variant.price,
      wholesalePrice: variant.wholesalePrice ?? variant.price,
      unitType: product.unitType,
      minQtyStep: variant.quantityStep || product.minQtyStep || 1,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border p-3 shadow-xl lg:hidden flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[10px] text-muted font-mono font-bold truncate">SKU: {variant?.sku}</div>
        <div className="text-sm font-black text-accent">
          {formatPrice(currentPrice * quantity, locale)}
        </div>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onOpenQuickOrder}
          disabled={!variant?.isAvailable}
          className="px-3 py-2 bg-secondary text-heading text-xs font-bold rounded-lg flex items-center gap-1 border border-border disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>1-Klik</span>
        </button>
        <button
          onClick={handleAdd}
          disabled={!variant?.isAvailable}
          className={`px-4 py-2 text-surface text-xs font-bold rounded-lg shadow-xs transition flex items-center gap-1 disabled:opacity-50 ${
            added ? 'bg-emerald-700' : 'bg-accent hover:bg-accent-hover'
          }`}
        >
          {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          <span>{added ? (locale === 'ru' ? 'Добавлено' : 'Qo‘shildi') : (locale === 'ru' ? 'В корзину' : 'Savatchaga')}</span>
        </button>
      </div>
    </div>
  );
}
