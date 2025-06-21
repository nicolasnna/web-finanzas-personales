
import { createCategoryIncomeController, deleteCategoryIncomesController, getCategoryIncomesController, updateCategoryIncomesController } from "@/controller/categoriesIncomes.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const categoryIncomesRouter = Router();

categoryIncomesRouter.post(
  "/categories/incomes",
  authenticateToken,
  createCategoryIncomeController
);

categoryIncomesRouter.get(
  "/categories/incomes",
  authenticateToken,
  getCategoryIncomesController
);

categoryIncomesRouter.put(
  '/categories/incomes/:docId',
  authenticateToken,
  updateCategoryIncomesController
)

categoryIncomesRouter.delete(
  '/categories/incomes/:docId',
  authenticateToken,
  deleteCategoryIncomesController
)

export default categoryIncomesRouter;
