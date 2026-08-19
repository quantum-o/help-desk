import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { updateUser } from "../api/update-user";

export default function useUpdateUser() {
    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })
}