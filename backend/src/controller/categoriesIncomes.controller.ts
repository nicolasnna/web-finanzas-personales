import { createCategoryIncomeService, getCategoryIncomesService } from "@/services/categoriesIncomes.service";
import { RequestUser } from "@/types/request.interface";
import { Response } from "express";

export const createCategoryIncomeController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) {
    return res.status(400).json({ message: 'Datos requeridos.' });
  }
  if (!uid) {
    return res.status(500).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    const createdCategory =  await createCategoryIncomeService(uid, data);
    res.status(201).json(createdCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getCategoryIncomesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(500).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    const incomes = await getCategoryIncomesService(uid);
    res.status(200).json(incomes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}