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

/**
 * ShopFlowStorefrontService
 * 
 * Future Production Adapter for ShopFlow Backend System.
 * ShopFlow will own:
 * - Products, Variants, SKUs
 * - Categories, Collections
 * - Authoritative Pricing & Inventory
 * - Order lifecycle & Customer management
 * 
 * TODO: Connect to ShopFlow REST / GraphQL endpoints once contract specs are provided.
 */
export class ShopFlowStorefrontService implements IStorefrontService {
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor(config?: { baseUrl?: string; apiKey?: string }) {
    this.baseUrl = config?.baseUrl || process.env.SHOPFLOW_API_URL || '';
    this.apiKey = config?.apiKey || process.env.SHOPFLOW_API_KEY;
  }

  async getHomepage(locale = 'uz'): Promise<HomepageData> {
    // TODO: fetch(`${this.baseUrl}/storefront/homepage?locale=${locale}`)
    throw new Error('ShopFlowStorefrontService: getHomepage not yet connected. Configure ShopFlow API.');
  }

  async getCategories(locale = 'uz'): Promise<StorefrontCategory[]> {
    // TODO: fetch(`${this.baseUrl}/storefront/categories?locale=${locale}`)
    throw new Error('ShopFlowStorefrontService: getCategories not yet connected.');
  }

  async getCategory(slug: string, locale = 'uz'): Promise<StorefrontCategory | null> {
    // TODO: fetch(`${this.baseUrl}/storefront/categories/${slug}?locale=${locale}`)
    throw new Error('ShopFlowStorefrontService: getCategory not yet connected.');
  }

  async getProducts(filter?: StorefrontProductFilter, locale = 'uz'): Promise<StorefrontProduct[]> {
    // TODO: fetch(`${this.baseUrl}/storefront/products?...`)
    throw new Error('ShopFlowStorefrontService: getProducts not yet connected.');
  }

  async getProduct(slug: string, locale = 'uz'): Promise<StorefrontProduct | null> {
    // TODO: fetch(`${this.baseUrl}/storefront/products/${slug}?locale=${locale}`)
    throw new Error('ShopFlowStorefrontService: getProduct not yet connected.');
  }

  async getRelatedProducts(productId: string, locale = 'uz'): Promise<StorefrontProduct[]> {
    // TODO: fetch(`${this.baseUrl}/storefront/products/${productId}/related?locale=${locale}`)
    throw new Error('ShopFlowStorefrontService: getRelatedProducts not yet connected.');
  }

  async searchProducts(query: string, locale = 'uz'): Promise<StorefrontSearchResult> {
    // TODO: fetch(`${this.baseUrl}/storefront/search?q=${encodeURIComponent(query)}&locale=${locale}`)
    throw new Error('ShopFlowStorefrontService: searchProducts not yet connected.');
  }

  async getCollections(locale = 'uz'): Promise<StorefrontCollection[]> {
    // TODO: fetch(`${this.baseUrl}/storefront/collections?locale=${locale}`)
    throw new Error('ShopFlowStorefrontService: getCollections not yet connected.');
  }

  async getCartPricing(items: StorefrontCartItemInput[], isB2B = false): Promise<StorefrontCartPricing> {
    // TODO: post(`${this.baseUrl}/storefront/cart/quote`, { items, isB2B })
    throw new Error('ShopFlowStorefrontService: getCartPricing not yet connected.');
  }

  async submitOrder(input: StorefrontOrderInput): Promise<StorefrontOrderResult> {
    // TODO: post(`${this.baseUrl}/storefront/orders`, input)
    throw new Error('ShopFlowStorefrontService: submitOrder not yet connected.');
  }

  async submitQuickOrder(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    // TODO: post(`${this.baseUrl}/storefront/leads/quick-order`, input)
    throw new Error('ShopFlowStorefrontService: submitQuickOrder not yet connected.');
  }

  async submitSampleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    // TODO: post(`${this.baseUrl}/storefront/leads/sample-request`, input)
    throw new Error('ShopFlowStorefrontService: submitSampleRequest not yet connected.');
  }

  async submitWholesaleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    // TODO: post(`${this.baseUrl}/storefront/leads/wholesale`, input)
    throw new Error('ShopFlowStorefrontService: submitWholesaleRequest not yet connected.');
  }

  async getCustomer(id: string): Promise<StorefrontCustomer | null> {
    // TODO: fetch(`${this.baseUrl}/storefront/customers/${id}`)
    throw new Error('ShopFlowStorefrontService: getCustomer not yet connected.');
  }

  async getCustomerOrders(customerId: string): Promise<StorefrontCustomerOrder[]> {
    // TODO: fetch(`${this.baseUrl}/storefront/customers/${customerId}/orders`)
    throw new Error('ShopFlowStorefrontService: getCustomerOrders not yet connected.');
  }
}
