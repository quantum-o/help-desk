import { UUID } from "crypto";

export type Permission = {
    id: UUID;
    code: string;
    description: string;
    category: string;
}