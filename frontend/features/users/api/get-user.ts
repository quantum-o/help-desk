import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";

export async function getUser(id: string) {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data as ApiResponse<User>;
}