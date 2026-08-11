import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { CategoryResponse } from "../types/CategoryResponse";
import { deleteCategory } from "../api/delete-category";

export default function useDeleteCategory() {
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: (response: void, variables: { categoryId: number }) => {
            queryClient.setQueryData(["categories"], (oldData: any) => {
                if (!oldData) {
                    return response;
                }

                return {
                    ...oldData,
                    data: oldData.data.filter((category: CategoryResponse) => category.id !== variables.categoryId),
                };
            });
        }
    })
}