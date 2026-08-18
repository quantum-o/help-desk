import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { PermissionResponse } from "../types/PermissionResponse";

export async function getPermissions() {
    const response = await axiosClient.get("/permissions");
    return response.data as ApiResponse<PermissionResponse[]>;
}