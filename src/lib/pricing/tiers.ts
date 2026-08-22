/**
 * ─────────────────────────────────────────────────────────────────────────────
 * VOLUME PRICE TIERS
 * ─────────────────────────────────────────────────────────────────────────────
 * UX pattern #20 ("different prices depending on volume / quantity").
 *
 * Furniture workshops rarely buy one metre — they buy a roll for a production
 * batch. Showing the volume ladder up front ("50 m dan 118 000 so‘m") both
 * communicates the wholesale proposition and nudges order size upward, without
 * requiring the buyer to call a manager to learn the bulk price.
 *
 * MONEY RULES (must not be broken):
 *   - every amount is an INTEGER of UZS — never a float
 *   - the tier ladder is authoritative data from the storefront service; the
 *     client never invents a discount
 *   - `resolveTierPrice` is pure and is the single place a tier is chosen, so
 *     server pricing and client preview can never drift apart
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { PriceTier } from '@/services/storefront/types';

/**
 * Pick the tier that applies to `quantity`.
 *
 * A ladder is resolved purely by `minQty`: the highest rung whose `minQty` the
 * quantity reaches wins. `maxQty` is display metadata ("10–49 m") and is
 * deliberately NOT used to reject a quantity.
 *
 * That distinction matters because fabric is sold in 0.5 m steps. A ladder
 * written as 1–9 / 10–49 / 50+ leaves arithmetic gaps at 9.5 m, 49.5 m and so
 * on. Treating `maxQty` as a hard bound would leave those real, orderable
 * quantities with no tier at all and silently fall back to the base price.
 * Resolving by `minQty` keeps the ladder continuous: 9.5 m stays on the retail
 * rung until the 10 m break is actually reached.
 */
export function resolveTier(
  tiers: PriceTier[] | undefined,
  quantity: number
): PriceTier | null {
  if (!tiers || tiers.length === 0) return null;
  if (!Number.isFinite(quantity) || quantity <= 0) return null;

  let best: PriceTier | null = null;

  for (const tier of tiers) {
    if (quantity < tier.minQty) continue;
    if (best === null || tier.minQty > best.minQty) best = tier;
  }

  return best;
}

/**
 * Effective unit price for `quantity`.
 *
 * Falls back to `basePrice` when no ladder is configured or the quantity does
 * not reach the first rung, so a product without tiers keeps working unchanged.
 */
export function resolveTierPrice(
  basePrice: number,
  tiers: PriceTier[] | undefined,
  quantity: number
): number {
  const tier = resolveTier(tiers, quantity);
  return tier ? tier.price : basePrice;
}

/**
 * Line total for `quantity` units, priced through the ladder.
 * Rounded to a whole UZS to avoid floating-point currency drift.
 */
export function calculateTieredSubtotal(
  basePrice: number,
  tiers: PriceTier[] | undefined,
  quantity: number
): number {
  const unitPrice = resolveTierPrice(basePrice, tiers, quantity);
  return Math.round(unitPrice * quantity);
}

/**
 * Discount of a tier against the base price, as a whole percent (0–100).
 * Returns 0 when the tier is not cheaper, so callers can hide the badge.
 */
export function tierDiscountPercent(basePrice: number, tierPrice: number): number {
  if (basePrice <= 0 || tierPrice >= basePrice) return 0;
  return Math.round(((basePrice - tierPrice) / basePrice) * 100);
}

/**
 * How much is saved by buying `quantity` at the tier price instead of base.
 * Always an integer UZS amount, never negative.
 */
export function tierSavings(
  basePrice: number,
  tiers: PriceTier[] | undefined,
  quantity: number
): number {
  const full = Math.round(basePrice * quantity);
  const actual = calculateTieredSubtotal(basePrice, tiers, quantity);
  return Math.max(0, full - actual);
}

/**
 * The next rung up, plus how many more units are needed to reach it.
 *
 * Powers the upsell hint on the product page:
 *   "Yana 4 m qo‘shsangiz — metriga 132 000 so‘m (−9%)"
 *
 * Returns `null` when the buyer is already on the best tier.
 */
export function nextTierHint(
  tiers: PriceTier[] | undefined,
  quantity: number
): { tier: PriceTier; unitsAway: number } | null {
  if (!tiers || tiers.length === 0) return null;

  const upcoming = tiers
    .filter((t) => t.minQty > quantity)
    .sort((a, b) => a.minQty - b.minQty);

  const next = upcoming[0];
  if (!next) return null;

  const current = resolveTier(tiers, quantity);
  // Only advertise the next rung when it is actually cheaper.
  if (current && next.price >= current.price) return null;

  return {
    tier: next,
    unitsAway: Math.round((next.minQty - quantity) * 100) / 100,
  };
}

/**
 * Sort a ladder ascending by `minQty` for display.
 * Returns a new array — the input is never mutated.
 */
export function sortTiers(tiers: PriceTier[]): PriceTier[] {
  return [...tiers].sort((a, b) => a.minQty - b.minQty);
}

/**
 * Localised range label for a rung, e.g. "10–49 m" / "50 m dan".
 * Uses the tier's own labels when the data provides them.
 */
export function formatTierRange(
  tier: PriceTier,
  unitLabel: string,
  locale: string
): string {
  const explicit = locale === 'ru' ? tier.labelRu : tier.labelUz;
  if (explicit) return explicit;

  if (tier.maxQty == null) {
    return locale === 'ru'
      ? `от ${tier.minQty} ${unitLabel}`
      : `${tier.minQty} ${unitLabel} dan`;
  }

  return `${tier.minQty}–${tier.maxQty} ${unitLabel}`;
}
