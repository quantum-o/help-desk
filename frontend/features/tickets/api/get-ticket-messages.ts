import axiosClient from "@/lib/apiClient";
import { TicketMessagesResponse } from "../types/TicketMessagesResponse";
import { CursorResponse } from "@/types/CursorResponse";
import { ApiResponse } from "@/types/ApiResponse";

export async function getTicketMessages(id: string, cursor: string | null = null, size: number = 20) {
    const response = await axiosClient.get(`/tickets/${id}/messages`, {
        params: {
            cursor,
            size
        }
    });
    return response.data as ApiResponse<CursorResponse<TicketMessagesResponse[]>>;
}