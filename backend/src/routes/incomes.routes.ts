import { createIncomeController, getIncomesController } from "@/controller/incomes.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const incomesRouter = Router();

incomesRouter.post("/incomes", authenticateToken, createIncomeController);
incomesRouter.get("/incomes", authenticateToken, getIncomesController);

export default incomesRouter;