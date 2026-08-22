/**
 * ─────────────────────────────────────────────────────────────────────────────
 * STOREFRONT PUBLIC CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all customer-facing brand & contact information.
 *
 * ⚠️  IMPORTANT — VALUES BELOW ARE UNCONFIRMED PLACEHOLDERS.
 * Before production launch, replace every empty string with the REAL,
 * confirmed Comfort TXT business details. Do NOT publish the site with
 * invented phone numbers, addresses, or social links.
 *
 * The UI automatically HIDES any field that is empty — nothing fake is shown.
 *
 * Mock product/catalog data lives in `src/services/storefront/MockStorefrontService.ts`
 * and is REPLACED by ShopFlow. Never put mock business details in this file.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const storefrontConfig = {
  name: 'Comfort TXT',

  // Brand positioning (neutral — no unverified claims)
  taglineUz: 'Mebel materiallari va professional furnitura',
  taglineRu: 'Мебельные материалы и профессиональная фурнитура',

  // ── Logo ──────────────────────────────────────────────────────────────────
  // Drop the real Comfort TXT logo asset into `public/images/comfort-txt-logo.svg`
  // (or set `image` to its path) and the header/footer will render it
  // automatically. While no real asset exists, a text wordmark is shown.
  logo: {
    image: '', // e.g. '/images/comfort-txt-logo.svg' — empty = text wordmark
    alt: 'Comfort TXT',
  },

  // ── Hero visual ───────────────────────────────────────────────────────────
  // Replace with real Comfort TXT product/material photography when available.
  // The hero layout does not change — only the asset path.
  heroImage: '/images/hero-material.jpg',

  // ── Public contact information ────────────────────────────────────────────
  // TODO: CONFIRM WITH COMFORT TXT BEFORE LAUNCH — do not invent these values.
  phone: '', // e.g. '+998 (71) 200-88-99'  → unconfirmed, hidden until set
  phoneRaw: '', // e.g. '+998712008899' → used for `tel:` links, hidden until set
  phoneSecondary: '', // unconfirmed, hidden until set

  // Telegram (channel / shortlink / manager bot) — unconfirmed until verified.
  telegramChannelUrl: '', // e.g. 'https://t.me/Comfort_txt'
  telegramShortUrl: '', // e.g. 'https://rebrand.ly/comfort-txt' (verify before use)
  telegramBotOrManagerUrl: '', // e.g. 'https://t.me/comfort_txt_manager'

  // Warehouse / store address — unconfirmed until verified.
  addressUz: '', // e.g. 'Toshkent sh., Sergeli t., Kichik halqa yo‘li, 42'
  addressRu: '', // e.g. 'г. Ташкент, Сергелийский р-н, Малая кольцевая, 42'

  // Working hours — unconfirmed until verified.
  workingHoursUz: '', // e.g. 'Dush - Shan: 09:00 - 18:00'
  workingHoursRu: '', // e.g. 'Пн - Сб: 09:00 - 18:00'

  // Social links — unconfirmed until verified. Hidden while empty.
  socials: {
    instagram: '', // e.g. 'https://instagram.com/comfort_txt'
    telegram: '', // e.g. 'https://t.me/Comfort_txt'
  },

  // Contact e-mail — unconfirmed. Hidden while empty.
  email: '',
} as const;
