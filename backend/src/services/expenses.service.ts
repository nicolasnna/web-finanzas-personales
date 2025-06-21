import { TransactionData } from "@/types/TransactionData.interface";
import { createService, deleteService, getService, updateService } from "./db.service";

const collectionName = 'expenses'

/**
 * Añade un gasto de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del gasto a subir
 */
export const createExpenseService = async (uid: string, data: TransactionData) => {
  return await createService(uid, data, collectionName);
}

/**
 * Obtiene los gastos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getExpensesService = async (uid: string) => {
  return await getService(uid, collectionName);
}

export const updateExpensesService = async (uid: string, uidDoc: string, data: TransactionData) => {
  return await updateService<TransactionData>(uid, collectionName, uidDoc, data)
}

export const deleteExpensesService = async (uid: string, uidDoc: string) => {
  return await deleteService(uid, collectionName, uidDoc)
}

