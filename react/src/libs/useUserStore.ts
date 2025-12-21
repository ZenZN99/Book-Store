import { create } from "zustand";
import type { UserStore } from "../types/user";
import { me } from "../api/user/request";
import toast from "react-hot-toast";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loadUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const data = await me(token);
      if (data) set({ user: data });
    } catch (err) {
      console.error(err);
      toast.error("فشل جلب بيانات المستخدم");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
