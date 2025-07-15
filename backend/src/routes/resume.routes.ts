import {
  getResumeTransactionController,
  getResumeTransactionPerMonth,
  getTopTransactionController,
  getTotalCountController,
} from "../controller/resume.controller";
import { authenticateToken } from "../middleware/authenticateToken";
import { Router } from "express";

const resumeRouter = Router();

resumeRouter.get(
  "/resume/by-category",
  authenticateToken,
  getResumeTransactionController
);

resumeRouter.get(
  "/resume/by-month",
  authenticateToken,
  getResumeTransactionPerMonth
);

resumeRouter.get("/resume/top", authenticateToken, getTopTransactionController);

resumeRouter.get(
  "/resume/total-counts",
  authenticateToken,
  getTotalCountController
);

export default resumeRouter;
