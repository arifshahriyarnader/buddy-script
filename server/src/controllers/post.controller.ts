import { Request, Response } from "express";
import { createPostValidation } from "../validations";
import { CreatePostInput } from "../types";
import { postServices } from "../services";

export const createPostController = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  try {
    const parsed = createPostValidation.parse(req.body);
    const authorId = req.user?._id;
    if (!authorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const newPost = await postServices.createPostService({
      author: authorId,
      text: parsed.text,
      images: parsed.images || [],
      visibility: parsed.visibility || "public",
    });
    return res
      .status(201)
      .json({ message: "Post created successfully", newPost });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllPostsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const posts = await postServices.getAllPostsService(userId);
    return res
      .status(200)
      .json({ message: "All posts fetched successfully", posts });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyPostsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const posts = await postServices.getMyPostsService(userId);
    return res
      .status(200)
      .json({ message: "My posts fetched successfully", posts });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSinglePostController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await postServices.getSinglePostService(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (
      post.visibility === "private" &&
      post.author._id.toString() !== userId
    ) {
      return res.status(403).json({
        message: "You are not allowed to view this post",
      });
    }
    return res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
