import {
  getResumeTransactionController,
  getTopTransactionController,
} from "@/controller/resume.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const resumeRouter = Router();

resumeRouter.get(
  "/resume/by-category",
  authenticateToken,
  getResumeTransactionController
);

resumeRouter.get("/resume/top", authenticateToken, getTopTransactionController);

export default resumeRouter;
