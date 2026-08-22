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
  // The approved artwork can be added at this path later. Until then the UI
  // uses the controlled typographic lockup below instead of an invented mark.
  logo: {
    image: '', // e.g. '/images/comfort-textile-logo.svg' — empty = wordmark
    alt: brandIdentity.name,
    wordmark: {
      primary: 'COMFORT',
      secondary: 'TEXTILE',
    },
  },

  // ── Hero visual ───────────────────────────────────────────────────────────
  // Replace with approved Comfort Textile product/material photography when
  // available. The layout does not change — only the asset path.
  heroImage: '/images/hero-material.jpg',

  // ── Decorative textile patterns ───────────────────────────────────────────
  // Brand-aligned weave/twill textures rendered from inline SVGs (no remote
  // fetch). Used as subtle background accents across the storefront. Replace
  // these paths with approved guidebook patterns when delivered.
  patterns: {
    weave: '/images/patterns/weave.svg',
    twill: '/images/patterns/twill.svg',
    dots: '/images/patterns/dots.svg',
    weaveDark: '/images/patterns/weave-dark.svg',
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
