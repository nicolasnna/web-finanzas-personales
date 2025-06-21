import { createCategoryExpenseService, getCategoryExpensesService } from "@/services/categoriesExpenses.service";
import { isCategory } from "@/types/category.interface";
import { RequestUser } from "@/types/RequestUser.interface";
import { Response } from "express";

export const createCategoryExpenseController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) return res.status(400).json({ message: 'Datos requeridos.' });
  
  if (!uid) return res.status(500).json({ message: 'Error interno: error al identificar el usuario.' });
  
  if (!isCategory(data)) return res.status(400).json({ message: 'Formato de categoría no válida.' });

  try {
    const createElement = await createCategoryExpenseService(uid, data);
    res.status(201).json(createElement);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getCategoryExpensesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(500).json({ message: 'Error interno: error al identificar el usuario.' });
  }

  try {
    const expenses = await getCategoryExpensesService(uid);
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}