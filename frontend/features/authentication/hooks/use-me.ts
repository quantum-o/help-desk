import { useQuery } from "@tanstack/react-query";
import { me } from "../api/me";

export default function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: me,
        staleTime: 5 * 60 * 1000,
    });
}