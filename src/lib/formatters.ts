export function formatPrice(amount: number, locale: string = 'uz'): string {
  const formatted = new Intl.NumberFormat('ru-RU').format(Math.round(amount));
  return locale === 'ru' ? `${formatted} сум` : `${formatted} so'm`;
}

export function formatUnit(unit: string, locale: string = 'uz'): string {
  const unitsUz: Record<string, string> = {
    meter: 'm',
    sheet: 'list',
    pcs: 'dona',
    kg: 'kg',
    pack: 'qadoq',
  };
  const unitsRu: Record<string, string> = {
    meter: 'м',
    sheet: 'лист',
    pcs: 'шт',
    kg: 'кг',
    pack: 'упак',
  };

  const map = locale === 'ru' ? unitsRu : unitsUz;
  return map[unit] || unit;
}

export function formatStockStatus(stock: number, locale: string = 'uz'): { label: string; color: string } {
  if (stock <= 0) {
    return {
      label: locale === 'ru' ? 'Под заказ' : 'Buyurtma asosida',
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    };
  }
  if (stock <= 20) {
    return {
      label: locale === 'ru' ? 'Заканчивается' : 'Kam qoldi',
      color: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    };
  }
  return {
    label: locale === 'ru' ? 'В наличии' : 'Omborda bor',
    color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  };
}
