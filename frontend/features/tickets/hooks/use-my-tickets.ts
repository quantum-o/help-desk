import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { my } from "../api/my";
import { TicketTableFilter } from "@/types/TicketTableFilter";

export default function useMyTickets(searchParams: TicketTableFilter) {
    return useQuery({
        queryKey: ['tickets', 'my', searchParams],
        queryFn: () => my(searchParams),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
}