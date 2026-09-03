import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { ApiResponse } from "@/types/ApiResponse";
import { createuser } from "../api/create-user";
import { User } from "@/types/User";

export default function useCreateUser() {
    return useMutation({
        mutationFn: createuser,
        onSuccess: (response: ApiResponse<User>) => {
            queryClient.setQueryData(["users"], (oldData: any) => {
                if (!oldData) return { data: [response.data] };
                return {
                    ...oldData,
                    data: [...oldData.data, response.data],
                };
            });
        }
    })
}