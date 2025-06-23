import { createCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "@/controller/category.controller";
import { authenticateToken } from "@/middleware/authenticateToken";
import { Router } from "express";

const categoryRouter = Router();


categoryRouter.post(
  "/categories/expenses",
  authenticateToken,
  createCategoryController
);
categoryRouter.get(
  "/categories/expenses",
  authenticateToken,
  getCategoryController
);
categoryRouter.put(
  "/categories/expenses/:docId",
  authenticateToken,
  updateCategoryController
);
categoryRouter.delete(
  "/categories/expenses/:docId",
  authenticateToken,
  deleteCategoryController
);


categoryRouter.post(
  "/categories/incomes",
  authenticateToken,
  createCategoryController
);
categoryRouter.get(
  "/categories/incomes",
  authenticateToken,
  getCategoryController
);
categoryRouter.put(
  '/categories/incomes/:docId',
  authenticateToken,
  updateCategoryController
)
categoryRouter.delete(
  '/categories/incomes/:docId',
  authenticateToken,
  deleteCategoryController
)

export default categoryRouter