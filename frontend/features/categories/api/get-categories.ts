import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { CategoryResponse } from "../types/CategoryResponse";

export async function getCategories() {
    const response = await axiosClient.get("/categories");
    return response.data as ApiResponse<CategoryResponse[]>;
}