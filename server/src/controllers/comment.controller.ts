import { Request, Response } from "express";
import {
  createCommentValidation,
  updateCommentValidation,
} from "../validations";
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

export const getCommentsController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const commentsWithReplies = await commentServices.getCommentsService(
      postId
    );
    return res.status(200).json({
      message: "Comments and Replies fetched successfully",
      commentsWithReplies,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateCommentController = async (
  req: Request<{ commentId: string }, {}, any>,
  res: Response
) => {
  try {
    const { commentId } = req.params;
    const parsed = updateCommentValidation.parse(req.body);
    const userId = req.user?._id as string;

    const updated = await commentServices.updateCommentService({
      commentId,
      userId,
      text: parsed.text,
    });

    return res.json({
      message: "Comment updated successfully",
      updated,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteCommentController = async (
  req: Request<{ commentId: string }>,
  res: Response
) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?._id.toString();
    await commentServices.deleteCommentService(commentId, userId!);
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
