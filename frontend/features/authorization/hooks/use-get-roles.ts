import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api/get-roles";

export default function useGetRoles() {
    return useQuery({
        queryKey: ["roles"],
        queryFn: () => getRoles(),
        staleTime: 5 * 60 * 1000,
    });
}