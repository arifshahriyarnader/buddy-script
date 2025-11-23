import { z } from "zod";

export const createPostValidation = z.object({
  text: z.string().min(1, "Text is required"),
  images: z.array(z.string().url()).optional(),
  visibility: z.enum(["public", "private"]).default("public"),
});
