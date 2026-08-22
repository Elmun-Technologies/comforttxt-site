export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'ON_ORDER' | 'OUT_OF_STOCK';

export type StorefrontUnitType = 'meter' | 'pcs' | 'sheet' | 'kg' | 'pack';

export interface StorefrontSpec {
  key: string;
  labelUz: string;
  labelRu: string;
  valueUz: string;
  valueRu: string;
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
  stockStatus: StockStatus;
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
