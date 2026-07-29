import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../auth-store";
import { register } from "../api/register";
import { LoginResponse } from "../types/LoginResponse";

export default function useRegister() {
    return useMutation({
        mutationFn: register,
        onSuccess: (data: LoginResponse) => {
            useAuthStore.getState().login(data.data.accessToken);
        }
    })
}