import { createIncomeController, deleteIncomesController, getIncomesController, updateIncomesController } from "@/controller/incomes.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const incomesRouter = Router();

incomesRouter.post("/incomes", authenticateToken, createIncomeController);
incomesRouter.get("/incomes", authenticateToken, getIncomesController);

incomesRouter.put('/incomes/:docId', authenticateToken, updateIncomesController)
incomesRouter.delete('/incomes/:docId', authenticateToken, deleteIncomesController)

export default incomesRouter;