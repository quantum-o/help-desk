import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";

export async function me() {
    const response = await axiosClient.get("/users/me");
    return response.data as ApiResponse<User>;
}