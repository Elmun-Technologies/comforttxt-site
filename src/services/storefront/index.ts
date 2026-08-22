import { IStorefrontService } from './StorefrontService';
import { MockStorefrontService } from './MockStorefrontService';
import { ShopFlowStorefrontService } from './ShopFlowStorefrontService';

export * from './types';
export * from './StorefrontService';
export * from './MockStorefrontService';
export * from './ShopFlowStorefrontService';

// Factory selecting active Storefront Service
function createStorefrontService(): IStorefrontService {
  if (process.env.NEXT_PUBLIC_DATA_SOURCE === 'shopflow' && process.env.SHOPFLOW_API_URL) {
    return new ShopFlowStorefrontService();
  }
  return new MockStorefrontService();
}

export const storefrontService = createStorefrontService();
