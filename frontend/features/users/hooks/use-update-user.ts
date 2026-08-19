import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { ApiResponse } from "@/types/ApiResponse";
import { updateUser } from "../api/update-user";
import { User } from "@/types/User";

export default function useUpdateUser() {
    return useMutation({
        mutationFn: updateUser,
        onSuccess: (response: ApiResponse<User>) => {
            queryClient.setQueryData(
                ["users", response.data.id],
                (oldData: User) => {
                    if (!oldData) return oldData;
                }
            );
        }
    })
}