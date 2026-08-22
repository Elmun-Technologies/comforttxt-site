import { ImageOff } from 'lucide-react';

interface MissingImageProps {
  locale?: string;
  className?: string;
  compact?: boolean;
}

/**
 * Professional missing-image state for products without photography.
 * Used by ProductCard, PDP, cart, compare and search results.
 * Never shows the browser broken-image icon.
 */
export function MissingImage({ locale = 'uz', className = '', compact = false }: MissingImageProps) {
  return (
    <div
      className={`relative overflow-hidden w-full h-full flex flex-col items-center justify-center gap-2 bg-secondary/80 ${
        compact ? 'p-2' : 'p-4'
      } ${className}`}
    >
      {/* Brand ring motif stands in for the missing photography */}
      <div
        aria-hidden="true"
        className={`pattern-rings ${compact ? 'pattern-sm' : ''} absolute inset-0 pointer-events-none`}
      />
      <div className="relative flex flex-col items-center gap-1.5 text-center">
        <ImageOff className={`${compact ? 'w-5 h-5' : 'w-8 h-8'} text-muted/70 stroke-[1.5]`} />
        <span className={`${compact ? 'text-[9px]' : 'text-[11px]'} font-bold text-muted`}>
          {locale === 'ru' ? 'Фото товара скоро будет' : 'Mahsulot fotosurati tez orada'}
        </span>
      </div>
    </div>
  );
}
