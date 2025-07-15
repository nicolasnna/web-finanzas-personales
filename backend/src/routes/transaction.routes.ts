import {
  createTransactionController,
  deleteTransactionController,
  getTransactionsQueryController,
  updateTransactionController,
} from "../controller/transaction.controller";
import { authenticateToken } from "../middleware/authenticateToken";
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.get(
  "/expenses",
  authenticateToken,
  getTransactionsQueryController
);
transactionRouter.post(
  "/expenses",
  authenticateToken,
  createTransactionController
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

transactionRouter.get(
  "/incomes",
  authenticateToken,
  getTransactionsQueryController
);
transactionRouter.post(
  "/incomes",
  authenticateToken,
  createTransactionController
);
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
