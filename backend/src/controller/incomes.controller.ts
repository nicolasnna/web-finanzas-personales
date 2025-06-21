import { createIncomeService, getIncomesService } from "@/services/incomes.service";
import { RequestUser } from "@/types/request.interface";
import { Response } from "express";

export const createIncomeController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) {
    return res.status(400).json({message: 'Datos requeridos.' });
  }

  if (!uid) {
    return res.status(500).json({message: 'Error interno: Usuario no identificado' });
  }

  try {
    const createElement = await createIncomeService(uid, data);
    res.status(201).json(createElement);
  } catch (error: any) {
    res.status(500).json({message: error.message });
  }
}

export const getIncomesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;  
  if (!uid) {
    return res.status(500).json({message: 'Error interno: Usuario no identificado' });
  }

  try {
    const incomes = await getIncomesService(uid);
    res.status(200).json(incomes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}