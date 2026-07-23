import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import useAuthStore from "../auth-store";
import { ApiResponse } from "@/types/ApiResponse";

export default function useLogin() {
    return useMutation({
        mutationFn: login,
        onSuccess: (data: ApiResponse<{ accessToken: string }>) => {
            useAuthStore.getState().login(data.data.accessToken);
        }
    })
}