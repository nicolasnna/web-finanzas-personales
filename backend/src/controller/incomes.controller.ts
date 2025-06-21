import { createIncomeService, deleteIncomesService, getIncomesService, updateIncomesService } from "@/services/incomes.service";
import { RequestUser } from "@/types/RequestUser.interface";
import { isTransactionData } from "@/types/TransactionData.interface";
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

  if (!isTransactionData(data)) return res.status(400).json({message: 'Formato de transacción no válida'})

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


export const updateIncomesController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;
  const { docId } = req.params;

  if (!data) return res.status(400).json({ message: "Datos requeridos." });

  if (!uid)
    return res
      .status(500)
      .json({ message: "Error interno: error al identificar el usuario." });

  if (!isTransactionData(data))
    return res.status(400).json({ message: "Formato de categoría no válida." });

  if (!docId)
    return res.status(400).json({ message: "Falta el parámetro docId." });

  try {
    const updateElement = await updateIncomesService(uid, docId, data);
    res.status(200).json(updateElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

export const deleteIncomesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;
  const { docId } = req.params;

  if (!uid)
    return res
      .status(500)
      .json({ message: "Error interno: error al identificar el usuario." });

  if (!docId)
    return res.status(400).json({ message: "Falta el parámetro docId." });

  try {
    const deleteElement = await deleteIncomesService(uid, docId);
    res.status(200).json(deleteElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}