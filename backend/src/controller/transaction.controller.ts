import {
  createService,
  deleteService,
  getTransactionService,
  updateService
} from "../services/db.service";
import { RequestUser } from "../types/RequestUser.interface";
import { isTransactionData, TransactionData } from "../types/TransactionData.interface";
import { Response } from "express";
import { CollectionName } from "../types/CollectionName.type";

const getCollectionName = (req: RequestUser): CollectionName | null => {
  const { path } = req;
  if (path.includes("/expenses")) return "expenses";
  if (path.includes("/incomes")) return "incomes";
  return null;
};

export const createTransactionController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;
  const collectionName = getCollectionName(req);

  if (!data) return res.status(400).json({ message: "Datos requeridos." });
  if (!uid) return res.status(500).json({ message: "Usuario no identificado." });
  if (!collectionName) return res.status(400).json({ message: "Ruta no válida." });
  if (!isTransactionData(data)) {
    return res.status(400).json({ message: "Formato no válido." });
  }

  try {
    const created = await createService(uid, data, collectionName);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionsController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;
  const collectionName = getCollectionName(req);
  if (!uid) return res.status(401).json({ message: "No autorizado" });
  if (!collectionName) return res.status(400).json({ message: "Ruta no válida." });

  try {
    const data = await getTransactionService(uid, collectionName);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionsQueryController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;
  const collectionName = getCollectionName(req);
  if (!uid) return res.status(401).json({ message: "No autorizado" });
  if (!collectionName) return res.status(400).json({ message: "Ruta no válida." });

  const { limit, afterDate, atDate, order } = req.query;

  const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
  const parsedAfterDate = afterDate ? new Date(afterDate as string) : undefined;
  const parsedAtDate = atDate ? new Date(atDate as string) : undefined;
  const parsedOrder = order === "asc" || order === "desc" ? order : "desc";

  try {
    const docsResponse = await getTransactionService(
      uid,
      collectionName,
      parsedLimit,
      parsedAfterDate,
      parsedAtDate,
      parsedOrder
    );
    res.status(200).json(docsResponse);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener transacciones" });
  }
};

export const updateTransactionController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;
  const data = req.body;
  const { docId } = req.params;
  const collectionName = getCollectionName(req);

  if (!data) return res.status(400).json({ message: "Datos requeridos." });
  if (!uid) return res.status(500).json({ message: "Usuario no identificado." });
  if (!docId) return res.status(400).json({ message: "Falta docId." });
  if (!collectionName) return res.status(400).json({ message: "Ruta no válida." });
  if (!isTransactionData(data)) return res.status(400).json({ message: "Formato no válido." });

  try {
    const updated = await updateService<TransactionData>(
      uid,
      collectionName,
      docId,
      data
    );
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransactionController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;
  const { docId } = req.params;
  const collectionName = getCollectionName(req);

  if (!uid) return res.status(500).json({ message: "Usuario no identificado." });
  if (!docId) return res.status(400).json({ message: "Falta docId." });
  if (!collectionName) return res.status(400).json({ message: "Ruta no válida." });

  try {
    const deleted = await deleteService(uid, collectionName, docId);
    res.status(200).json(deleted);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
