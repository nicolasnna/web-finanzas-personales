import { TransactionData } from "@/types/TransactionData.interface";
import { createService, getService } from "./db.service";

/**
 * Añade un gasto de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del gasto a subir
 */
export const createExpenseService = async (uid: string, data: TransactionData) => {
  return await createService(uid, data, 'expenses');
}

/**
 * Obtiene los gastos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getExpensesService = async (uid: string) => {
  return await getService(uid, 'expenses');
}