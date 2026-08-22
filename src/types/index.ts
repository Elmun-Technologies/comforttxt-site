export type UnitType = 'meter' | 'pcs' | 'sheet' | 'kg' | 'pack';

export interface ProductVariant {
  id: string;
  sku: string;
  nameUz: string;
  nameRu: string;
  colorHex?: string;
  colorName?: string;
  price: number;
  wholesalePrice: number;
  stock: number;
  minQtyStep?: number;
  quantityStep?: number;
  images: string[];
  isAvailable: boolean;
}

export interface ProductSpec {
  specKey: string; // e.g. "martindale", "density", "width", "composition", "foam_type", "mechanism_type", "power_type"
  specValueUz: string;
  specValueRu: string;
}

export interface Product {
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
  unitType: UnitType;
  minQtyStep: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  variants: ProductVariant[];
  specs: ProductSpec[];
}

export interface Category {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  descriptionUz: string;
  descriptionRu: string;
  iconName: string;
  subcategories?: { slug: string; nameUz: string; nameRu: string }[];
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  descriptionUz: string;
  descriptionRu: string;
  image: string;
}

export interface CartItem {
  variantId: string;
  productId: string;
  productTitle: string;
  sku: string;
  variantName: string;
  image: string;
  price: number;
  wholesalePrice: number;
  unitType: UnitType;
  minQtyStep: number;
  quantity: number;
}
