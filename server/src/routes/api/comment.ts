import { Router } from "express";
import { commentController } from "../../controllers";
import { authenticateToken } from "../../middleware";

const router = Router();

router.post(
  "/create-comment",
  authenticateToken,
  commentController.createCommentController
);

export default router;
