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
dbRouter.post("/add-income", authenticateToken, createIncomeController);
dbRouter.post("/add-expense", authenticateToken, createExpenseController);

dbRouter.post(
  "/add-category-income",
  authenticateToken,
  createCategoryIncomeController
);
dbRouter.post(
  "/add-category-expense",
  authenticateToken,
  createCategoryExpenseController
);

dbRouter.get("/get-incomes", authenticateToken, getIncomesController);
dbRouter.get("/get-expenses", authenticateToken, getExpensesController);

dbRouter.get(
  "/get-category-income",
  authenticateToken,
  getCategoryIncomesController
);
dbRouter.get(
  "/get-category-expense",
  authenticateToken,
  getCategoryExpensesController
);

export default dbRouter;
