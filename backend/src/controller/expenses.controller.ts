import { createExpenseService, getExpensesService } from "@/services/expenses.service";
import { RequestUser } from "@/types/request.interface";
import { Response } from "express";

export const createExpenseController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) {
    return res.status(400).json({ message: 'Datos requeridos.' });
  }
  if (!uid) {
    return res.status(500).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    const createElement = await createExpenseService(uid, data);
    res.status(201).json(createElement);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getExpensesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;  
  if (!uid) {
    return res.status(500).json({ message: 'Error interno: Usuario no identificado' });
  }

  try {
    const expenses = await getExpensesService(uid);
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
