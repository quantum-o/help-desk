import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import useAuthStore from "../auth-store";
import { LoginResponse } from "../types/LoginResponse";
import { ApiResponse } from "@/types/ApiResponse";

export default function useLogin() {
    return useMutation({
        mutationFn: login,
        onSuccess: (response: ApiResponse<LoginResponse>) => {
            useAuthStore.getState().login(response.data.accessToken);
        }
    })
}