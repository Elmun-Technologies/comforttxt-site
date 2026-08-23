import { describe, it, expect } from 'vitest';
import { enrichMockProduct } from '@/services/storefront/mockEnrichment';
import type { StorefrontProduct, StorefrontVariant } from '@/services/storefront/types';

function makeVariant(overrides: Partial<StorefrontVariant> = {}): StorefrontVariant {
  return {
    id: 'v1',
    sku: 'TEST-SKU-01',
    nameUz: 'Test',
    nameRu: 'Тест',
    price: 145_000,
    wholesalePrice: 118_000,
    stockStatus: 'IN_STOCK',
    quantityStep: 0.5,
    minQuantity: 0.5,
    images: [],
    isAvailable: true,
    ...overrides,
  };
}

function makeProduct(variant: StorefrontVariant, unitType: StorefrontProduct['unitType'] = 'meter'): StorefrontProduct {
  return {
    id: 'p1',
    slug: 'test-product',
    titleUz: 'Test',
    titleRu: 'Тест',
    descriptionUz: '',
    descriptionRu: '',
    categorySlug: 'mebel-matolari',
    categoryNameUz: 'Mato',
    categoryNameRu: 'Ткань',
    unitType,
    minQtyStep: variant.quantityStep,
    primaryImage: '',
    images: [],
    variants: [variant],
    specs: [],
  };
}

describe('enrichMockProduct — exact stock quantity', () => {
  it('gives a positive, unit-stepped quantity for IN_STOCK variants', () => {
    const enriched = enrichMockProduct(makeProduct(makeVariant({ stockStatus: 'IN_STOCK' })));
    const qty = enriched.variants[0].onHandQuantity!;
    expect(qty).toBeGreaterThan(0);
    expect((qty * 2) % 1).toBe(0); // stays on the 0.5 m step for fabric
  });

  it('gives a small positive quantity for LOW_STOCK variants, below the IN_STOCK floor', () => {
    const enriched = enrichMockProduct(makeProduct(makeVariant({ stockStatus: 'LOW_STOCK' })));
    expect(enriched.variants[0].onHandQuantity).toBeGreaterThan(0);
    expect(enriched.variants[0].onHandQuantity).toBeLessThan(80);
  });

  it('is zero for OUT_OF_STOCK and ON_ORDER variants', () => {
    const outOfStock = enrichMockProduct(makeProduct(makeVariant({ stockStatus: 'OUT_OF_STOCK' })));
    const onOrder = enrichMockProduct(makeProduct(makeVariant({ stockStatus: 'ON_ORDER' })));
    expect(outOfStock.variants[0].onHandQuantity).toBe(0);
    expect(onOrder.variants[0].onHandQuantity).toBe(0);
  });

  it('is deterministic across repeated calls for the same SKU', () => {
    const a = enrichMockProduct(makeProduct(makeVariant()));
    const b = enrichMockProduct(makeProduct(makeVariant()));
    expect(a.variants[0].onHandQuantity).toBe(b.variants[0].onHandQuantity);
  });

  it('never overrides an explicitly set onHandQuantity', () => {
    const enriched = enrichMockProduct(makeProduct(makeVariant({ onHandQuantity: 7 })));
    expect(enriched.variants[0].onHandQuantity).toBe(7);
  });
});

describe('enrichMockProduct — volume price tiers', () => {
  it('builds an ascending 3-rung ladder ending at or below the wholesale price', () => {
    const enriched = enrichMockProduct(makeProduct(makeVariant()));
    const tiers = enriched.variants[0].priceTiers!;
    expect(tiers).toHaveLength(3);
    expect(tiers[0].price).toBe(145_000);
    expect(tiers[1].price).toBe(118_000);
    expect(tiers[2].price).toBeLessThanOrEqual(118_000);
    expect(tiers[0].minQty).toBeLessThan(tiers[1].minQty);
    expect(tiers[1].minQty).toBeLessThan(tiers[2].minQty);
  });

  it('produces no ladder when there is no cheaper wholesale price', () => {
    const enriched = enrichMockProduct(makeProduct(makeVariant({ wholesalePrice: undefined })));
    expect(enriched.variants[0].priceTiers).toBeUndefined();
  });

  it('never overrides explicitly provided priceTiers', () => {
    const explicit = [{ minQty: 1, price: 999 }];
    const enriched = enrichMockProduct(makeProduct(makeVariant({ priceTiers: explicit })));
    expect(enriched.variants[0].priceTiers).toBe(explicit);
  });

  it('scales bulk breakpoints by unit type (pcs vs meter)', () => {
    const meterProduct = enrichMockProduct(makeProduct(makeVariant(), 'meter'));
    const pcsProduct = enrichMockProduct(
      makeProduct(makeVariant({ quantityStep: 1, minQuantity: 1, sku: 'TEST-SKU-02' }), 'pcs')
    );
    expect(meterProduct.variants[0].priceTiers![1].minQty).toBe(10);
    expect(pcsProduct.variants[0].priceTiers![1].minQty).toBe(20);
  });
});
