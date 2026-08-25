'use client';

import { useState } from 'react';
import { MissingImage } from '@/components/product/MissingImage';
import type { ImageFit } from '@/lib/media';

interface ProductImageProps {
  /** Any source: local /public path, Supabase Storage URL or an external CDN. */
  src?: string | null;
  alt: string;
  /** Framing inside the (square) container. Usually from `resolveImageFit()`. */
  fit?: ImageFit;
  locale?: string;
  /** Wrapper classes (sizing, radius, border…). */
  className?: string;
  /** Extra classes on the <img> itself (transitions, transforms…). */
  imgClassName?: string;
  /** Inline styles for the <img> — e.g. transform-origin for cursor-tracked zoom. */
  imgStyle?: React.CSSProperties;
  /** Compact placeholder for tight contexts (thumbnails, cart lines). */
  compact?: boolean;
  /** Eager-load above-the-fold imagery instead of lazy. */
  priority?: boolean;
}

/**
 * The single rendering path for product imagery (cards, PDP gallery, cart,
 * compare, search). Centralises the three things raw <img> tags could not
 * guarantee across the old codebase:
 *
 * 1. **Any host** — plain <img> works with local paths, Supabase Storage and
 *    external CDNs alike; no remotePatterns gate, so real product photos can
 *    land in any bucket without a config change. (Migrating this one component
 *    to next/image later migrates the whole storefront.)
 * 2. **No broken-image icon** — load errors fall back to the branded
 *    MissingImage state instead of the browser's default.
 * 3. **No layout jank** — the wrapper owns the aspect ratio; a shimmer plays
 *    until the bytes arrive, then the image fades in.
 */
export function ProductImage({
  src,
  alt,
  fit = 'cover',
  locale = 'uz',
  className = '',
  imgClassName = '',
  imgStyle,
  compact = false,
  priority = false,
}: ProductImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const showFallback = !src || status === 'error';

  if (showFallback) {
    return <MissingImage locale={locale} compact={compact} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${fit === 'contain' ? 'bg-white' : 'bg-secondary/60'} ${className}`}>
      {/* Shimmer while the photo loads — keeps the square occupied and calm. */}
      {status === 'loading' && (
        <div aria-hidden="true" className="absolute inset-0 image-shimmer" />
      )}
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        style={imgStyle}
        className={`
          w-full h-full transition-opacity duration-300
          ${fit === 'contain' ? 'object-contain' : 'object-cover'}
          ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}
          ${imgClassName}
        `.trim().replace(/\s+/g, ' ')}
      />
    </div>
  );
}
