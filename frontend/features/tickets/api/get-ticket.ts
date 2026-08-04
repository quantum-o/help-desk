import axiosClient from "@/lib/apiClient";
import { ITicket } from "../types/ITicket";
import { ApiResponse } from "@/types/ApiResponse";

export async function getTicket(id: string) {
    const response = await axiosClient.get(`/tickets/${id}`);
    return response.data as ApiResponse<ITicket>;
}