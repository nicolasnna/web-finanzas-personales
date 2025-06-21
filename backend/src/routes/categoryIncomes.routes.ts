
import { createCategoryIncomeController, getCategoryIncomesController } from "@/controller/categoryIncomes.controller";
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

export default categoryIncomesRouter;
