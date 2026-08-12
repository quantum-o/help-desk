import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { addCategory } from "../api/add-category";

export default function useAddCategory() {
    return useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        }
    })
}