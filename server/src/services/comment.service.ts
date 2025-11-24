import { Comment, Post } from "../models";
import { Types } from "mongoose";
import { CreateCommentInput, UpdateCommentInput } from "../types";

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

export const updateCommentService = async (data: UpdateCommentInput) => {
  const comment = await Comment.findById(data.commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  if (comment.author.toString() !== data.userId) {
    throw new Error("Unauthorized: You cannot update this comment");
  }
  comment.text = data.text;
  await comment.save();
  return comment;
};

export const deleteCommentService = async (
  commentId: string,
  userId: string
) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  const post = await Post.findById(comment.postId);
  if (!post) {
    throw new Error("Post not found");
  }
  const isCommentAuthor = comment.author.toString() === userId;
  const isPostAuthor = post.author.toString() === userId;
  if (!isCommentAuthor && !isPostAuthor) {
    throw new Error("Unauthorized: You cannot delete this comment");
  }
  await Comment.findByIdAndDelete(commentId);
};
