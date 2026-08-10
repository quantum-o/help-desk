import axiosClient from "@/lib/apiClient";
import { SendMessageType } from "../types/SendMessage";

export async function closeTicket(ticketId: string) {
    const response = await axiosClient.patch(`/tickets/${ticketId}`, { 
        status: 'CLOSED'
     });
    return response.data;
}