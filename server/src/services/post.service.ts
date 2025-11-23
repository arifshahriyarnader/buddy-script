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

export const getAllPostsService = async (userId: string) => {
  const posts = await Post.find({
    $or: [{ visibility: "public" }, { author: userId }],
  })
    .populate("author", "firstname lastname email")
    .sort({ createdAt: -1 });
  return posts;
};

export const getMyPostsService = async (userId: string) => {
  const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });
  return posts;
};

export const getSinglePostService = async (postId: string) => {
  const post = await Post.findById(postId).populate("author", "name email");
  return post;
};
