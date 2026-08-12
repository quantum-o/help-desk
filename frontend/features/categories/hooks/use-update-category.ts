import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { updateCategory } from "../api/update-category";

export default function useUpdateCategory() {
    return useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        }
    })
}