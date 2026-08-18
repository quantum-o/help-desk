import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { RoleResponse } from "../types/RoleResponse";

export async function getRole(id: number) {
    const response = await axiosClient.get(`/role/${id}`);
    return response.data as ApiResponse<RoleResponse>;
}