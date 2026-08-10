import axiosClient from "@/lib/apiClient";
import LoginRequest from "../types/LoginRequest";

export async function login(data: LoginRequest) {
    const response = await axiosClient.post("/auth/login", data, {
        withCredentials: false,
    });
    return response.data;
}