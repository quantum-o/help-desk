import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { updateRole } from "../api/update-role";
import { ApiResponse } from "@/types/ApiResponse";
import { Role } from "../types/Role";

export default function useUpdateRole() {
    return useMutation({
        mutationFn: updateRole,
        onSuccess: (response: ApiResponse<Role>) => {
            queryClient.setQueryData(["roles"], (oldData: any) => {
                if (response.success) {
                    oldData.data = oldData.data.map((role: Role) => {
                        if (role.id === response.data.id) {
                            return response.data;
                        }
                        return role;
                    });
                }
            });
        }
    })
}