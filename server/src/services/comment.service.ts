import { Comment } from "../models";
import { Types } from "mongoose";
import { CreateCommentInput } from "../types";

export const createCommentService = async (data: CreateCommentInput) => {
  const newComment = await Comment.create({
    postId: new Types.ObjectId(data.postId),
    author: new Types.ObjectId(data.author),
    text: data.text,
    parentId: data.parentId ? new Types.ObjectId(data.parentId) : null,
  });
  return newComment;
};

export const getCommentsService = async (postId: string) => {
  const commentsWithReplies = await Comment.find({ postId })
    .populate("author", "firstname lastname email")
    .sort({ createdAt: 1 });
  return commentsWithReplies;
};
