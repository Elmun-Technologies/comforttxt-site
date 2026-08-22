import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'customer' | 'wholesale_customer' | 'admin' | 'manager';
  companyName?: string;
  b2bApproved: boolean;
}

interface AuthState {
  user: UserSession | null;
  login: (user: UserSession) => void;
  logout: () => void;
  isB2B: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      isB2B: () => {
        const u = get().user;
        return !!(u && (u.role === 'wholesale_customer' || u.role === 'admin') && u.b2bApproved);
      },
    }),
    {
      name: 'comfort_txt_auth',
    }
  )
);
