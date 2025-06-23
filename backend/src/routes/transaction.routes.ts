import {
  createTransactionController,
  deleteTransactionController,
  getTransactionsController,
  updateTransactionController,
} from "@/controller/transaction.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.post(
  "/expenses",
  authenticateToken,
  createTransactionController
);
transactionRouter.get(
  "/expenses",
  authenticateToken,
  getTransactionsController
);
transactionRouter.put(
  "/expenses/:docId",
  authenticateToken,
  updateTransactionController
);
transactionRouter.delete(
  "/expenses/:docId",
  authenticateToken,
  deleteTransactionController
);

transactionRouter.post(
  "/incomes",
  authenticateToken,
  createTransactionController
);
transactionRouter.get("/incomes", authenticateToken, getTransactionsController);
transactionRouter.put(
  "/incomes/:docId",
  authenticateToken,
  updateTransactionController
);
transactionRouter.delete(
  "/incomes/:docId",
  authenticateToken,
  deleteTransactionController
);

export default transactionRouter;
