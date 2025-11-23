import { Post } from "../models";
import { CreatePostServiceInput, UpdatePostInput } from "../types";

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

export const updatePostService = async (
  postId: string,
  authorId: string,
  data: UpdatePostInput
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.author.toString() !== authorId) {
    throw new Error("Unauthorized: You cannot update this post");
  }
  if (data.text !== undefined) post.text = data.text;
  if (data.images !== undefined) post.images = data.images;
  if (data.visibility !== undefined) post.visibility = data.visibility;
  await post.save();
  return post;
};
