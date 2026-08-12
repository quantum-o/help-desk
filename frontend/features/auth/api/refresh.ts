import { AxiosInstance } from "axios";
import { LoginResponse } from "../types/LoginResponse";
import { ApiResponse } from "@/types/ApiResponse";

export async function refresh(axiosInstance: AxiosInstance) {
    const response = await axiosInstance.post("/auth/refresh");

    return response.data as ApiResponse<LoginResponse>;
}