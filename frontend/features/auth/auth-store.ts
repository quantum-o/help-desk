import { create } from "zustand";

type AuthStoreState = {
    isAuthenticated: boolean;
    accessToken: string;
}

type AuthStoreActions = {
    login: (accessToken: string) => void;
    logout: () => void;
}

type AuthStore = AuthStoreState & AuthStoreActions;

const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    accessToken: '',
    user: {
        id: '',
        email: '',
        role: '',
    },
    login: (accessToken: string) => set({ isAuthenticated: true, accessToken }),
    logout: () => set({ isAuthenticated: false, accessToken: '' }),
}));

export default useAuthStore;
