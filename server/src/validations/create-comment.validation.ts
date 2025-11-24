import { z } from "zod";
export const createCommentValidation = z.object({
  postId: z.string().min(1),
  text: z.string().min(1, "Comment cannot be empty"),
  parentId: z.string().optional(),
});
