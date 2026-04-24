import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Try to load user from localStorage
  const savedUser = localStorage.getItem('cbt_user');
  const initialUser = savedUser ? JSON.parse(savedUser) : null;

  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    isLoading: false,
    setUser: (user) => {
      if (user) {
        localStorage.setItem('cbt_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('cbt_user');
      }
      set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false 
      });
    },
    setLoading: (loading) => set({ isLoading: loading }),
  };
});
