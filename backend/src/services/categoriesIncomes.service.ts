import { category } from "@/types/category.interface";
import { createCategoryService, getService } from "./db.service";

/**
 * Añade una categoria para los gastos para un usuario especifico
 * @param uid - Identificador único del usuario
 * @param data - Información de la categoria a subir
 */
export const createCategoryIncomeService = async (uid: string, category: category) => {
  return await createCategoryService(uid, category, 'categoryIncomes');
}

/**
 * Obtiene las categorias de ingresos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getCategoryIncomesService = async (uid:string) => {
  return await getService(uid, 'categoryIncomes');
}