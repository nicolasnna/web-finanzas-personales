import { Category } from "@/types/category.interface";
import { createCategoryService, deleteService, getService, updateService } from "./db.service";

const collectionName = 'categoryIncomes'

/**
 * Añade una categoria para los gastos para un usuario especifico
 * @param uid - Identificador único del usuario
 * @param data - Información de la categoria a subir
 */
export const createCategoryIncomeService = async (uid: string, category: Category) => {
  return await createCategoryService(uid, category, collectionName);
}

/**
 * Obtiene las categorias de ingresos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getCategoryIncomesService = async (uid:string) => {
  return await getService(uid, collectionName);
}

export const updateCategoryIncomesService = async (uid: string, uidDoc: string, data: Category) => {
  return await updateService<Category>(uid, collectionName, uidDoc, data)
  }

export const deleteCategoryIncomesService = async (uid: string, uidDoc: string) => {
  return await deleteService(uid, collectionName, uidDoc)
}