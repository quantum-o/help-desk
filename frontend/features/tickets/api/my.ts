import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { ITicket } from "../types/ITicket";

export async function my() {
    const response = await axiosClient.get("/tickets/my");
    return response.data as ApiResponse<Array<ITicket>>;
}