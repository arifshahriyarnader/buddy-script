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

export default router;
