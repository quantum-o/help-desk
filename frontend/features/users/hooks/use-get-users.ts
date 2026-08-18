import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/get-users";

export default function useGetUsers(pagination: { pageIndex: number; pageSize: number }) {
    return useQuery({
        queryKey: ["users", pagination],
        queryFn: () => getUsers(pagination.pageIndex, pagination.pageSize),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
}