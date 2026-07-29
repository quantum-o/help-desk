import axiosClient from "@/lib/apiClient";
import { LoginResponse } from "../types/LoginResponse";

export async function refresh() {
    const response = await axiosClient.post("/auth/refresh");

    return response.data as LoginResponse;
}