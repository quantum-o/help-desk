import axiosClient from "@/lib/apiClient";
import { UUID } from "crypto";
import { UpdateUserRequest } from "../types/UpdateUserRequest";

export async function updateUser({ userId, data }: { userId: UUID; data: UpdateUserRequest }) {
    const response = await axiosClient.patch(`/users/${userId}`, data);
    return response.data;
}