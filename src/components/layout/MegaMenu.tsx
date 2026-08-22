'use client';

import { Link } from '@/lib/i18n/navigation';
import { Palette, Layers, Hammer, ArrowRight, Package } from 'lucide-react';

interface MegaMenuProps {
  locale: string;
  onClose: () => void;
}

export function MegaMenu({ locale, onClose }: MegaMenuProps) {
  const sections = [
    {
      title: locale === 'ru' ? 'MEБЕЛЬНЫЕ ТКАНИ' : 'MEBEL MATOLARI',
      icon: Palette,
      items: [
        { labelUz: 'Velyur matolar', labelRu: 'Велюровые ткани', href: '/catalog/mebel-matolari?sub=velyur' },
        { labelUz: 'Bukle matolar', labelRu: 'Букле ткани', href: '/catalog/mebel-matolari?sub=bukle' },
        { labelUz: 'Shenill matolar', labelRu: 'Шенилл ткани', href: '/catalog/mebel-matolari?sub=shenill' },
        { labelUz: 'Rogojka matolar', labelRu: 'Рогожка ткани', href: '/catalog/mebel-matolari?sub=rogojka' },
        { labelUz: 'Mikrofibra', labelRu: 'Микрофибра', href: '/catalog/mebel-matolari?sub=mikrofibra' },
        { labelUz: 'Eko-charm', labelRu: 'Эко-кожа', href: '/catalog/mebel-matolari?sub=eko-charm' },
      ],
    },
    {
      title: locale === 'ru' ? 'ПРОИЗВОДСТВО MEБЕЛИ' : 'MEBEL ISHLAB CHIQARISH',
      icon: Layers,
      items: [
        { labelUz: 'Paralon ST / EL / HR', labelRu: 'Поролон ST / EL / HR', href: '/catalog/paralon' },
        { labelUz: 'Transformatsiya mexanizmlari', labelRu: 'Механизмы трансформации', href: '/catalog/mexanizmlar' },
        { labelUz: 'Mebel oyoqlari va petlyalar', labelRu: 'Ножки и петли', href: '/catalog/furnitura-va-oyoqlar' },
        { labelUz: 'Furnitura va Aksessuarlar', labelRu: 'Фурнитура и Аксессуары', href: '/catalog/furnitura-va-oyoqlar' },
      ],
    },
    {
      title: locale === 'ru' ? 'ИНСТРУМЕНТЫ И РАСХОДНИКИ' : 'INSTRUMENTLAR VA SARF',
      icon: Hammer,
      items: [
        { labelUz: 'Pnevmatik steplerlar (F30D/8016)', labelRu: 'Пневмостеплеры (F30D/8016)', href: '/catalog/sarf-materiallar-va-instrumentlar?sub=pnevmatik' },
        { labelUz: 'Akfix sprey yelimik', labelRu: 'Клей Akfix спрей', href: '/catalog/sarf-materiallar-va-instrumentlar?sub=yelim' },
        { labelUz: 'Zımba skobalar', labelRu: 'Скобы забивные', href: '/catalog/sarf-materiallar-va-instrumentlar?sub=skoba' },
      ],
    },
  ];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-surface border-b border-border shadow-xl z-50 animate-in fade-in duration-150"
    >
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Columns */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 border-r border-border pr-6">
          {sections.map((section, idx) => {
            const IconComp = section.icon;
            return (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-heading uppercase tracking-wider border-b border-border pb-2">
                  <IconComp className="w-4 h-4 text-accent" />
                  <span>{section.title}</span>
                </div>
                <ul className="space-y-1.5 text-xs">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-body hover:text-accent font-semibold transition py-1 block"
                      >
                        {locale === 'ru' ? item.labelRu : item.labelUz}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Tactical Editorial Promo Card */}
        <div className="bg-secondary p-5 rounded-xl border border-border flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 bg-accent-light text-accent text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
              <Package className="w-3 h-3" />
              Sample Swatch Kit
            </span>
            <h4 className="text-xs font-black text-heading leading-snug">
              {locale === 'ru' ? 'Закажите образцы тканей' : 'Matoni ko\'rmasdan tanlamang'}
            </h4>
            <p className="text-[11px] text-muted leading-relaxed font-medium">
              {locale === 'ru'
                ? 'Получите каталог образцов прямо в ваш цех или офис.'
                : 'Real rang va fakturalarni ustaxonangizda ko\'rib tanlang.'}
            </p>
          </div>

          <Link
            href="/sample-box"
            onClick={onClose}
            className="inline-flex items-center justify-between text-xs font-bold text-accent hover:text-accent-hover pt-2 border-t border-border"
          >
            <span>{locale === 'ru' ? 'Заказать Sample Box' : 'Sample Box so\'rash'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
