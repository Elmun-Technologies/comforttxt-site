import { describe, it, expect } from 'vitest';
import {
  resolveTier,
  resolveTierPrice,
  calculateTieredSubtotal,
  tierDiscountPercent,
  tierSavings,
  nextTierHint,
  sortTiers,
  formatTierRange,
} from '@/lib/pricing/tiers';
import type { PriceTier } from '@/services/storefront/types';

/**
 * Volume price ladder used across the suite — a realistic upholstery fabric:
 * retail cut, workshop batch, and full-roll production volume.
 */
const FABRIC_TIERS: PriceTier[] = [
  { minQty: 1, maxQty: 9, price: 145_000 },
  { minQty: 10, maxQty: 49, price: 132_000 },
  { minQty: 50, price: 118_000 },
];

const BASE = 145_000;

describe('resolveTier — selecting the applicable rung', () => {
  it('selects the retail rung below the first volume break', () => {
    expect(resolveTier(FABRIC_TIERS, 1)?.price).toBe(145_000);
    expect(resolveTier(FABRIC_TIERS, 9)?.price).toBe(145_000);
  });

  it('selects the mid rung exactly at and inside its boundaries', () => {
    expect(resolveTier(FABRIC_TIERS, 10)?.price).toBe(132_000);
    expect(resolveTier(FABRIC_TIERS, 49)?.price).toBe(132_000);
  });

  it('selects the open-ended top rung at and above its minimum', () => {
    expect(resolveTier(FABRIC_TIERS, 50)?.price).toBe(118_000);
    expect(resolveTier(FABRIC_TIERS, 5_000)?.price).toBe(118_000);
  });

  it('handles fractional metre quantities, which fabric is sold in', () => {
    expect(resolveTier(FABRIC_TIERS, 9.5)?.price).toBe(145_000);
    expect(resolveTier(FABRIC_TIERS, 10.5)?.price).toBe(132_000);
    expect(resolveTier(FABRIC_TIERS, 49.5)?.price).toBe(132_000);
  });

  it('is order-independent — an unsorted ladder resolves identically', () => {
    const shuffled = [FABRIC_TIERS[2], FABRIC_TIERS[0], FABRIC_TIERS[1]];
    expect(resolveTier(shuffled, 25)?.price).toBe(132_000);
    expect(resolveTier(shuffled, 80)?.price).toBe(118_000);
  });

  it('returns null for absent, empty or non-positive input', () => {
    expect(resolveTier(undefined, 10)).toBeNull();
    expect(resolveTier([], 10)).toBeNull();
    expect(resolveTier(FABRIC_TIERS, 0)).toBeNull();
    expect(resolveTier(FABRIC_TIERS, -5)).toBeNull();
    expect(resolveTier(FABRIC_TIERS, NaN)).toBeNull();
  });

  it('returns null when the quantity falls short of every rung', () => {
    const startsAtTen: PriceTier[] = [{ minQty: 10, price: 90_000 }];
    expect(resolveTier(startsAtTen, 4)).toBeNull();
  });
});

describe('resolveTierPrice — effective unit price', () => {
  it('falls back to the base price when no ladder is configured', () => {
    expect(resolveTierPrice(BASE, undefined, 100)).toBe(BASE);
    expect(resolveTierPrice(BASE, [], 100)).toBe(BASE);
  });

  it('falls back to the base price below the first rung', () => {
    const startsAtTen: PriceTier[] = [{ minQty: 10, price: 90_000 }];
    expect(resolveTierPrice(BASE, startsAtTen, 3)).toBe(BASE);
  });

  it('applies the volume price once a break is reached', () => {
    expect(resolveTierPrice(BASE, FABRIC_TIERS, 50)).toBe(118_000);
  });
});

describe('calculateTieredSubtotal — integer UZS money model', () => {
  it('prices a retail cut at the base rung', () => {
    // 2.5 m × 145 000
    expect(calculateTieredSubtotal(BASE, FABRIC_TIERS, 2.5)).toBe(362_500);
  });

  it('prices a workshop batch at the mid rung', () => {
    // 12 m × 132 000
    expect(calculateTieredSubtotal(BASE, FABRIC_TIERS, 12)).toBe(1_584_000);
  });

  it('prices a production volume at the top rung', () => {
    // 60 m × 118 000
    expect(calculateTieredSubtotal(BASE, FABRIC_TIERS, 60)).toBe(7_080_000);
  });

  it('always returns a whole number of UZS for fractional quantities', () => {
    const total = calculateTieredSubtotal(BASE, FABRIC_TIERS, 12.5);
    expect(total).toBe(1_650_000);
    expect(Number.isInteger(total)).toBe(true);
  });

  it('avoids floating-point drift on awkward unit prices', () => {
    const odd: PriceTier[] = [{ minQty: 1, price: 33_333 }];
    const total = calculateTieredSubtotal(33_333, odd, 3.3);
    expect(Number.isInteger(total)).toBe(true);
    expect(total).toBe(Math.round(33_333 * 3.3));
  });
});

describe('tierDiscountPercent — badge value', () => {
  it('computes the saving against the base price', () => {
    expect(tierDiscountPercent(BASE, 132_000)).toBe(9);
    expect(tierDiscountPercent(BASE, 118_000)).toBe(19);
  });

  it('reports zero when the tier is not actually cheaper', () => {
    expect(tierDiscountPercent(BASE, BASE)).toBe(0);
    expect(tierDiscountPercent(BASE, 160_000)).toBe(0);
  });

  it('reports zero for a non-positive base price rather than dividing by zero', () => {
    expect(tierDiscountPercent(0, 100)).toBe(0);
  });
});

describe('tierSavings — "you saved" amount', () => {
  it('reports the money kept versus buying at the base price', () => {
    // 60 m: 60 × 145 000 = 8 700 000 vs 60 × 118 000 = 7 080 000
    expect(tierSavings(BASE, FABRIC_TIERS, 60)).toBe(1_620_000);
  });

  it('reports nothing at the base rung', () => {
    expect(tierSavings(BASE, FABRIC_TIERS, 5)).toBe(0);
  });

  it('never reports a negative saving', () => {
    const pricier: PriceTier[] = [{ minQty: 1, price: 200_000 }];
    expect(tierSavings(BASE, pricier, 10)).toBe(0);
  });
});

describe('nextTierHint — upsell nudge', () => {
  it('points at the next rung and the gap to reach it', () => {
    const hint = nextTierHint(FABRIC_TIERS, 8);
    expect(hint?.tier.price).toBe(132_000);
    expect(hint?.unitsAway).toBe(2);
  });

  it('handles a fractional gap without floating-point noise', () => {
    const hint = nextTierHint(FABRIC_TIERS, 47.5);
    expect(hint?.tier.price).toBe(118_000);
    expect(hint?.unitsAway).toBe(2.5);
  });

  it('goes quiet once the best rung is reached', () => {
    expect(nextTierHint(FABRIC_TIERS, 50)).toBeNull();
    expect(nextTierHint(FABRIC_TIERS, 500)).toBeNull();
  });

  it('does not advertise a rung that is not cheaper', () => {
    const flat: PriceTier[] = [
      { minQty: 1, maxQty: 9, price: 100_000 },
      { minQty: 10, price: 100_000 },
    ];
    expect(nextTierHint(flat, 5)).toBeNull();
  });

  it('returns null without a ladder', () => {
    expect(nextTierHint(undefined, 5)).toBeNull();
    expect(nextTierHint([], 5)).toBeNull();
  });
});

describe('sortTiers — display ordering', () => {
  it('orders rungs ascending without mutating the input', () => {
    const input = [FABRIC_TIERS[2], FABRIC_TIERS[0], FABRIC_TIERS[1]];
    const snapshot = [...input];
    const sorted = sortTiers(input);

    expect(sorted.map((t) => t.minQty)).toEqual([1, 10, 50]);
    expect(input).toEqual(snapshot);
  });
});

describe('formatTierRange — bilingual labels', () => {
  it('renders a closed range', () => {
    expect(formatTierRange(FABRIC_TIERS[1], 'm', 'uz')).toBe('10–49 m');
    expect(formatTierRange(FABRIC_TIERS[1], 'м', 'ru')).toBe('10–49 м');
  });

  it('renders an open-ended range in each locale', () => {
    expect(formatTierRange(FABRIC_TIERS[2], 'm', 'uz')).toBe('50 m dan');
    expect(formatTierRange(FABRIC_TIERS[2], 'м', 'ru')).toBe('от 50 м');
  });

  it('prefers an explicit label supplied by the data', () => {
    const custom: PriceTier = {
      minQty: 50,
      price: 118_000,
      labelUz: 'To‘liq rulon',
      labelRu: 'Целый рулон',
    };
    expect(formatTierRange(custom, 'm', 'uz')).toBe('To‘liq rulon');
    expect(formatTierRange(custom, 'м', 'ru')).toBe('Целый рулон');
  });
});
