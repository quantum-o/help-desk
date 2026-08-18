import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { RoleResponse } from "../types/RoleResponse";

export async function getRoles() {
    const response = await axiosClient.get("/roles");
    return response.data as ApiResponse<RoleResponse[]>;
}