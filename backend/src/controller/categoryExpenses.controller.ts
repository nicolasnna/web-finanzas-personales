import { createCategoryExpenseService, getCategoryExpensesService } from "@/services/db.service";
import { RequestUser } from "@/types/request.interface";
import { Response } from "express";

export const createCategoryExpenseController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) {
    return res.status(400).json({ message: 'Datos requeridos.' });
  }
  if (!uid) {
    return res.status(500).json({ message: 'Se requiere un uid de usuario.' });
  }

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
    return res.status(500).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    const expenses = await getCategoryExpensesService(uid);
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}