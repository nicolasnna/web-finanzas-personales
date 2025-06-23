import { createService, deleteService, getService, updateService } from "@/services/db.service";
import { RequestUser } from "@/types/RequestUser.interface";
import { isTransactionData, TransactionData } from "@/types/TransactionData.interface";
import { Response } from "express";

const collectionName = 'incomes'

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
    const createElement = await createService(uid, data, collectionName);
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
    const incomes = await getService(uid, collectionName);
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
    return res.status(400).json({ message: "Formato no válido." });

  if (!docId)
    return res.status(400).json({ message: "Falta el parámetro docId." });

  try {
    const updateElement = await updateService<TransactionData>(uid, collectionName,docId, data);
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
    const deleteElement = await deleteService(uid, collectionName, docId);
    res.status(200).json(deleteElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}