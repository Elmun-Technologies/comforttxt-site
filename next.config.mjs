import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/**
 * Remote image hosts for next/image.
 *
 * Product photography is expected from several sources (Supabase Storage
 * buckets, external CDNs), so the allowlist is env-driven instead of baked in:
 *
 *   NEXT_PUBLIC_SUPABASE_URL      → its hostname is allowed automatically
 *   NEXT_PUBLIC_IMAGE_HOSTS       → comma-separated extra hostnames
 *                                   (e.g. "cdn.example.com,images.example.org")
 *
 * Until the storefront migrates to next/image, product photos render through
 * the central ProductImage component (plain <img>) which accepts any host —
 * this config makes that future migration a one-file change.
 */
function buildRemotePatterns() {
  const hostnames = new Set(['images.unsplash.com']);

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      hostnames.add(new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname);
    } catch {
      // Malformed URL — ignore rather than fail the build.
    }
  }

  (process.env.NEXT_PUBLIC_IMAGE_HOSTS || '')
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean)
    .forEach((h) => hostnames.add(h));

  return Array.from(hostnames).map((hostname) => ({ protocol: 'https', hostname }));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: buildRemotePatterns(),
  },
};

export default withNextIntl(nextConfig);
