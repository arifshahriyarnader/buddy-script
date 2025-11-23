import { z } from "zod";

export const updatePostValidation = z.object({
  text: z.string().min(1).optional(),
  images: z.array(z.string().url()).optional(),
  visibility: z.enum(["public", "private"]).optional(),
});
