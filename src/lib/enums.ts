/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DOMAIN ENUMS
 * ─────────────────────────────────────────────────────────────────────────────
 * Plain-TypeScript mirrors of the enums declared in `prisma/schema.prisma`.
 *
 * Why these exist instead of importing from `@prisma/client`:
 *   `@prisma/client` only exposes enum *values* after `prisma generate` has
 *   run, which requires downloading the platform query engine. That makes
 *   type-checking, unit tests and CI fail on any machine where the engine has
 *   not been fetched yet. These constants are dependency-free, so application
 *   code and tests work regardless of generator state.
 *
 * The string values are identical to the database enum members, so they stay
 * assignment-compatible with the generated Prisma types at every call site.
 *
 * ⚠️  Keep in sync with `prisma/schema.prisma` — `tests/enums.test.ts` asserts
 * that the two never drift apart.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const Role = {
  CUSTOMER: 'CUSTOMER',
  B2B_CUSTOMER: 'B2B_CUSTOMER',
  MANAGER: 'MANAGER',
  CONTENT_MANAGER: 'CONTENT_MANAGER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const CustomerType = {
  RETAIL: 'RETAIL',
  WORKSHOP: 'WORKSHOP',
  MANUFACTURER: 'MANUFACTURER',
  FACTORY: 'FACTORY',
  DESIGNER: 'DESIGNER',
  OTHER: 'OTHER',
} as const;
export type CustomerType = (typeof CustomerType)[keyof typeof CustomerType];

export const UnitType = {
  METER: 'METER',
  PIECE: 'PIECE',
  SHEET: 'SHEET',
  KG: 'KG',
  PACK: 'PACK',
  SET: 'SET',
  ROLL: 'ROLL',
} as const;
export type UnitType = (typeof UnitType)[keyof typeof UnitType];

export const ImageType = {
  MAIN: 'MAIN',
  GALLERY: 'GALLERY',
  TEXTURE: 'TEXTURE',
  APPLICATION: 'APPLICATION',
  DETAIL: 'DETAIL',
  DIMENSION: 'DIMENSION',
} as const;
export type ImageType = (typeof ImageType)[keyof typeof ImageType];

export const StockStatus = {
  IN_STOCK: 'IN_STOCK',
  LOW_STOCK: 'LOW_STOCK',
  ON_ORDER: 'ON_ORDER',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
} as const;
export type StockStatus = (typeof StockStatus)[keyof typeof StockStatus];

export const MovementType = {
  RECEIPT: 'RECEIPT',
  ADJUSTMENT: 'ADJUSTMENT',
  ORDER_RESERVATION: 'ORDER_RESERVATION',
  ORDER_RELEASE: 'ORDER_RELEASE',
  ORDER_FULFILLMENT: 'ORDER_FULFILLMENT',
} as const;
export type MovementType = (typeof MovementType)[keyof typeof MovementType];

export const OrderStatus = {
  NEW: 'NEW',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  PACKED: 'PACKED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethod = {
  CASH: 'CASH',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CLICK: 'CLICK',
  PAYME: 'PAYME',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const DeliveryMethod = {
  COURIER: 'COURIER',
  PICKUP: 'PICKUP',
  REGIONAL_DELIVERY: 'REGIONAL_DELIVERY',
} as const;
export type DeliveryMethod = (typeof DeliveryMethod)[keyof typeof DeliveryMethod];

export const QuickOrderStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  CONVERTED: 'CONVERTED',
  CANCELLED: 'CANCELLED',
} as const;
export type QuickOrderStatus = (typeof QuickOrderStatus)[keyof typeof QuickOrderStatus];

export const WholesaleStatus = {
  NEW: 'NEW',
  REVIEWING: 'REVIEWING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CONTACTED: 'CONTACTED',
} as const;
export type WholesaleStatus = (typeof WholesaleStatus)[keyof typeof WholesaleStatus];

export const SampleStatus = {
  NEW: 'NEW',
  REVIEWING: 'REVIEWING',
  APPROVED: 'APPROVED',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;
export type SampleStatus = (typeof SampleStatus)[keyof typeof SampleStatus];
