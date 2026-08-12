import axiosClient from "@/lib/apiClient";

export async function closeTicket(ticketId: string) {
    const response = await axiosClient.patch(`/tickets/${ticketId}`, { 
        status: 'CLOSED'
     });
    return response.data;
}