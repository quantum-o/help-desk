import { create } from "zustand";

type AuthStoreState = {
    accessToken: string;
}

type AuthStoreActions = {
    login: (accessToken: string) => void;
    logout: () => void;
}

type AuthStore = AuthStoreState & AuthStoreActions;

const useAuthStore = create<AuthStore>((set) => ({
    accessToken: '',
    login: (accessToken: string) => set({ accessToken }),
    logout: () => set({ accessToken: '' }),
}));

export default useAuthStore;
