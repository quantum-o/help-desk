import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { CategoryResponse } from "../types/CategoryResponse";

export async function addCategory(categoryData: { name: string; parent?: number | null }) {
    const response = await axiosClient.post("/categories", categoryData);
    return response.data as ApiResponse<CategoryResponse>;
}