import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { deleteUser } from "../api/delete-user";

export default function useDeleteUser() {
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })
}