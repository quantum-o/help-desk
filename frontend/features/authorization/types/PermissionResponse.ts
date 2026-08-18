import { UUID } from "crypto";

export type PermissionResponse = {
    id: UUID;
    code: string;
    description: string;
    category: string;
}