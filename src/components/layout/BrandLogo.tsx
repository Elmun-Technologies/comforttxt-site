import Link from 'next/link';
import { Package } from 'lucide-react';
import { storefrontConfig } from '@/config/storefront';

interface BrandLogoProps {
  locale: string;
  size?: 'header' | 'footer';
  className?: string;
}

/**
 * Brand logo renderer.
 *
 * If a real Comfort TXT logo asset is configured (`storefrontConfig.logo.image`),
 * it is rendered as an <img>. Otherwise a clean text wordmark is used —
 * the implementation is ready for a direct asset replacement.
 */
export function BrandLogo({ locale, size = 'header', className = '' }: BrandLogoProps) {
  const logoImage = storefrontConfig.logo.image;

  if (logoImage) {
    return (
      <Link href="/" className={`flex items-center gap-2.5 flex-shrink-0 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoImage}
          alt={storefrontConfig.logo.alt || storefrontConfig.name}
          className={size === 'footer' ? 'h-9 w-auto' : 'h-10 w-auto'}
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={`flex items-center gap-2.5 flex-shrink-0 ${className}`}>
      <div
        className={`bg-accent rounded-xl flex items-center justify-center shadow-[0_2px_10px_rgba(197,160,89,0.3)] ${
          size === 'footer' ? 'w-9 h-9' : 'w-9 h-9'
        }`}
      >
        <Package className="w-5 h-5 text-surface" />
      </div>
      <div>
        <div className="text-xl font-black text-heading tracking-tight leading-none">
          COMFORT <span className="text-accent">TXT</span>
        </div>
        <div className="text-[10px] font-bold text-muted tracking-wider uppercase mt-0.5">
          {locale === 'ru' ? storefrontConfig.taglineRu : storefrontConfig.taglineUz}
        </div>
      </div>
    </Link>
  );
}
