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

export interface HomepageData {
  heroCategories: StorefrontCategory[];
  popularProducts: StorefrontProduct[];
  newArrivals: StorefrontProduct[];
  featuredFabrics: StorefrontProduct[];
  collections: StorefrontCollection[];
}

export interface StorefrontSearchResult {
  products: StorefrontProduct[];
  collections: StorefrontCollection[];
  categories: StorefrontCategory[];
  totalMatches: number;
}

export interface IStorefrontService {
  /**
   * Fetch structured homepage payload with categories, popular products, new arrivals, collections
   */
  getHomepage(locale?: string): Promise<HomepageData>;

  /**
   * Fetch all active categories
   */
  getCategories(locale?: string): Promise<StorefrontCategory[]>;

  /**
   * Fetch single category by slug
   */
  getCategory(slug: string, locale?: string): Promise<StorefrontCategory | null>;

  /**
   * Fetch products with multi-attribute filtering, sorting & search
   */
  getProducts(filter?: StorefrontProductFilter, locale?: string): Promise<StorefrontProduct[]>;

  /**
   * Fetch single product detail by slug
   */
  getProduct(slug: string, locale?: string): Promise<StorefrontProduct | null>;

  /**
   * Fetch related / cross-sell products for a product
   */
  getRelatedProducts(productId: string, locale?: string): Promise<StorefrontProduct[]>;

  /**
   * Universal search matching SKU, product title, collections & categories
   */
  searchProducts(query: string, locale?: string): Promise<StorefrontSearchResult>;

  /**
   * Fetch curated collections
   */
  getCollections(locale?: string): Promise<StorefrontCollection[]>;

  /**
   * Calculate authoritative cart pricing
   */
  getCartPricing(items: StorefrontCartItemInput[], isB2B?: boolean): Promise<StorefrontCartPricing>;

  /**
   * Submit new customer order
   */
  submitOrder(input: StorefrontOrderInput): Promise<StorefrontOrderResult>;

  /**
   * Submit quick order lead
   */
  submitQuickOrder(input: StorefrontLeadInput): Promise<StorefrontLeadResult>;

  /**
   * Submit Sample Box request lead
   */
  submitSampleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult>;

  /**
   * Submit Wholesale partnership request lead
   */
  submitWholesaleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult>;

  /**
   * Fetch customer profile (for frontend account preview)
   */
  getCustomer(id: string): Promise<StorefrontCustomer | null>;

  /**
   * Fetch customer order history
   */
  getCustomerOrders(customerId: string): Promise<StorefrontCustomerOrder[]>;
}
