import axiosClient from "@/lib/apiClient";
import { UpdateRoleType } from "../types/UpdateRole";
import { Role } from "../types/Role";
import { ApiResponse } from "@/types/ApiResponse";

export async function updateRole({id, code, name, permissions}: UpdateRoleType) {
    const response = await axiosClient.patch(`/roles/${id}`, { code, name, permissions });
    return response.data as ApiResponse<Role>;
}