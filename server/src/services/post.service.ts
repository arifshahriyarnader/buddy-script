import { Types } from "mongoose";
import { Post } from "../models";
import {
  CreatePostServiceInput,
  UpdatePostInput,
  DeletePostInput,
} from "../types";

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

export const deletePostService = async ({
  postId,
  authorId,
}: DeletePostInput) => {
  const deletePost = await Post.findById(postId);
  if (!deletePost) {
    throw new Error("Post not found");
  }
  if (deletePost.author.toString() !== authorId) {
    throw new Error("Unauthorized: You cannot delete this post");
  }
  await Post.findByIdAndDelete(postId);
  return;
};

export const likeOrUnlikePostService = async (
  postId: string,
  userId: string
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  const userObjectId = new Types.ObjectId(userId);
  const isLiked = post.likes.some((id) => id.toString() === userId);

  if (isLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId);
  } else {
    post.likes.push(userObjectId);
  }

  await post.save();
  return {
    liked: !isLiked,
    totalLikes: post.likes.length,
    post,
  };
};

export const getLikeOfPostService = async (postId: string) => {
  const post = await Post.findById(postId).populate(
    "likes",
    "firstname lastname email"
  );
  if (!post) {
    throw new Error("Post not found");
  }
  return {
    totalLikes: post.likes.length,
    likedBy: post.likes,
  };
};
