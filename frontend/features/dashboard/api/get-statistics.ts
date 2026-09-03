import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { DashboardResponse } from "../types/DashboardResponse";
import { DashboardRequest } from "../types/DashboardRequest";

export async function getDashboardStatistics(data: DashboardRequest) {
    const response = await axiosClient.post("/dashboard", data);
    return response.data as ApiResponse<DashboardResponse>;
}