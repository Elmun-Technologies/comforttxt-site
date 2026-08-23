import { StockStatus } from '@/services/storefront/types';
import { formatStockStatus, formatQuantity, formatUnit } from '@/lib/formatters';

interface StockIndicatorProps {
  stockStatus: StockStatus;
  onHandQuantity?: number;
  unitType: string;
  locale: string;
  className?: string;
}

/**
 * Precise on-hand quantity badge — UX patterns #29 / #36.
 *
 * "В наличии" tells a workshop buyer nothing useful: they already know they
 * need ~200 m for this batch and have to ask a manager whether that much is
 * even in stock. "На складе 340 м" answers that on sight. Falls back to the
 * coarse status label when the upstream system can't expose an exact figure.
 */
export function StockIndicator({ stockStatus, onHandQuantity, unitType, locale, className = '' }: StockIndicatorProps) {
  const { color } = formatStockStatus(stockStatus, locale);
  const unitLabel = formatUnit(unitType, locale);

  const label = (() => {
    if (stockStatus === 'OUT_OF_STOCK') {
      return locale === 'ru' ? 'Нет в наличии' : 'Mavjud emas';
    }
    if (stockStatus === 'ON_ORDER') {
      return locale === 'ru' ? 'Под заказ · ~7 дней' : 'Buyurtma asosida · ~7 kun';
    }
    if (onHandQuantity != null && onHandQuantity > 0) {
      const qty = `${formatQuantity(onHandQuantity)} ${unitLabel}`;
      if (stockStatus === 'LOW_STOCK') {
        return locale === 'ru' ? `Осталось ${qty}` : `Faqat ${qty} qoldi`;
      }
      return locale === 'ru' ? `На складе ${qty}` : `Omborda ${qty}`;
    }
    return formatStockStatus(stockStatus, locale).label;
  })();

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-md shadow-xs whitespace-nowrap ${color} ${className}`}>
      {label}
    </span>
  );
}
