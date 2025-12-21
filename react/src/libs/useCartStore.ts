import { create } from "zustand";
import toast from "react-hot-toast";
import {
  getCartUser,
  deleteItemCart,
  updateQuantity,
} from "../api/cart/request";
import { addedToCart } from "../api/cart/request";
import type { CartStore, ICart } from "../types/cart";

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async (token) => {
    try {
      set({ loading: true });
      const cart: ICart = await getCartUser(token);
      set({ items: cart?.items || [] });
    } catch (err) {
      console.error(err);
      toast.error("فشل تحميل السلة");
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (bookId: string, token: string) => {
    try {
      await addedToCart(bookId, token);
      await get().fetchCart(token);
      toast.success("تمت إضافة الكتاب إلى السلة");
    } catch (err) {
      console.error(err);
      toast.error("فشل إضافة الكتاب");
    }
  },

  removeItem: async (bookId, token) => {
    try {
      await deleteItemCart(bookId, token);
      set((state) => ({
        items: state.items.filter((i) => i.bookId !== bookId),
      }));
      toast.success("تم حذف الكتاب من السلة");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف الكتاب");
    }
  },

  changeQuantity: async (bookId, quantity, token) => {
    if (quantity < 1) return;

    try {
      await updateQuantity(bookId, quantity, token);
      set((state) => ({
        items: state.items.map((item) =>
          item.bookId === bookId ? { ...item, quantity } : item
        ),
      }));
    } catch (err) {
      console.error(err);
      toast.error("فشل تحديث الكمية");
    }
  },
}));
