import { createExpenseController, getExpensesController } from "@/controller/expenses.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const expensesRouter = Router();

expensesRouter.post("/expenses", authenticateToken, createExpenseController);
expensesRouter.get("/expenses", authenticateToken, getExpensesController);

export default expensesRouter;