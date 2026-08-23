import { PriceTier } from '@/services/storefront/types';
import { resolveTier, sortTiers, formatTierRange, tierDiscountPercent } from '@/lib/pricing/tiers';
import { formatPrice, formatUnit } from '@/lib/formatters';

interface PriceTierTableProps {
  tiers: PriceTier[];
  basePrice: number;
  unitType: string;
  locale: string;
  /** When given, the rung this quantity resolves to is highlighted. */
  activeQuantity?: number;
  className?: string;
}

/**
 * Volume price ladder — UX pattern #20, "the heart of the business" per the
 * vseinstrumenti.ru analysis. Fabric is bought by the batch, not the metre:
 * showing the 1–9 / 10–49 / 50+ break points up front communicates the
 * wholesale proposition without the buyer having to call a manager to learn it.
 */
export function PriceTierTable({ tiers, basePrice, unitType, locale, activeQuantity, className = '' }: PriceTierTableProps) {
  const sorted = sortTiers(tiers);
  const unitLabel = formatUnit(unitType, locale);
  const activeTier = activeQuantity != null ? resolveTier(sorted, activeQuantity) : null;

  return (
    <div className={`rounded-xl border border-border overflow-hidden ${className}`}>
      <table className="w-full text-xs">
        <tbody>
          {sorted.map((tier, idx) => {
            const discount = tierDiscountPercent(basePrice, tier.price);
            const isActive = activeTier != null && activeTier.minQty === tier.minQty;
            return (
              <tr
                key={idx}
                className={`border-b border-border last:border-0 transition ${
                  isActive ? 'bg-accent-light' : idx % 2 === 1 ? 'bg-secondary/50' : 'bg-surface'
                }`}
              >
                <td className={`px-3 py-2 font-semibold ${isActive ? 'text-accent' : 'text-body'}`}>
                  {formatTierRange(tier, unitLabel, locale)}
                </td>
                <td className={`px-3 py-2 text-right font-black ${isActive ? 'text-accent' : 'text-heading'}`}>
                  {formatPrice(tier.price, locale)}
                  <span className="font-medium text-muted"> / {unitLabel}</span>
                </td>
                <td className="px-3 py-2 text-right w-16">
                  {discount > 0 && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      −{discount}%
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
