import { brandIdentity } from '@/config/brand';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * STOREFRONT PUBLIC CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for customer-facing brand and contact information.
 *
 * ⚠️  IMPORTANT — contact values below are intentionally empty until confirmed.
 * The UI automatically hides empty fields, so no placeholder business details
 * are ever published.
 *
 * Mock product/catalog data lives in `src/services/storefront/MockStorefrontService.ts`
 * and is replaced by ShopFlow in production.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const storefrontConfig = {
  name: brandIdentity.name,

  // Brand positioning (neutral — no unverified claims)
  taglineUz: 'Mebel materiallari va professional furnitura',
  taglineRu: 'Мебельные материалы и профессиональная фурнитура',

  // ── Logo ──────────────────────────────────────────────────────────────────
  // Approved Comfort Textile badge (circular sofa emblem, corporate blue).
  // `image` is used on light surfaces, `imageDark` on dark/navy surfaces.
  // The typographic wordmark stays as the accessible text lockup beside it.
  logo: {
    image: '/images/brand/comfort-textile-logo.png',
    imageDark: '/images/brand/comfort-textile-logo-white.png',
    alt: brandIdentity.name,
    wordmark: {
      primary: 'COMFORT',
      secondary: 'TEXTILE',
    },
  },

  // ── Hero visual ───────────────────────────────────────────────────────────
  // Real Comfort Textile showroom / finished-piece photography.
  heroImage: '/images/products/showroom/yashash-xonasi-divani.jpg',

  // ── Decorative brand patterns ─────────────────────────────────────────────
  // The approved guidebook ring motif, rebuilt as seamless transparent SVG
  // tiles (no remote fetch) in the corporate blue / cream. Used as subtle
  // background accents across the storefront via the `.pattern-*` utilities
  // in `globals.css`.
  patterns: {
    rings: '/images/patterns/rings.svg',
    ringsDark: '/images/patterns/rings-dark.svg',
  },

  // ── Public contact information ────────────────────────────────────────────
  // TODO: confirm before launch — do not invent these values.
  phone: '',
  phoneRaw: '', // used for tel: links, hidden until set
  phoneSecondary: '',

  // Telegram (channel / shortlink / manager bot) — hidden until verified.
  telegramChannelUrl: '',
  telegramShortUrl: '',
  telegramBotOrManagerUrl: '',

  // Warehouse / store address — hidden until verified.
  addressUz: '',
  addressRu: '',

  // Working hours — hidden until verified.
  workingHoursUz: '',
  workingHoursRu: '',

  // Social links — hidden while empty.
  socials: {
    instagram: '',
    telegram: '',
  },

  // Contact e-mail — hidden while empty.
  email: '',
} as const;
