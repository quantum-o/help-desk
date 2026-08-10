import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { ITicket } from "../types/ITicket";
import { PageResponse } from "@/types/PageResponse";

export async function getTickets(page = 0, size = 20) {
    const response = await axiosClient.get("/tickets", {
        params: {
            page,
            size
        }
    });
    return response.data as ApiResponse<PageResponse<ITicket>>;
}