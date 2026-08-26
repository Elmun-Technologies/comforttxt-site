import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { validateQuantity, calculateCartTotal } from '@/lib/calc';

export interface CartItem {
  variantId: string;
  productId: string;
  productTitle: string;
  sku: string;
  variantName: string;
  image: string;
  price: number;
  wholesalePrice: number;
  unitType: string; // meter, sheet, pcs, kg, pack
  minQtyStep: number;
  /** True minimum order quantity for this variant (may exceed minQtyStep). */
  minQuantity?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: (isB2B?: boolean) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = get().items;
        const existingIndex = items.findIndex((i) => i.variantId === newItem.variantId);
        // Default to minQtyStep if quantity is not provided or invalid
        const qtyToAdd = Math.max(
          validateQuantity(newItem.quantity ?? newItem.minQtyStep, newItem.unitType, newItem.minQtyStep),
          newItem.minQuantity || 0
        );

        if (existingIndex > -1) {
          const updatedItems = [...items];
          // Add to existing quantity, then validate again
          updatedItems[existingIndex].quantity = Math.max(
            validateQuantity(
              updatedItems[existingIndex].quantity + qtyToAdd,
              updatedItems[existingIndex].unitType,
              updatedItems[existingIndex].minQtyStep
            ),
            updatedItems[existingIndex].minQuantity || 0
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { ...newItem, quantity: qtyToAdd }] });
        }
      },
      removeItem: (variantId) => {
        set({ items: get().items.filter((i) => i.variantId !== variantId) });
      },
      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set({
          items: get().items.map((i) => {
            if (i.variantId === variantId) {
              return {
                ...i,
                // The true minimum order (minQuantity) can exceed the step
                // granularity (minQtyStep) — never let the cart's own -/+
                // controls decrement below it.
                quantity: Math.max(
                  validateQuantity(quantity, i.unitType, i.minQtyStep),
                  i.minQuantity || 0
                ),
              };
            }
            return i;
          }),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.length;
      },
      getSubtotal: (isB2B = false) => {
        return calculateCartTotal(get().items, isB2B);
      },
    }),
    {
      name: 'comfort_txt_cart',
    }
  )
);
