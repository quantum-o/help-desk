import { useQuery } from "@tanstack/react-query";
import { my } from "../api/my";

export default function useMyTickets() {
    return useQuery({
        queryKey: ["my-tickets"],
        queryFn: my,
        staleTime: 5 * 60 * 1000,
    });
}