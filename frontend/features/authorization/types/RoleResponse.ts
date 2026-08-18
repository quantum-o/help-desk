import { UUID } from "crypto";

export type RoleResponse = {
    id: UUID;
    code: string;
    name: string;
    permissionList: string[];
}