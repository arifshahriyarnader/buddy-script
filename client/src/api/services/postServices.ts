import { http } from "../../common/https";
import type {
  CreatePostType,
  deletePostType,
  UpdatePostType,
} from "./postTypes";

export const addPost = async (postData: CreatePostType) => {
  try {
    const response = await http.post("/api/posts/create-post", postData);
    return response;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await http.get("/api/posts/get-all-posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getMyPosts = async () => {
  try {
    const response = await http.get("/api/posts/get-my-posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching my posts:", error);
    throw error;
  }
};

export const getSinglePosts = async (postId: string) => {
  try {
    const response = await http.get(`/api/posts/get-single-post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the post:", error);
    throw error;
  }
};

export const updatePosts = async (
  postId: string,
  updatePostData: UpdatePostType
) => {
  try {
    const response = await http.put(
      `/api/posts/update-post/${postId}`,
      updatePostData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating the post:", error);
    throw error;
  }
};

export const deletePost = async (
  postId: string,
  deletePostData: deletePostType
) => {
  try {
    const response = await http.delete(`/api/post/delete-post/${postId}`, {
      data: deletePostData,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting the post:", error);
    throw error;
  }
};

export const likeUnlikePost = async (postId: string) => {
  try {
    const response = await http.put(`/api/posts/like-unlike-post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error liking/unliking the post:", error);
    throw error;
  }
};

export const getPostsTotalLikes = async (postId: string) => {
  try {
    const response = await http.get(`/api/posts/${postId}/likes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total likes for the post:", error);
    throw error;
  }
};
