import { Category } from "@/types/category.interface";
import { createCategoryService, getService, updateService } from "./db.service";

/**
 * Añade una categoria para los gastos para un usuario especifico
 * @param uid - Identificador único del usuario
 * @param data - Información de la categoria a subir  
 */
export const createCategoryExpenseService = async (uid: string, category: Category) => {
  return await createCategoryService(uid, category, 'categoryExpenses');
}

/**
 * Obtiene las categorias de gastos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getCategoryExpensesService = async (uid:string) => {
  return await getService(uid, 'categoryExpenses');
}

export const updateCategoryExpenseService = async (uidUser: string, uidDoc: string ,data: Category) => {
  return await updateService<Category>(uidUser, 'categoryExpenses', uidDoc, data)
}