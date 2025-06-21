import { createCategoryExpenseController, getCategoryExpensesController, updateCategoryExpensesController } from "@/controller/categoriesExpenses.controller";
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

categoryExpensesRouter.put('/categories/expenses/:docId', authenticateToken, updateCategoryExpensesController)

export default categoryExpensesRouter;
