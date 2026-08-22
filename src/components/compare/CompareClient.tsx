'use client';

import { useCompareStore } from '@/store/useCompareStore';
import { formatPrice, formatUnit } from '@/lib/formatters';
import Link from 'next/link';
import { Scale, Trash2, ArrowRight } from 'lucide-react';
import { MissingImage } from '@/components/product/MissingImage';
import { PageHero } from '@/components/layout/PageHero';
import { EmptyState } from '@/components/ui/EmptyState';

interface CompareClientProps {
  locale: string;
}

// Localized spec labels — raw spec keys are never shown to customers
const SPEC_LABELS: Record<string, { uz: string; ru: string }> = {
  texture: { uz: 'Faktura turi', ru: 'Текстура' },
  martindale: { uz: 'Ishqalanishga chidamlilik', ru: 'Износостойкость' },
  width: { uz: 'Eni', ru: 'Ширина' },
  density: { uz: 'Zichlik', ru: 'Плотность' },
  composition: { uz: 'Tarkibi', ru: 'Состав' },
  features: { uz: 'Xususiyatlari', ru: 'Особенности' },
  foam_type: { uz: 'Marka (PПУ)', ru: 'Марка ППУ' },
  hardness: { uz: 'Qattiqlik', ru: 'Жесткость' },
  size: { uz: 'List o‘lchami', ru: 'Размер листа' },
  thickness: { uz: 'Qalinligi', ru: 'Толщина' },
  power_type: { uz: 'Quvvat turi', ru: 'Тип питания' },
  pressure: { uz: 'Ishchi bosim', ru: 'Рабочее давление' },
  capacity: { uz: 'Magazin sig‘imi', ru: 'Емкость магазина' },
  staple_type: { uz: 'Skoba turi', ru: 'Тип скобы' },
  volume: { uz: 'Hajmi', ru: 'Объем' },
  drying_time: { uz: 'Qurish vaqti', ru: 'Время схватывания' },
  material: { uz: 'Material', ru: 'Материал' },
  load_capacity: { uz: 'Yuk ko‘tarish quvvati', ru: 'Нагрузка' },
  mechanism_type: { uz: 'Mexanizm turi', ru: 'Тип механизма' },
};

export function CompareClient({ locale }: CompareClientProps) {
  const { items, removeCompare, clearCompare } = useCompareStore();

  const specLabel = (key: string) => {
    const label = SPEC_LABELS[key.toLowerCase()];
    return label ? (locale === 'ru' ? label.ru : label.uz) : key.replace(/_/g, ' ');
  };

  // Collect all spec keys present across compared products
  const allSpecKeys = Array.from(
    new Set(items.flatMap((p) => (p.specs || []).map((s: any) => s.specKey || s.key)))
  );

  return (
    <div className="space-y-6">
      <PageHero
        icon={Scale}
        kicker={locale === 'ru' ? 'Сравнение' : 'Solishtirish'}
        title={locale === 'ru' ? 'Сравнение товаров' : 'Mahsulotlarni solishtirish'}
        subtitle={
          locale === 'ru'
            ? `Сравнивается ${items.length} товаров`
            : `${items.length} ta mahsulot solishtirilmoqda`
        }
      >
        {items.length > 0 && (
          <button
            onClick={clearCompare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-bold text-muted transition hover:border-accent/40 hover:text-accent"
          >
            <Trash2 className="w-4 h-4" />
            <span>{locale === 'ru' ? 'Очистить все' : 'Barchasini tozalash'}</span>
          </button>
        )}
      </PageHero>

      {items.length === 0 ? (
        <EmptyState
          icon={Scale}
          title={locale === 'ru' ? 'Список сравнения пуст' : 'Solishtirish ro‘yxati bo‘sh'}
          description={
            locale === 'ru'
              ? 'Добавьте товары в сравнение с помощью иконки весов на карточках товаров.'
              : 'Mahsulot kartasidagi tarozu belgisi orqali mahsulotlarni solishtirishga qo‘shing.'
          }
          action={
            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow transition"
            >
              <span>{locale === 'ru' ? 'В каталог' : 'Katalogga o‘tish'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />
      ) : (
        <div className="bg-surface rounded-2xl border border-border overflow-x-auto shadow-xs p-4">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-xs font-bold text-muted uppercase w-40 align-top">
                  {locale === 'ru' ? 'Характеристика' : 'Xususiyat'}
                </th>
                {items.map((prod) => (
                  <th key={prod.id} className="p-4 min-w-[220px] align-top">
                    <div className="space-y-2 relative">
                      <button
                        onClick={() => removeCompare(prod.id)}
                        className="absolute -top-2 -right-2 p-1 text-muted hover:text-accent bg-secondary rounded-full z-10"
                        title={locale === 'ru' ? 'Убрать' : 'Olib tashlash'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="w-32 h-32 rounded-xl border border-border overflow-hidden mx-auto bg-secondary">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <MissingImage locale={locale} />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-heading text-center line-clamp-2">
                        {locale === 'ru' ? prod.titleRu : prod.titleUz}
                      </h4>
                      <div className="text-center font-black text-accent text-sm">
                        {formatPrice(prod.price, locale)} / {formatUnit(prod.unitType, locale)}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              <tr>
                <td className="p-4 font-bold text-muted">
                  {locale === 'ru' ? 'Категория' : 'Kategoriya'}
                </td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-heading">
                    {p.categoryName || '—'}
                  </td>
                ))}
              </tr>
              {allSpecKeys.map((specKey) => (
                <tr key={specKey}>
                  <td className="p-4 font-bold text-muted">{specLabel(specKey)}</td>
                  {items.map((p) => {
                    const spec = (p.specs || []).find((s: any) => (s.specKey || s.key) === specKey);
                    return (
                      <td key={p.id} className="p-4 text-body font-bold">
                        {spec ? (locale === 'ru' ? spec.specValueRu : spec.specValueUz) : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
