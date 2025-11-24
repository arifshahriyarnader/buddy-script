import { z } from "zod";
export const updateCommentValidation = z.object({
  text: z.string().min(1),
});
