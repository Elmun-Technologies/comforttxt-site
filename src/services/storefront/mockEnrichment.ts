import { PriceTier, StorefrontProduct, StorefrontUnitType, StorefrontVariant } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MOCK DATA ENRICHMENT — exact stock + volume price tiers
 * ─────────────────────────────────────────────────────────────────────────────
 * `MOCK_PRODUCTS` hand-authors ~50 SKUs without `onHandQuantity` or `priceTiers`
 * (UX patterns #20, #29, #36 — see docs/vseinstrumenti-analiz/01-TAHLIL.md).
 * Hand-adding both fields to every variant literal would be pure repetition;
 * instead this derives them once, deterministically, from data already on the
 * variant (SKU, stockStatus, price, wholesalePrice) so the mock catalogue can
 * exercise the real UI without inventing per-SKU numbers by hand.
 *
 * ShopFlow will supply both fields directly in production — this module is
 * mock-only and is never imported by `ShopFlowStorefrontService`.
 *
 * A variant that already sets `onHandQuantity` / `priceTiers` explicitly keeps
 * its own value; enrichment only fills gaps.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** FNV-1a-style string hash — deterministic, no external dependency. */
function hashSku(sku: string): number {
  let h = 2166136261;
  for (let i = 0; i < sku.length; i++) {
    h ^= sku.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const STOCK_RANGE: Record<StorefrontUnitType, { high: [number, number]; low: [number, number] }> = {
  meter: { high: [80, 420], low: [3, 18] },
  sheet: { high: [15, 140], low: [2, 9] },
  pcs: { high: [30, 260], low: [3, 14] },
  kg: { high: [40, 300], low: [4, 20] },
  pack: { high: [20, 160], low: [2, 12] },
};

/** Volume breakpoints: [mid-tier start, bulk-tier start], in the product's own unit. */
const BULK_BREAKS: Record<StorefrontUnitType, [number, number]> = {
  meter: [10, 50],
  sheet: [5, 20],
  pcs: [20, 100],
  kg: [50, 200],
  pack: [10, 40],
};

function deriveOnHandQuantity(variant: StorefrontVariant, unitType: StorefrontUnitType): number {
  if (variant.stockStatus === 'OUT_OF_STOCK' || variant.stockStatus === 'ON_ORDER') return 0;

  const seed = hashSku(variant.sku);
  const range = STOCK_RANGE[unitType] ?? STOCK_RANGE.pcs;
  const [min, max] = variant.stockStatus === 'LOW_STOCK' ? range.low : range.high;
  const raw = min + (seed % (max - min + 1));

  const step = unitType === 'meter' ? 0.5 : 1;
  return Math.round(raw / step) * step;
}

/**
 * Three-rung ladder — retail / workshop batch / production volume — built
 * from the variant's own retail and wholesale price. Only variants that
 * already offer a cheaper `wholesalePrice` get a ladder; a SKU with no
 * wholesale price keeps a flat price, which is the correct signal (nothing
 * to gain by buying more).
 */
function derivePriceTiers(variant: StorefrontVariant, unitType: StorefrontUnitType): PriceTier[] | undefined {
  if (!variant.wholesalePrice || variant.wholesalePrice >= variant.price) return undefined;

  const [midQty, bulkQty] = BULK_BREAKS[unitType] ?? BULK_BREAKS.pcs;
  const step = unitType === 'meter' ? 0.5 : 1;
  const roundTo = variant.wholesalePrice >= 10_000 ? 1_000 : 100;
  const bulkPrice = Math.min(
    variant.wholesalePrice,
    Math.round((variant.wholesalePrice * 0.92) / roundTo) * roundTo
  );

  return [
    { minQty: variant.minQuantity || step, maxQty: midQty - 1, price: variant.price },
    { minQty: midQty, maxQty: bulkQty - 1, price: variant.wholesalePrice },
    { minQty: bulkQty, price: bulkPrice },
  ];
}

function enrichVariant(variant: StorefrontVariant, unitType: StorefrontUnitType): StorefrontVariant {
  return {
    ...variant,
    onHandQuantity: variant.onHandQuantity ?? deriveOnHandQuantity(variant, unitType),
    priceTiers: variant.priceTiers ?? derivePriceTiers(variant, unitType),
  };
}

export function enrichMockProduct(product: StorefrontProduct): StorefrontProduct {
  return {
    ...product,
    variants: product.variants.map((v) => enrichVariant(v, product.unitType)),
  };
}
