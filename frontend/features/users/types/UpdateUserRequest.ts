import z from "zod";

const UpdateUserRequest = z.object({
    username: z.string("Username cannot be empty")
        .min(2, "Username must be at least 2 characters")
        .max(25, "Username cannot exceed 25 characters"),
    roles: z.array(z.uuid("Invalid role ID")),
    active: z.boolean("Active status cannot be empty"),
});

type UpdateUserRequest = z.infer<typeof UpdateUserRequest>;

export default UpdateUserRequest;
export type { UpdateUserRequest };