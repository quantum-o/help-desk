import { PermissionCode } from "@/types/PermissionCode";
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
    hasPermission: (permissionCode: PermissionCode) => boolean;
}

type AuthStore = AuthStoreState & AuthStoreActions;

const useAuthStore = create<AuthStore>((set, get) => ({
    accessToken: '',
    user: null,
    login: (accessToken: string) => set({ accessToken }),
    logout: () => set({ accessToken: '', user: null }),
    setUser: (user: User | null) => set({ user }),
    hasPermission: (permissionCode: PermissionCode) => {
        const user = get().user;
        if (!user) return false;

        if (user.permissions.includes(PermissionCode[PermissionCode.ADMINISTRATOR]))
            return true;

        return user.permissions.some(permission => {
            return permission === PermissionCode[permissionCode];
        });
    }
}));

export default useAuthStore;
