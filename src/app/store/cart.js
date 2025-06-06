'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(persist(
  (set, get) => ({
    items: [],
    addToCart: (item) => {
      const existing = get().items.find((i) => i.id === item.id);
      if (!existing) {
        set((state) => ({ items: [...state.items, item] }));
      }
    },
    removeFromCart: (id) => {
      set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      }));
    },
    clearCart: () => set({ items: [] }),
  }),
  {
    name: 'cart-storage', 
  }
));
