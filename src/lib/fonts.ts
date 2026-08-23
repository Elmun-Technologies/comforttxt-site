import { Exo_2 } from 'next/font/google';

/**
 * Brand typeface — Exo 2, self-hosted by Next.js at build time (no runtime
 * request to Google, no CLS from a late font swap). Variable weight, and the
 * `cyrillic` subset is required alongside `latin` since the storefront serves
 * both Uzbek (Latin) and Russian (Cyrillic) copy.
 *
 * Exposed as a CSS variable rather than `.className` so both `font-sans` and
 * `font-display` in `tailwind.config.ts` can point at the same loaded font.
 */
export const exo2 = Exo_2({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-exo2',
  display: 'swap',
});
