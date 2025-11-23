import { Router } from "express";
import { postController } from "../../controllers";
import { authenticateToken } from "../../middleware";

const router = Router();

router.post(
  "/create-post",
  authenticateToken,
  postController.createPostController
);

export default router;
