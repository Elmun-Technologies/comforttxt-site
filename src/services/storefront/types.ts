export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'ON_ORDER' | 'OUT_OF_STOCK';

export type StorefrontUnitType = 'meter' | 'pcs' | 'sheet' | 'kg' | 'pack';

export interface StorefrontSpec {
  key: string;
  labelUz: string;
  labelRu: string;
  valueUz: string;
  valueRu: string;
  /**
   * Optional grouping so the specs tab can render sections
   * ("Texnik", "O'lchamlar", "Parvarish") instead of one long list.
   */
  group?: string;
}

/**
 * One rung of a volume price ladder (UX pattern #20).
 *
 * Ranges are inclusive on both ends; an absent `maxQty` means "and above".
 * `price` is an integer UZS amount per single unit at this volume — the client
 * never derives it from a percentage. Resolution logic: `src/lib/pricing/tiers.ts`.
 */
export interface PriceTier {
  minQty: number;
  maxQty?: number;
  /** Integer UZS per unit at this volume. */
  price: number;
  /** Optional display override, e.g. "10–49 m". Generated when absent. */
  labelUz?: string;
  labelRu?: string;
}

export interface StorefrontVariant {
  id: string;
  sku: string;
  nameUz: string;
  nameRu: string;
  colorHex?: string;
  colorNameUz?: string;
  colorNameRu?: string;
  price: number; // UZS
  oldPrice?: number; // UZS
  wholesalePrice?: number; // UZS
  hasWholesale?: boolean;
  /**
   * Volume price ladder (UX pattern #20). Authoritative data from the
   * storefront service — when present it supersedes the flat `wholesalePrice`
   * for quantity-based pricing.
   */
  priceTiers?: PriceTier[];
  stockStatus: StockStatus;
  /**
   * Exact sellable quantity on hand, in the product's unit
   * (UX patterns #29 / #36 — "Omborda 340 m" rather than a vague "in stock").
   * Omitted when the upstream system cannot expose a precise figure; the UI
   * then falls back to the coarse `stockStatus` label.
   */
  onHandQuantity?: number;
  /** Quantity already reserved by open orders — never shown as sellable. */
  reservedQuantity?: number;
  /** Which warehouse the figures above refer to (UX patterns #13 / #45). */
  warehouseId?: string;
  quantityStep: number;
  minQuantity: number;
  images: string[];
  isAvailable: boolean;
}

export interface StorefrontProduct {
  id: string;
  slug: string;
  titleUz: string;
  titleRu: string;
  descriptionUz: string;
  descriptionRu: string;
  categorySlug: string;
  categoryNameUz: string;
  categoryNameRu: string;
  collectionSlug?: string;
  collectionName?: string;
  brand?: string;
  unitType: StorefrontUnitType;
  minQtyStep: number;
  primaryImage: string;
  images: string[];
  variants: StorefrontVariant[];
  specs: StorefrontSpec[];
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  crossSellProductIds?: string[];
  /**
   * Interchangeable products, offered when this one is unavailable
   * (UX pattern #27 — "Analoglar", so a dead end never ends the session).
   */
  analogProductIds?: string[];
  /** Manufacturer slug, for the brand catalogue and brand landing pages. */
  brandSlug?: string;
  /** Buying guides linked from the product page (UX pattern #30). */
  guideSlugs?: string[];
  /** Aggregate review score, 0–5 (UX pattern #39). Absent until reviews exist. */
  rating?: number;
  reviewCount?: number;
  /** Downloadable conformity documents shown to B2B buyers. */
  certificates?: {
    nameUz: string;
    nameRu: string;
    fileUrl: string;
  }[];
}

/**
 * A named, reusable product set — "Ro'yxatlar" / project estimates
 * (UX patterns #23 and #48).
 *
 * This is the workshop-facing counterpart of a wishlist: a maker assembles the
 * full bill of materials for one furniture model (fabric + foam + mechanism +
 * consumables), saves it under a project name, and re-orders it for every
 * production batch. Guests keep lists in localStorage; signed-in customers get
 * them server-side.
 */
export interface SavedList {
  id: string;
  name: string;
  items: {
    productId: string;
    variantId: string;
    sku: string;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
  /** Estimate mode adds priced totals and PDF export to the list view. */
  isEstimate: boolean;
  notes?: string;
}

/**
 * Back-in-stock notification request (UX pattern #28).
 * Doubles as demand signal: repeated alerts on one variant justify restocking.
 */
export interface StockAlertInput {
  productId: string;
  variantId: string;
  sku: string;
  phone: string;
  name?: string;
}

/** Customer review, optionally with photos of the finished piece (#39, #40). */
export interface ProductReview {
  id: string;
  productId: string;
  variantId?: string;
  authorName: string;
  rating: number;
  textUz?: string;
  textRu?: string;
  photos: string[];
  createdAt: string;
  /** Set when the reviewer's account has a delivered order containing the SKU. */
  isVerifiedPurchase: boolean;
}

export interface StorefrontCategory {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  descriptionUz: string;
  descriptionRu: string;
  iconName?: string;
  image?: string;
  productCount?: number;
  subcategories?: {
    slug: string;
    nameUz: string;
    nameRu: string;
  }[];
}

export interface StorefrontCollection {
  id: string;
  slug: string;
  name: string;
  descriptionUz: string;
  descriptionRu: string;
  image: string;
  productCount?: number;
}

export interface StorefrontProductFilter {
  categorySlug?: string;
  collectionSlug?: string;
  subCategorySlug?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  stockOnly?: boolean;
  texture?: string;
  foamType?: string;
  powerType?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}

export interface StorefrontCartItemInput {
  productId: string;
  variantId: string;
  sku: string;
  quantity: number;
  price: number;
  wholesalePrice?: number;
}

export interface StorefrontCartPricing {
  subtotal: number;
  discountAmount: number;
  deliveryAmount: number;
  total: number;
  isB2B: boolean;
  currency: string;
}

export interface StorefrontOrderInput {
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  deliveryMethod: 'COURIER' | 'PICKUP';
  deliveryRegion?: string;
  deliveryCity?: string;
  deliveryAddress: string;
  paymentMethod: 'CASH' | 'BANK_TRANSFER';
  comment?: string;
  items: {
    productId?: string;
    variantId: string;
    sku: string;
    quantity: number;
  }[];
  idempotencyKey?: string;
}

export interface StorefrontOrderResult {
  success: boolean;
  orderNumber: string;
  orderId: string;
  total: number;
  status: string;
  createdAt: string;
  message?: string;
}

export interface StorefrontLeadInput {
  type: 'QUICK_ORDER' | 'SAMPLE_REQUEST' | 'WHOLESALE_REQUEST';
  name: string;
  phone: string;
  companyName?: string;
  businessType?: string;
  region?: string;
  city?: string;
  notes?: string;
  productId?: string;
  variantId?: string;
  sku?: string;
  quantity?: number;
  requestedCollections?: string[];
}

export interface StorefrontLeadResult {
  success: boolean;
  referenceId: string;
  message: string;
}

export interface StorefrontCustomer {
  id: string;
  email?: string;
  phone: string;
  name: string;
  companyName?: string;
  isB2B: boolean;
  b2bApproved: boolean;
  b2bDiscountPercent?: number;
}

export interface StorefrontCustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  total: number;
  itemCount: number;
  items: {
    sku: string;
    productTitle: string;
    variantName?: string;
    quantity: number;
    unitType: StorefrontUnitType;
    unitPrice: number;
    lineTotal: number;
    image: string;
  }[];
}
