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
}

type AuthStore = AuthStoreState & AuthStoreActions;

const useAuthStore = create<AuthStore>((set) => ({
    accessToken: '',
    user: null,
    login: (accessToken: string) => set({ accessToken }),
    logout: () => set({ accessToken: '', user: null }),
    setUser: (user: User | null) => set({ user })
}));

export default useAuthStore;
