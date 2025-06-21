import { createExpenseService, deleteExpensesService, getExpensesService, updateExpensesService } from "@/services/expenses.service";
import { RequestUser } from "@/types/RequestUser.interface";
import { isTransactionData } from "@/types/TransactionData.interface";
import { Response } from "express";

export const createExpenseController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) return res.status(400).json({ message: 'Datos requeridos.' });
  
  if (!uid) return res.status(500).json({ message: 'Se requiere un uid de usuario.' });

  if (!isTransactionData(data)) return res.status(400).json({message: 'Formato de transacción no válida'})

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

export const updateExpensesController = async (req: RequestUser, res: Response): Promise<any> => {
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
    const updateElement = await updateExpensesService(uid, docId, data);
    res.status(200).json(updateElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

export const deleteExpensesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;
  const { docId } = req.params;

  if (!uid)
    return res
      .status(500)
      .json({ message: "Error interno: error al identificar el usuario." });

  if (!docId)
    return res.status(400).json({ message: "Falta el parámetro docId." });

  try {
    const deleteElement = await deleteExpensesService(uid, docId);
    res.status(200).json(deleteElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}