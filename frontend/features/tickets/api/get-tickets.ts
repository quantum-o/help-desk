import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { ITicket } from "../types/ITicket";
import { PageResponse } from "@/types/PageResponse";
import { TicketTableFilter } from "@/types/TicketTableFilter";

export async function getTickets(searchParams: TicketTableFilter) {
    const response = await axiosClient.get("/tickets", {
        params: searchParams
    });
    return response.data as ApiResponse<PageResponse<ITicket>>;
}