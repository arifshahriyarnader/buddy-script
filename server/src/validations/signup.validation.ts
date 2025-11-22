import { z } from "zod";

export const signupValidation = z.object({
  firstname: z.string().min(4, "First name must be at least 4 characters long"),
  lastname: z.string().min(4, "Last name must be at least 4 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
