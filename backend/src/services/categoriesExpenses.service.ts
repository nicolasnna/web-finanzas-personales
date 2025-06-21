import { category } from "@/types/category.interface";
import { createCategoryService, getService } from "./db.service";

/**
 * Añade una categoria para los gastos para un usuario especifico
 * @param uid - Identificador único del usuario
 * @param data - Información de la categoria a subir  
 */
export const createCategoryExpenseService = async (uid: string, category: category) => {
  return await createCategoryService(uid, category, 'categoryExpenses');
}

/**
 * Obtiene las categorias de gastos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getCategoryExpensesService = async (uid:string) => {
  return await getService(uid, 'categoryExpenses');
}