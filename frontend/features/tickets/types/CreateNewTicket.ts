import z from "zod";
import { TicketCategory, TicketPriority } from "./enums";

const CreateNewTicket = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(30, { message: 'Description should be at least 30 characters long' }),
    category: z.enum(Object.keys(TicketCategory), { message: 'Invalid category' }),
    priority: z.enum(Object.keys(TicketPriority), { message: 'Invalid priority' }),
});

export type CreateNewTicketType = z.infer<typeof CreateNewTicket>;

export default CreateNewTicket;