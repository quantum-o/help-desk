import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { my } from "../api/my";
import useAuthStore from "@/features/authentication/auth-store";
import { getTickets } from "../api/get-tickets";
import { PermissionCode } from "@/types/PermissionCode";

export default function useGetTickets(pagination: { pageIndex: number; pageSize: number }) {
    const isAdmin = useAuthStore((state) => state.hasPermission(PermissionCode.TICKET_READ));
    return useQuery({
        queryKey: ["tickets", isAdmin ? "all" : "my", pagination],
        queryFn: () => isAdmin ? getTickets(pagination.pageIndex, pagination.pageSize) : my(pagination.pageIndex, pagination.pageSize),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
}