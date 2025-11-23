import { Router } from "express";
import signupRoutes from "./signup";
import loginRoutes from "./login";
import postRoutes from "./post";
const router = Router();

router.use("/auth", signupRoutes);
router.use("/auth", loginRoutes);
router.use("/posts",postRoutes)

export default router;
