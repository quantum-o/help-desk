import { useMutation } from "@tanstack/react-query";
import { CreateNewTicketResponse } from "../types/CreateNewTicketResponse";
import { create } from "../api/create";
import { queryClient } from "@/app/providers";

export default function useCreateTicket() {
    return useMutation({
        mutationFn: create,
        onSuccess: (data: CreateNewTicketResponse) => {
            queryClient.setQueryData(["my-tickets"], (oldData: any) => {
                if (!oldData) {
                    return {
                        data: [data],
                        message: "Successfully fetched my tickets",
                        status: "success"
                    }
                }
            });
        }
    })
}