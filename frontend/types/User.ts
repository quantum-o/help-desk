export type User = {
    id: string;
    email: string;
    role: "ADMIN" | "AGENT" | "CUSTOMER";
}