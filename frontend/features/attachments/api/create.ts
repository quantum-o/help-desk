import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { AttachmentResponse } from "../types/AttachmentResponse";

export async function addAttachment(attachmentData: { file: File; }) {
    const formData = new FormData();
    formData.append("attachments", attachmentData.file);

    const response = await axiosClient.post("/attachments", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data as ApiResponse<AttachmentResponse[]>;
}