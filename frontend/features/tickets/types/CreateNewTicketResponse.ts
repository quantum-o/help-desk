import { TicketPriority, TicketStatus } from "./enums"

export type CreateNewTicketResponse = {
    id: string,
    title: string,
    description: string,
    status: TicketStatus,
    priority: TicketPriority
}