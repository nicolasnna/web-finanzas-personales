import { TransactionData } from "@/types/TransactionData.interface";
import { createService, deleteService, getService, updateService } from "./db.service";

const collectionName = 'incomes'

/**
 * Añade un ingreso de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del ingreso a subir
 */
export const createIncomeService = async (uid: string, data: TransactionData) => {
  return await createService(uid, data, collectionName);
}

/**
 * Obtiene los ingresos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getIncomesService = async (uid: string) => {
  return await getService(uid, collectionName);
}

export const updateIncomesService = async (uid: string, uidDoc: string, data: TransactionData) => {
  return await updateService<TransactionData>(uid, collectionName, uidDoc, data)
}

export const deleteIncomesService = async (uid: string, uidDoc: string) => {
  return await deleteService(uid, collectionName, uidDoc)
}

