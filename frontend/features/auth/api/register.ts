import axiosClient from "@/lib/apiClient";
import RegisterRequest from "../types/RegisterRequest";
import { LoginResponse } from "../types/LoginResponse";
import { ApiResponse } from "@/types/ApiResponse";

export async function register(data: RegisterRequest) {
    if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const response = await axiosClient.post("/auth/register", {
        email: data.email,
        password: data.password,
    });
    return response.data as ApiResponse<LoginResponse>;
}