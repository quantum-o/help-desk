import { UUID } from "crypto";

export type Role = {
    id: UUID;
    code: string;
    name: string;
    permissionList: string[];
}