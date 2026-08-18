import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { PageResponse } from "@/types/PageResponse";
import { User } from "@/types/User";

export async function getUsers(page = 0, size = 20) {
    const response = await axiosClient.get("/users", {
        params: {
            page,
            size
        }
    });
    return response.data as ApiResponse<PageResponse<User>>;
}