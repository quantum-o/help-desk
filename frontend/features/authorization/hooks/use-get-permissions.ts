import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../api/get-permissions";

export default function useGetPermissions() {
    return useQuery({
        queryKey: ["permissions"],
        queryFn: () => getPermissions(),
        staleTime: 15 * 60 * 1000,
    });
}