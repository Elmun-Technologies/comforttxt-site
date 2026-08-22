'use client';

import { useCompareStore } from '@/store/useCompareStore';
import { formatPrice } from '@/lib/formatters';
import Link from 'next/link';
import { Scale, Trash2, ArrowRight } from 'lucide-react';

interface CompareClientProps {
  locale: string;
}

export function CompareClient({ locale }: CompareClientProps) {
  const { items, removeCompare, clearCompare } = useCompareStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-heading tracking-tight">
            {locale === 'ru' ? 'Сравнение товаров' : 'Mahsulotlarni Solishtirish'}
          </h1>
          <p className="text-xs text-muted mt-1 font-medium">
            {locale === 'ru'
              ? `Сравнивается ${items.length} товаров`
              : `${items.length} ta mahsulot solishtirilmoqda`}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-xs text-accent hover:underline flex items-center gap-1 font-bold"
          >
            <Trash2 className="w-4 h-4" />
            <span>{locale === 'ru' ? 'Очистить все' : 'Barchasini tozalash'}</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-surface rounded-2xl p-12 text-center border border-border shadow-xs my-8 space-y-4 max-w-md mx-auto">
          <Scale className="w-16 h-16 text-muted mx-auto stroke-1" />
          <h3 className="text-lg font-bold text-heading">
            {locale === 'ru' ? 'Список сравнения пуст' : 'Solishtirish ro\'yxati bo\'sh'}
          </h3>
          <p className="text-xs text-muted">
            {locale === 'ru'
              ? 'Добавьте товары в сравнение с помощью иконки весов на карточках товаров.'
              : 'Mahsulot kartasidagi tarozu belgisi orqali mahsulotlarni solishtirishga qo\'shing.'}
          </p>
          <Link
            href={`/${locale}/catalog`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-surface font-bold text-xs rounded-xl shadow transition"
          >
            <span>{locale === 'ru' ? 'В каталог' : 'Katalogga o\'tish'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-border overflow-x-auto shadow-xs p-4">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-xs font-bold text-muted uppercase w-48">
                  {locale === 'ru' ? 'Характеристика' : 'Xususiyat'}
                </th>
                {items.map((prod) => (
                  <th key={prod.id} className="p-4 min-w-[220px] align-top">
                    <div className="space-y-2 relative">
                      <button
                        onClick={() => removeCompare(prod.id)}
                        className="absolute -top-2 -right-2 p-1 text-muted hover:text-accent bg-secondary rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <img
                        src={prod.image}
                        alt=""
                        className="w-32 h-32 object-cover rounded-xl border border-border mx-auto"
                      />
                      <h4 className="text-xs font-bold text-heading text-center line-clamp-2">
                        {locale === 'ru' ? prod.titleRu : prod.titleUz}
                      </h4>
                      <div className="text-center font-black text-accent text-sm">
                        {formatPrice(prod.price, locale)} / {prod.unitType}
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
                    {p.categoryName}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-muted">
                  {locale === 'ru' ? 'Единица' : 'O\'lchov birligi'}
                </td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-heading">
                    {p.unitType}
                  </td>
                ))}
              </tr>
              {['martindale', 'density', 'width', 'composition', 'foam_type'].map((specKey) => (
                <tr key={specKey}>
                  <td className="p-4 font-bold text-muted capitalize">{specKey}</td>
                  {items.map((p) => {
                    const spec = p.specs?.find((s) => s.specKey === specKey);
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
