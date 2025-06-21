import { TransactionData } from "@/types/TransactionData.interface";
import { createService, getService } from "./db.service";

/**
 * Añade un ingreso de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del ingreso a subir
 */
export const createIncomeService = async (uid: string, data: TransactionData) => {
  return await createService(uid, data, 'incomes');
}

/**
 * Obtiene los ingresos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getIncomesService = async (uid: string) => {
  return await getService(uid, 'incomes');
}

