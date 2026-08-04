import { useQuery } from "@tanstack/react-query";
import { my } from "../api/my";
import { getTicket } from "../api/get-ticket";

export default function useGetTicket(id: string) {
    return useQuery({
        queryKey: ["ticket", id],
        queryFn: () => getTicket(id),
        staleTime: 5 * 60 * 1000,
    });
}