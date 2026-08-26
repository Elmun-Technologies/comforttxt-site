import {
  IStorefrontService,
  HomepageData,
  StorefrontSearchResult,
} from './StorefrontService';
import {
  StorefrontProduct,
  StorefrontCategory,
  StorefrontCollection,
  StorefrontProductFilter,
  StorefrontCartPricing,
  StorefrontCartItemInput,
  StorefrontOrderInput,
  StorefrontOrderResult,
  StorefrontLeadInput,
  StorefrontLeadResult,
  StorefrontCustomer,
  StorefrontCustomerOrder,
} from './types';
import { enrichMockProduct } from './mockEnrichment';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DEVELOPMENT STOREFRONT DATA — COMFORT TEXTILE REAL CATALOGUE
 * ─────────────────────────────────────────────────────────────────────────────
 * The catalogue is the actual Comfort Textile assortment with real product
 * photography from `public/images/products` (see `realCatalog.ts`).
 * Prices are demo values (UZS) — replace with the current price list before
 * production launch. ShopFlow will provide authoritative data in production.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { REAL_PRODUCTS, REAL_CATEGORIES, REAL_COLLECTIONS } from './realCatalog';

/** Real Comfort Textile catalogue (see realCatalog.ts). */
export const MOCK_PRODUCTS: StorefrontProduct[] = REAL_PRODUCTS;
export const MOCK_CATEGORIES: StorefrontCategory[] = REAL_CATEGORIES;
export const MOCK_COLLECTIONS: StorefrontCollection[] = REAL_COLLECTIONS;
const MOCK_PRODUCTS_ENRICHED: StorefrontProduct[] = MOCK_PRODUCTS.map(enrichMockProduct);

// ── Development simulation knobs ─────────────────────────────────────────────
// Simulates ShopFlow remote latency & failures in development.
//   NEXT_PUBLIC_MOCK_LATENCY_MS=1500  → 1.5s delay per request
//   NEXT_PUBLIC_MOCK_FAIL_RATE=0.3    → 30% of requests fail
const MOCK_LATENCY_MS = Number(process.env.NEXT_PUBLIC_MOCK_LATENCY_MS || 0);
const MOCK_FAIL_RATE = Number(process.env.NEXT_PUBLIC_MOCK_FAIL_RATE || 0);

function delay(ms = MOCK_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail(): void {
  if (MOCK_FAIL_RATE > 0 && Math.random() < MOCK_FAIL_RATE) {
    throw new Error('MOCK_SERVICE_FAILURE');
  }
}

export class MockStorefrontService implements IStorefrontService {
  async getHomepage(locale = 'uz'): Promise<HomepageData> {
    await delay();
    maybeFail();
    return {
      heroCategories: MOCK_CATEGORIES,
      popularProducts: MOCK_PRODUCTS_ENRICHED.filter((p) => p.isPopular).slice(0, 4),
      newArrivals: MOCK_PRODUCTS_ENRICHED.filter((p) => p.isNew || p.isFeatured).slice(0, 4),
      featuredFabrics: MOCK_PRODUCTS_ENRICHED.filter((p) => p.categorySlug === 'mebel-matolari'),
      collections: MOCK_COLLECTIONS,
    };
  }

  async getCategories(locale = 'uz'): Promise<StorefrontCategory[]> {
    await delay();
    maybeFail();
    return MOCK_CATEGORIES;
  }

  async getCategory(slug: string, locale = 'uz'): Promise<StorefrontCategory | null> {
    await delay();
    maybeFail();
    return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
  }

  async getProducts(filter?: StorefrontProductFilter, locale = 'uz'): Promise<StorefrontProduct[]> {
    await delay();
    maybeFail();
    let result = [...MOCK_PRODUCTS_ENRICHED];

    if (!filter) return result;

    if (filter.categorySlug) {
      result = result.filter((p) => p.categorySlug === filter.categorySlug);
    }

    if (filter.collectionSlug) {
      result = result.filter((p) => p.collectionSlug === filter.collectionSlug);
    }

    if (filter.subCategorySlug) {
      const sub = filter.subCategorySlug.toLowerCase();
      result = result.filter((p) =>
        p.specs.some(
          (s) =>
            s.valueUz.toLowerCase().includes(sub) ||
            s.valueRu.toLowerCase().includes(sub)
        )
      );
    }

    if (filter.texture) {
      const t = filter.texture.toLowerCase();
      result = result.filter((p) =>
        p.specs.some((s) => s.key === 'texture' && s.valueUz.toLowerCase().includes(t))
      );
    }

    if (filter.foamType) {
      const f = filter.foamType.toLowerCase();
      result = result.filter((p) =>
        p.specs.some((s) => s.key === 'foam_type' && s.valueUz.toLowerCase().includes(f))
      );
    }

    if (filter.powerType) {
      const pt = filter.powerType.toLowerCase();
      result = result.filter((p) =>
        p.specs.some((s) => s.key === 'power_type' && s.valueUz.toLowerCase().includes(pt))
      );
    }

    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter((p) =>
        p.titleUz.toLowerCase().includes(q) ||
        p.titleRu.toLowerCase().includes(q) ||
        p.variants.some((v) => v.sku.toLowerCase().includes(q))
      );
    }

    if (filter.minPrice) {
      result = result.filter((p) => p.variants.some((v) => v.price >= filter.minPrice!));
    }

    if (filter.maxPrice) {
      result = result.filter((p) => p.variants.some((v) => v.price <= filter.maxPrice!));
    }

    if (filter.stockOnly) {
      result = result.filter((p) => p.variants.some((v) => v.stockStatus === 'IN_STOCK'));
    }

    if (filter.sort === 'price_asc') {
      result.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
    } else if (filter.sort === 'price_desc') {
      result.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
    }

    return result;
  }

  async getProduct(slug: string, locale = 'uz'): Promise<StorefrontProduct | null> {
    await delay();
    maybeFail();
    return MOCK_PRODUCTS_ENRICHED.find((p) => p.slug === slug) || null;
  }

  async getRelatedProducts(productId: string, locale = 'uz'): Promise<StorefrontProduct[]> {
    await delay();
    maybeFail();
    const current = MOCK_PRODUCTS_ENRICHED.find((p) => p.id === productId);
    if (!current) return MOCK_PRODUCTS_ENRICHED.slice(0, 3);

    if (current.crossSellProductIds && current.crossSellProductIds.length > 0) {
      const crossSells = MOCK_PRODUCTS_ENRICHED.filter((p) => current.crossSellProductIds?.includes(p.id));
      if (crossSells.length > 0) return crossSells;
    }

    return MOCK_PRODUCTS_ENRICHED.filter((p) => p.id !== productId && p.categorySlug === current.categorySlug).slice(0, 3);
  }

  /**
   * Universal search with SKU-first ranking.
   * An EXACT SKU match (case-insensitive) is always ranked before
   * approximate text matches, so typing "F30D" surfaces the exact product first.
   */
  async searchProducts(query: string, locale = 'uz'): Promise<StorefrontSearchResult> {
    await delay();
    maybeFail();
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      return { products: [], collections: [], categories: [], totalMatches: 0 };
    }

    const exactSkuMatches = MOCK_PRODUCTS_ENRICHED.filter((p) =>
      p.variants.some((v) => v.sku.toLowerCase() === q)
    );

    const textMatches = MOCK_PRODUCTS_ENRICHED.filter(
      (p) =>
        (p.titleUz.toLowerCase().includes(q) || p.titleRu.toLowerCase().includes(q)) &&
        !exactSkuMatches.includes(p)
    );

    const skuPartialMatches = MOCK_PRODUCTS_ENRICHED.filter(
      (p) =>
        p.variants.some((v) => v.sku.toLowerCase().includes(q)) &&
        !exactSkuMatches.includes(p) &&
        !textMatches.includes(p)
    );

    const matchedProducts = [...exactSkuMatches, ...textMatches, ...skuPartialMatches];

    const matchedCollections = MOCK_COLLECTIONS.filter((c) =>
      c.name.toLowerCase().includes(q)
    );

    const matchedCategories = MOCK_CATEGORIES.filter(
      (c) =>
        c.nameUz.toLowerCase().includes(q) ||
        c.nameRu.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      collections: matchedCollections,
      categories: matchedCategories,
      totalMatches: matchedProducts.length + matchedCollections.length + matchedCategories.length,
    };
  }

  async getCollections(locale = 'uz'): Promise<StorefrontCollection[]> {
    await delay();
    maybeFail();
    return MOCK_COLLECTIONS;
  }

  async getCartPricing(items: StorefrontCartItemInput[], isB2B = false): Promise<StorefrontCartPricing> {
    await delay();
    maybeFail();
    let subtotal = 0;
    for (const item of items) {
      const priceToUse = (isB2B && item.wholesalePrice) ? item.wholesalePrice : item.price;
      subtotal += Math.round(priceToUse * item.quantity);
    }

    return {
      subtotal,
      discountAmount: 0,
      deliveryAmount: 0, // Delivery cost is confirmed by the manager after order
      total: subtotal,
      isB2B,
      currency: 'UZS',
    };
  }

  async submitOrder(input: StorefrontOrderInput): Promise<StorefrontOrderResult> {
    await delay();
    maybeFail();
    const todayStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `CT-${todayStr}-${randomSuffix}`;

    return {
      success: true,
      orderNumber,
      orderId: `ord-${Date.now()}`,
      total: input.items.reduce((acc, i) => acc + i.quantity * 50000, 0),
      status: 'NEW',
      createdAt: new Date().toISOString(),
      message: 'Buyurtmangiz qabul qilindi. Menejerimiz tez orada bog‘lanadi.',
    };
  }

  async submitQuickOrder(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    await delay();
    maybeFail();
    return {
      success: true,
      referenceId: `QO-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Tezkor buyurtmangiz qabul qilindi. Operatorimiz tez orada qo‘ng‘iroq qiladi.',
    };
  }

  async submitSampleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    await delay();
    maybeFail();
    return {
      success: true,
      referenceId: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Namunalar so‘rovingiz qabul qilindi. Menejerimiz tez orada bog‘lanadi.',
    };
  }

  async submitWholesaleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    await delay();
    maybeFail();
    return {
      success: true,
      referenceId: `B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Ulgurji hamkorlik arizangiz qabul qilindi. Menejerimiz tez orada bog‘lanadi.',
    };
  }

  /**
   * No fake customer data. Returns null until ShopFlow provides real accounts.
   */
  async getCustomer(id: string): Promise<StorefrontCustomer | null> {
    await delay();
    maybeFail();
    return null;
  }

  /**
   * No fake order history. Returns an empty list until ShopFlow provides real orders.
   */
  async getCustomerOrders(customerId: string): Promise<StorefrontCustomerOrder[]> {
    await delay();
    maybeFail();
    return [];
  }
}
