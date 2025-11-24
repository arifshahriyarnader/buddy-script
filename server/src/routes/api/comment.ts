import { Router } from "express";
import { commentController } from "../../controllers";
import { authenticateToken } from "../../middleware";

const router = Router();

router.post(
  "/create-comment",
  authenticateToken,
  commentController.createCommentController
);

router.get(
  "/get-comments-replies/:postId",
  authenticateToken,
  commentController.getCommentsController
);

router.put(
  "/update-comment/:commentId",
  authenticateToken,
  commentController.updateCommentController
);

router.delete(
  "/delete-comment/:commentId",
  authenticateToken,
  commentController.deleteCommentController
);

export default router;
