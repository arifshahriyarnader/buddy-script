import { Router } from "express";
import signupRoutes from "./signup";
import loginRoutes from "./login";
import postRoutes from "./post";
import commentRoutes from "./comment";
const router = Router();

router.use("/auth", signupRoutes);
router.use("/auth", loginRoutes);
router.use("/posts",postRoutes)
router.use("/comments",commentRoutes);

export default router;
