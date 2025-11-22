import { z } from "zod";

export const loginValidation = z
  .object({
    type: z.enum(["email", "refresh"]),
    email: z.string().email("Invalid email").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    refreshToken: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "email") {
        return data.email && data.password;
      }
      return true;
    },
    {
      message: "Email and password are required for email login",
      path: ["email"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "refresh") {
        return data.refreshToken;
      }
      return true;
    },
    {
      message: "Refresh token is required for refresh login",
      path: ["refreshToken"],
    }
  );
