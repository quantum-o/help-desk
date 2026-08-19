import z from "zod";

const updateUserRequestSchema = z.object({
    username: z.string().optional(),
    roles: z.set(z.string()).optional(),
    active: z.boolean().optional(),
});

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;