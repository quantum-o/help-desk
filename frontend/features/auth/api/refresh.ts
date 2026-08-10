import axiosClient from "@/lib/apiClient";
import { LoginResponse } from "../types/LoginResponse";
import { ApiResponse } from "@/types/ApiResponse";

export async function refresh() {
    const response = await axiosClient.post("/auth/refresh");

    return response.data as ApiResponse<LoginResponse>;
}