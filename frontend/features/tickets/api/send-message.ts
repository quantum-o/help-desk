import axiosClient from "@/lib/apiClient";
import { SendMessageType } from "../types/SendMessage";

export async function sendMessage(data: SendMessageType) {
    const response = await axiosClient.post(`/tickets/${data.ticketId}/messages`, { message: data.message });
    return response.data;
}