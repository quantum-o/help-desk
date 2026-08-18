import z from "zod";

const LoginRequest = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginRequest = z.infer<typeof LoginRequest>;

export default LoginRequest;