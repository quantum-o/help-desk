import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import useAuthStore from "../auth-store";
import { LoginResponse } from "../types/LoginResponse";

export default function useLogin() {
    return useMutation({
        mutationFn: login,
        onSuccess: (data: LoginResponse) => {
            useAuthStore.getState().login(data.data.accessToken);
        }
    })
}