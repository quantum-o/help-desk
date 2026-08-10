import { useMutation } from "@tanstack/react-query";
import { CreateNewTicketResponse } from "../types/CreateNewTicketResponse";
import { create } from "../api/create";
import { queryClient } from "@/app/providers";
import { ApiResponse } from "@/types/ApiResponse";

export default function useCreateTicket() {
    return useMutation({
        mutationFn: create,
        onSuccess: (response: ApiResponse<CreateNewTicketResponse>) => {
            queryClient.setQueryData(["my-tickets"], (oldData: any) => {
                if (!oldData) return { data: [response.data] };
                return {
                    ...oldData,
                    data: [...oldData.data, response.data],
                };
            });
        }
    })
}