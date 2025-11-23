import { Router } from "express";
import { postController } from "../../controllers";
import { authenticateToken } from "../../middleware";

const router = Router();

router.post(
  "/create-post",
  authenticateToken,
  postController.createPostController
);

router.get(
  "/get-all-posts",
  authenticateToken,
  postController.getAllPostsController
);

router.get(
  "/get-my-posts",
  authenticateToken,
  postController.getMyPostsController
);

router.get(
  "/get-single-post/:postId",
  authenticateToken,
  postController.getSinglePostController
);

router.put(
  "/update-post/:postId",
  authenticateToken,
  postController.updatePostController
);

export default router;
