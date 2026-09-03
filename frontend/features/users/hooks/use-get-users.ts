import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/get-users";
import { UserTableFilter } from "@/types/UsersTableFilter";

export default function useGetUsers(searchParamRecords: UserTableFilter) {
    return useQuery({
        queryKey: ["users", searchParamRecords],
        queryFn: () => getUsers(searchParamRecords),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
}