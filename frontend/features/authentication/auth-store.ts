import { User } from "@/types/User";
import { create } from "zustand";

type AuthStoreState = {
    accessToken: string;
    user: User | null;
}

type AuthStoreActions = {
    login: (accessToken: string) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
    isAdmin: () => boolean;
}

type AuthStore = AuthStoreState & AuthStoreActions;

const useAuthStore = create<AuthStore>((set, get) => ({
    accessToken: '',
    user: null,
    login: (accessToken: string) => set({ accessToken }),
    logout: () => set({ accessToken: '', user: null }),
    setUser: (user: User | null) => set({ user }),
    isAdmin: () => {
        const user = get().user;
        if (!user) return false;
        return user.role === "ADMIN";
    }
}));

export default useAuthStore;
