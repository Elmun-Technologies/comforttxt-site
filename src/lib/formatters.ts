import { StockStatus } from '@/services/storefront/types';

export function formatPrice(amount: number, locale: string = 'uz'): string {
  const formatted = new Intl.NumberFormat('ru-RU').format(Math.round(amount));
  return locale === 'ru' ? `${formatted} сум` : `${formatted} so‘m`;
}

export function formatUnit(unit: string, locale: string = 'uz'): string {
  const unitsUz: Record<string, string> = {
    meter: 'metr',
    sheet: 'list',
    pcs: 'dona',
    kg: 'kg',
    pack: 'qadoq',
  };
  const unitsRu: Record<string, string> = {
    meter: 'метр',
    sheet: 'лист',
    pcs: 'шт',
    kg: 'кг',
    pack: 'упак',
  };

  const map = locale === 'ru' ? unitsRu : unitsUz;
  return map[unit.toLowerCase()] || unit;
}

/** Trims a stepped quantity to a clean display string: 4 → "4", 3.5 → "3.5". */
export function formatQuantity(qty: number): string {
  const rounded = Math.round(qty * 100) / 100;
  return rounded.toString();
}

export function formatStockStatus(
  stockOrStatus: number | StockStatus | string,
  locale: string = 'uz'
): { label: string; color: string } {
  let status: StockStatus = 'IN_STOCK';

  if (typeof stockOrStatus === 'string') {
    if (stockOrStatus === 'LOW_STOCK' || stockOrStatus === 'ON_ORDER' || stockOrStatus === 'OUT_OF_STOCK') {
      status = stockOrStatus as StockStatus;
    } else {
      status = 'IN_STOCK';
    }
  } else if (typeof stockOrStatus === 'number') {
    if (stockOrStatus <= 0) status = 'ON_ORDER';
    else if (stockOrStatus <= 20) status = 'LOW_STOCK';
    else status = 'IN_STOCK';
  }

  switch (status) {
    case 'OUT_OF_STOCK':
      return {
        label: locale === 'ru' ? 'Нет в наличии' : 'Mavjud emas',
        color: 'bg-red-500/10 text-red-700 border-red-500/20',
      };
    case 'ON_ORDER':
      return {
        label: locale === 'ru' ? 'Под заказ' : 'Buyurtma asosida',
        color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
      };
    case 'LOW_STOCK':
      return {
        label: locale === 'ru' ? 'Kam qoldi' : 'Kam qoldi',
        color: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      };
    case 'IN_STOCK':
    default:
      return {
        label: locale === 'ru' ? 'В наличии' : 'Omborda mavjud',
        color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
      };
  }
}
