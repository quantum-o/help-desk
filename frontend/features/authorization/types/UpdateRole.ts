import { UUID } from "crypto";

export type UpdateRoleType = {
    id: UUID;
    code?: string;
    name?: string;
    permissions?: string[];
};