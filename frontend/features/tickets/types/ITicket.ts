import { TicketCategory, TicketPriority, TicketStatus } from "./enums";

export interface ITicket {
    id: string;
    title: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    status: TicketStatus;
    createdAt: string;
    updatedAt: string;
}