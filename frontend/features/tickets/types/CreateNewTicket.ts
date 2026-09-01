import z from "zod";
import { TicketPriority } from "./enums";

const CreateNewTicket = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(30, { message: 'Description should be at least 30 characters long' }),
    category: z.number().int().min(0, { message: 'Category is required' }),
    priority: z.enum(TicketPriority, { message: 'Invalid priority' }),
    attachments: z.array(z.string()).optional(),
});

export type CreateNewTicketType = z.infer<typeof CreateNewTicket>;

export default CreateNewTicket;