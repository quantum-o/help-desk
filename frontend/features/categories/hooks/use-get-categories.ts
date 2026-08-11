import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/get-categories";

export default function useGetCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
        staleTime: 5 * 60 * 1000,
    });
}