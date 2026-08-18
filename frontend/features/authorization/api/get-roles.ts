import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { Role } from "../types/Role";

export async function getRoles() {
    const response = await axiosClient.get("/roles");
    return response.data as ApiResponse<Role[]>;
}