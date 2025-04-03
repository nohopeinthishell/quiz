import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthStateI  {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthLoading: boolean;
    setIsAuthLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStateI>((set) => ({
    user: null,
    isAuthLoading: true,
    setUser: (user) => set({ user }),
    setIsAuthLoading: (loading) => set({ isAuthLoading: loading }),
}));
