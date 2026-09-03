import axiosClient from "@/lib/apiClient";
import CreateUserRequest from "../types/CreateUserRequest";

export async function createuser({ data }: { data: CreateUserRequest }) {
    const response = await axiosClient.post(`/users`, data);
    return response.data;
}