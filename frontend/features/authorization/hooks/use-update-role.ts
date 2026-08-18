import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { updateRole } from "../api/update-role";

export default function useUpdateRole() {
    return useMutation({
        mutationFn: updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });
        }
    })
}