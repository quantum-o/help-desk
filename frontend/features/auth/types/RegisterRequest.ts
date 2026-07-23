import z from "zod";

const RegisterRequest = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
});

type RegisterRequest = z.infer<typeof RegisterRequest>;

export default RegisterRequest;