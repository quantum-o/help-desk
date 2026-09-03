import z from "zod";

const CreateUserRequest = z.object({
    username: z.string("Username cannot be empty")
        .min(2, "Username must be at least 2 characters")
        .max(25, "Username cannot exceed 25 characters"),
    email: z.email("Invalid email address"),
    password: z.string("Password cannot be empty")
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password cannot exceed 50 characters"),
    roles: z.array(z.uuid("Invalid role ID")),
    active: z.boolean("Active status cannot be empty").default(true),
});

type CreateUserRequest = z.infer<typeof CreateUserRequest>;

export default CreateUserRequest;
export type { CreateUserRequest };