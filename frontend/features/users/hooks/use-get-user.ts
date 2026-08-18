import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/get-user";

export default function useGetUser(id: string) {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUser(id),
        staleTime: 5 * 60 * 1000,
    });
}