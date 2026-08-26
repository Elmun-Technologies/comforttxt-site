import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './useToastStore';

export interface CompareProduct {
  id: string;
  slug: string;
  titleUz: string;
  titleRu: string;
  categoryName: string;
  unitType: string;
  price: number;
  specs: { specKey: string; specValueUz: string; specValueRu: string }[];
  image: string;
}

interface CompareState {
  items: CompareProduct[];
  toggleCompare: (product: CompareProduct, locale?: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleCompare: (product, locale = 'uz') => {
        const items = get().items;
        const exists = items.some((p) => p.id === product.id);
        if (exists) {
          set({ items: items.filter((p) => p.id !== product.id) });
          useToastStore.getState().addToast(
            locale === 'ru' ? 'Удалено из сравнения' : 'Solishtirishdan o\'chirildi',
            'info'
          );
        } else {
          if (items.length >= 4) {
            useToastStore.getState().addToast(
              locale === 'ru' ? 'Можно сравнить максимум 4 товара' : 'Maksimal 4 ta mahsulotni solishtirish mumkin',
              'error'
            );
            return;
          }
          set({ items: [...items, product] });
          useToastStore.getState().addToast(
            locale === 'ru' ? 'Добавлено к сравнению' : 'Solishtirishga qo\'shildi',
            'success'
          );
        }
      },
      removeCompare: (id) => {
        set({ items: get().items.filter((p) => p.id !== id) });
      },
      clearCompare: () => set({ items: [] }),
      isInCompare: (id) => get().items.some((p) => p.id === id),
    }),
    {
      name: 'comfort_txt_compare',
    }
  )
);
