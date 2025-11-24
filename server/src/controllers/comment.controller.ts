import { Request, Response } from "express";
import { createCommentValidation } from "../validations";
import { commentServices } from "../services";

export const createCommentController = async (
  req: Request<{}, {}, { postId: string; text: string; parentId?: string }>,
  res: Response
) => {
  try {
    const parsed = createCommentValidation.parse(req.body);
    const authorId = req.user?._id;
    if (!authorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const comment = await commentServices.createCommentService({
      postId: parsed.postId,
      author: authorId,
      text: parsed.text,
      parentId: parsed.parentId,
    });
    return res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
