import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { addAttachment } from "../api/create";

export default function useAddAttachment() {
    return useMutation({
        mutationFn: addAttachment,
        onSuccess: () => {
            // queryClient.invalidateQueries({
            //     queryKey: ["attachments"],
            // });
        }
    })
}