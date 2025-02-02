import { createExpenseController, createIncomeController, getExpensesController, getIncomesController } from "@/controller/db.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const dbRouter = Router();

/* Endpoints para el manejo de la base de datos en firebase */
dbRouter.post("/add-income", authenticateToken ,createIncomeController);
dbRouter.post("/add-expense", authenticateToken ,createExpenseController);
dbRouter.get("/get-incomes", authenticateToken ,getIncomesController);
dbRouter.get("/get-expenses", authenticateToken, getExpensesController);

export default dbRouter;