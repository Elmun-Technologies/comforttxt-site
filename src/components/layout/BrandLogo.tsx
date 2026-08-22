import Link from 'next/link';
import { storefrontConfig } from '@/config/storefront';

interface BrandLogoProps {
  locale: string;
  size?: 'header' | 'footer';
  className?: string;
}

/**
 * Brand logo renderer.
 *
 * An approved logo asset takes precedence. Without an asset, we render the
 * controlled Comfort Textile typographic lockup rather than inventing an icon
 * that is not part of the brandbook.
 */
export function BrandLogo({ size = 'header', className = '' }: BrandLogoProps) {
  const logoImage = storefrontConfig.logo.image;
  const isFooter = size === 'footer';

  if (logoImage) {
    return (
      <Link href="/" aria-label={storefrontConfig.name} className={`flex items-center flex-shrink-0 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoImage}
          alt={storefrontConfig.logo.alt || storefrontConfig.name}
          className={isFooter ? 'h-9 w-auto' : 'h-10 w-auto'}
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={storefrontConfig.name}
      className={`group flex flex-col leading-none flex-shrink-0 ${className}`}
    >
      <span
        className={`font-display font-bold tracking-[0.06em] transition-colors ${
          isFooter ? 'text-cream-400 text-[1.28rem]' : 'text-heading text-[1.3rem]'
        }`}
      >
        {storefrontConfig.logo.wordmark.primary}
      </span>
      <span
        className={`mt-1 font-sans text-[8px] font-black uppercase tracking-[0.33em] transition-colors ${
          isFooter ? 'text-brand-200 group-hover:text-cream-400' : 'text-brand-500 group-hover:text-accent'
        }`}
      >
        {storefrontConfig.logo.wordmark.secondary}
      </span>
    </Link>
  );
}
