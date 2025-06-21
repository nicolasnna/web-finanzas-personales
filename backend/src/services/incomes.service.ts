import { incomesData } from "@/types/incomes.interface";
import { createService, getService } from "./db.service";

/**
 * Añade un ingreso de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del ingreso a subir
 */
export const createIncomeService = async (uid: string, data: incomesData) => {
  return await createService(uid, data, 'incomes');
}

/**
 * Obtiene los ingresos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getIncomesService = async (uid: string) => {
  return await getService(uid, 'incomes');
}

