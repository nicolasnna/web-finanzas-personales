import {
  createCategoryExpenseController,
  createCategoryIncomeController,
  createExpenseController,
  createIncomeController,
  getCategoryExpensesController,
  getCategoryIncomesController,
  getExpensesController,
  getIncomesController,
} from "@/controller/db.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const dbRouter = Router();

/* Endpoints para el manejo de la base de datos en firebase */
dbRouter.post("/incomes", authenticateToken, createIncomeController);
dbRouter.post("/expenses", authenticateToken, createExpenseController);

dbRouter.get("/incomes", authenticateToken, getIncomesController);
dbRouter.get("/expenses", authenticateToken, getExpensesController);


dbRouter.post(
  "/categories/incomes",
  authenticateToken,
  createCategoryIncomeController
);
dbRouter.post(
  "/categories/expenses",
  authenticateToken,
  createCategoryExpenseController
);

dbRouter.get(
  "/categories/incomes",
  authenticateToken,
  getCategoryIncomesController
);
dbRouter.get(
  "/categories/expenses",
  authenticateToken,
  getCategoryExpensesController
);

export default dbRouter;
