import { ApiResponse } from "@/types/ApiResponse";

export type LoginResponse = ApiResponse<{
    accessToken: string;
}>;