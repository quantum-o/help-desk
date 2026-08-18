import axiosClient from "@/lib/apiClient";
import { UpdateRoleType } from "../types/UpdateRole";

export async function updateRole({id, code, name, permissions}: UpdateRoleType) {
    const response = await axiosClient.patch(`/roles/${id}`, { code, name, permissions });
    return response.data;
}