import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../auth-store";
import { ApiResponse } from "@/types/ApiResponse";
import { register } from "../api/register";

export default function useRegister() {
    return useMutation({
        mutationFn: register,
        onSuccess: (data: ApiResponse<{ accessToken: string }>) => {
            useAuthStore.getState().login(data.data.accessToken);
        }
    })
}