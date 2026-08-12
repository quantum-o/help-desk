import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { deleteCategory } from "../api/delete-category";

export default function useDeleteCategory() {
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        }
    })
}