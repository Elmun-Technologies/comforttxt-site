import { StorefrontProduct } from '@/services/storefront/types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MEDIA HELPERS — image framing rules for the real-product catalogue
 * ─────────────────────────────────────────────────────────────────────────────
 * Real product photography arrives in mixed framing: fabrics as full-bleed
 * texture shots, foam/mechanisms as framed photos on white. The card/PDP grid
 * is square, so every image needs an explicit fit decision.
 *
 * Previously `ProductCard` hard-coded `categorySlug === 'mebel-matolari'`.
 * With real catalogue data that equality breaks silently (renamed slug, new
 * category) and mis-frames photos. The rules now live in one place: fabric-like
 * categories crop (`cover`), everything else letterboxes (`contain`), and an
 * unknown category gets the safe e-commerce default (`cover`) — most product
 * shots are framed tight enough to crop gracefully.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Category slugs whose photos are sold "by the surface" and crop well. */
const COVER_CATEGORIES = new Set(['mebel-matolari', 'velyur', 'bukle', 'shenill', 'rogojka', 'mikrofibra', 'eko-charm']);

export type ImageFit = 'cover' | 'contain';

export function resolveImageFit(product: Pick<StorefrontProduct, 'categorySlug'>): ImageFit {
  return COVER_CATEGORIES.has(product.categorySlug) ? 'cover' : 'contain';
}

/**
 * Discount percentage from a retail price and its crossed-out reference.
 * Returns 0 for absent/equal/inverted prices — callers render no badge then,
 * so a data-entry mistake can never show "-0%" or a negative discount.
 */
export function discountPercent(price?: number | null, oldPrice?: number | null): number {
  if (!price || !oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
