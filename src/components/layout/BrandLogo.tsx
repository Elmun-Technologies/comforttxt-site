import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { storefrontConfig } from '@/config/storefront';

interface BrandLogoProps {
  locale: string;
  size?: 'header' | 'footer';
  className?: string;
}

/**
 * Brand logo lockup.
 *
 * Renders the approved Comfort Textile badge (circular sofa emblem) next to
 * the typographic wordmark. The white emblem variant is used on the dark
 * footer, the corporate-blue one on light surfaces. If no artwork is
 * configured the component degrades to the wordmark alone.
 */
export function BrandLogo({ size = 'header', className = '' }: BrandLogoProps) {
  const isFooter = size === 'footer';
  const mark = isFooter
    ? storefrontConfig.logo.imageDark || storefrontConfig.logo.image
    : storefrontConfig.logo.image;

  const markSize = isFooter ? 40 : 42;

  return (
    <Link
      href="/"
      aria-label={storefrontConfig.name}
      className={`group flex items-center gap-2.5 flex-shrink-0 ${className}`}
    >
      {mark ? (
        <Image
          src={mark}
          alt={storefrontConfig.logo.alt || storefrontConfig.name}
          width={markSize}
          height={markSize}
          priority={!isFooter}
          className={`w-auto flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
            isFooter ? 'h-10' : 'h-[42px]'
          }`}
        />
      ) : null}

      <span className="flex flex-col leading-none">
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
      </span>
    </Link>
  );
}
