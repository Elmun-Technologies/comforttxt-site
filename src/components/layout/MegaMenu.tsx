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
      title: locale === 'ru' ? 'МЕБЕЛЬНЫЕ ТКАНИ' : 'MEBEL MATOLARI',
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
      title: locale === 'ru' ? 'ПРОИЗВОДСТВО МЕБЕЛИ' : 'MEBEL ISHLAB CHIQARISH',
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
                <ul className="space-y-1 text-xs">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group/item text-body hover:text-accent font-semibold transition py-1 flex items-center justify-between gap-2 border-b border-dashed border-transparent hover:border-border/60"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="font-mono text-[9px] text-accent/0 group-hover/item:text-accent transition">
                            {String(itemIdx + 1).padStart(2, '0')}
                          </span>
                          {locale === 'ru' ? item.labelRu : item.labelUz}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Sample Box promo card */}
        <div className="bg-charcoal-950 p-5 rounded-xl border border-charcoal-900 flex flex-col justify-between space-y-3 relative overflow-hidden">
          <div aria-hidden="true" className="pattern-rings-dark pattern-fade absolute inset-0 pointer-events-none opacity-30" />
          <div className="relative space-y-2">
            <span className="inline-flex items-center gap-1 bg-accent/20 text-brand-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-accent/40">
              <Package className="w-3 h-3" />
              Sample Box
            </span>
            <h4 className="text-sm font-black text-surface leading-snug">
              {locale === 'ru' ? 'Закажите образцы тканей' : 'Matoni ko\'rmasdan tanlamang'}
            </h4>
            <p className="text-[11px] text-cream-200/60 leading-relaxed font-medium">
              {locale === 'ru'
                ? 'Соберём подборку образцов — условия передачи согласует менеджер.'
                : 'Namunalar to‘plamini tayyorlaymiz — berish shartlarini menejer kelishadi.'}
            </p>
          </div>

          <Link
            href="/sample-box"
            onClick={onClose}
            className="relative inline-flex items-center justify-between text-xs font-bold text-brand-300 hover:text-brand-200 pt-2 border-t border-surface/15"
          >
            <span>{locale === 'ru' ? 'Заказать Sample Box' : 'Sample Box so\'rash'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
