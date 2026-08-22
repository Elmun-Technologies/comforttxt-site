import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './useToastStore';

interface FavoritesState {
  productIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggleFavorite: (productId) => {
        const current = get().productIds;
        if (current.includes(productId)) {
          set({ productIds: current.filter((id) => id !== productId) });
          useToastStore.getState().addToast('Tanlanganlardan o\'chirildi', 'info');
        } else {
          set({ productIds: [...current, productId] });
          useToastStore.getState().addToast('Tanlanganlarga qo\'shildi', 'success');
        }
      },
      isFavorite: (productId) => get().productIds.includes(productId),
    }),
    {
      name: 'comfort_txt_favorites',
    }
  )
);
