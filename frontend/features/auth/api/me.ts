import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";

export async function me() {
    const response = await axiosClient.get("/users/me");
    return response.data as ApiResponse<string>;
}