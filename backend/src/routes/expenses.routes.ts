import {
  createExpenseController,
  deleteExpensesController,
  getExpensesController,
  updateExpensesController,
} from "@/controller/expenses.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const expensesRouter = Router();

expensesRouter.post("/expenses", authenticateToken, createExpenseController);
expensesRouter.get("/expenses", authenticateToken, getExpensesController);

expensesRouter.put(
  "/expenses/:docId",
  authenticateToken,
  updateExpensesController
);

expensesRouter.delete(
  "/expenses/:docId",
  authenticateToken,
  deleteExpensesController
);

export default expensesRouter;
