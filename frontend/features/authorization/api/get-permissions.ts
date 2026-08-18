import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { Permission } from "../types/Permission";

export async function getPermissions() {
    const response = await axiosClient.get("/permissions");
    return response.data as ApiResponse<Permission[]>;
}