import { useInfiniteQuery } from "@tanstack/react-query";
import { getTicketMessages } from "../api/get-ticket-messages";

export default function useGetTicketMessages(
    id: string,
) {
    return useInfiniteQuery({
        queryKey: ["ticket-messages", id],
        initialPageParam: null as string | null,

        queryFn: async ({ pageParam }) => {
            const res = await getTicketMessages(id, pageParam);
            return res.data;
        },

        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore
                ? lastPage.pagination.nextCursor
                : undefined;
        },

    });
}