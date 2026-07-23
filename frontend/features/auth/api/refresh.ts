import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";

export async function refresh() {
    const response = await axiosClient.post("/auth/refresh");
    return response.data as ApiResponse<{ accessToken: string }>;
}