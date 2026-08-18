import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../auth-store";
import { register } from "../api/register";
import { LoginResponse } from "../types/LoginResponse";
import { ApiResponse } from "@/types/ApiResponse";

export default function useRegister() {
    return useMutation({
        mutationFn: register,
        onSuccess: (response: ApiResponse<LoginResponse>) => {
            useAuthStore.getState().login(response.data.accessToken);
        }
    })
}