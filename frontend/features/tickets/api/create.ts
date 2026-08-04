import axiosClient from "@/lib/apiClient";
import { CreateNewTicketType } from "../types/CreateNewTicket";

export async function create(data: CreateNewTicketType) {
    const response = await axiosClient.post("/tickets/create", data);
    return response.data;
}