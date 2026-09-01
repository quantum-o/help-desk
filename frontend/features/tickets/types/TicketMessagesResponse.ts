import { AttachmentResponse } from "@/features/attachments/types/AttachmentResponse"

export type TicketMessagesResponse = {
    id: string,
    senderId: string,
    senderEmail: string,
    message: string,
    attachments: AttachmentResponse[],
    createdAt: string
}