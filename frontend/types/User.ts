import { UUID } from "crypto";

export type User = {
    id: UUID;
    username: string;
    email: string;
    roles: UUID[];
    permissions: string[]; // comes on /me response, but not on /users/:id response
    active: boolean;
    createdAt: string;
    updatedAt: string;
};