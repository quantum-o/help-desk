import { TicketPriority, TicketStatus } from "./enums";

export interface ITicket {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: TicketPriority;
    status: TicketStatus;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}