import { Post } from "../models";
import { CreatePostServiceInput } from "../types";

export const createPostService = async (data: CreatePostServiceInput) => {
  const newPost = await Post.create({
    author: data.author,
    text: data.text,
    images: data.images || [],
    visibility: data.visibility || "public",
  });
  return newPost;
};

export const getAllPostsService = async () => {
  const posts = await Post.find()
    .populate("author", "firstname lastname email")
    .sort({ createdAt: -1 });
  return posts;
};
