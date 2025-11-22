import { Router } from "express";
import signupRoutes from "./signup";
const router = Router();

router.use("/auth", signupRoutes);

export default router;
