import { Permission } from "@/features/authorization/types/Permission";
import { UUID } from "crypto";

export type User = {
    id: number;
    username: string;
    email: string;
    role: UUID[];
    permissions: Permission[];
    createdAt: string;
    updatedAt: string;
};