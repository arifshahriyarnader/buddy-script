import { http } from "../../common/https";
import type { CreateCommentType, UpdateCommentType } from "./commentTypes";

export const addComment = async (commentData: CreateCommentType) => {
  try {
    const response = await http.post(
      "/api/comments/create-comment",
      commentData
    );
    return response;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getCommentsWithReplies = async (postId: string) => {
  try {
    const response = await http.get(
      `/api/comments/get-comments-replies/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments and replies:", error);
    throw error;
  }
};

export const updateComment = async (updateCommentData: UpdateCommentType) => {
  try {
    const response = await http.put(
      `/api/comments/update-comment/${updateCommentData.commentId}`,
      updateCommentData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await http.delete(
      `/api/comments/delete-comment/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const likeOrUnlikeComment = async (commentId: string) => {
  try {
    const response = await http.post(
      `/api/comments/like-unlike-comment/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error liking/unliking comment:", error);
    throw error;
  }
};
