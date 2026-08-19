import axiosClient from "@/lib/apiClient";
import { UUID } from "crypto";

export async function deleteUser(userId: UUID) {
    const response = await axiosClient.delete(`/users/${userId}`);
    return response.data;
}