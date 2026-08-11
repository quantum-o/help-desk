import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { ApiResponse } from "@/types/ApiResponse";
import { CategoryResponse } from "../types/CategoryResponse";
import { addCategory } from "../api/add-category";

export default function useAddCategory() {
    return useMutation({
        mutationFn: addCategory,
        onSuccess: (response: ApiResponse<CategoryResponse>) => {
            queryClient.setQueryData(["categories"], (oldData: any) => {
                if (!oldData) {
                    return response;
                }

                return {
                    ...oldData,
                    data: [...oldData.data, response.data],
                };
            });
        }
    })
}