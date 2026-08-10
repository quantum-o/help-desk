import { InfiniteData, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { SendMessageType } from "../types/SendMessage";
import { sendMessage } from "../api/send-message";
import { TicketMessagesResponse } from "../types/TicketMessagesResponse";
import { ApiResponse } from "@/types/ApiResponse";

export default function useSendMessage() {
    return useMutation({
        mutationFn: sendMessage,
        onSuccess: (response: ApiResponse<TicketMessagesResponse>, variables: SendMessageType) => {
            queryClient.setQueryData(
                ["ticket-messages", variables.ticketId],
                (oldData: InfiniteData<TicketMessagesResponse[]>) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page: any, index: number) =>
                            index === oldData.pages.length - 1
                                ? {
                                    ...page,
                                    data: [response.data, ...page.data],
                                }
                                : page
                        ),
                    };
                }
            );
        }
    })
}