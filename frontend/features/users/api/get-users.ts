import axiosClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { PageResponse } from "@/types/PageResponse";
import { User } from "@/types/User";
import { UserTableFilter } from "@/types/UsersTableFilter";

export async function getUsers(searchParamRecords: UserTableFilter) {
    const response = await axiosClient.get("/users", {
        params: searchParamRecords,
    });
    return response.data as ApiResponse<PageResponse<User>>;
}