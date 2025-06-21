import { createCategoryExpenseController, getCategoryExpensesController } from "@/controller/categoryExpenses.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const categoryExpensesRouter = Router();

categoryExpensesRouter.post(
  "/categories/expenses",
  authenticateToken,
  createCategoryExpenseController
);

categoryExpensesRouter.get(
  "/categories/expenses",
  authenticateToken,  
  getCategoryExpensesController
);

export default categoryExpensesRouter;
