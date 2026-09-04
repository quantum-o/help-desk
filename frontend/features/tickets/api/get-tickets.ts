import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { ITicket } from "../types/ITicket";
import { PageResponse } from "@/types/PageResponse";
import { TicketTableFilter } from "@/types/TicketTableFilter";
import qs from "qs";

export async function getTickets(searchParams: TicketTableFilter) {
    const response = await axiosClient.get("/tickets", {
        params: searchParams,
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return response.data as ApiResponse<PageResponse<ITicket>>;
}