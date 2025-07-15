import { createCategoryService, deleteService, getService, updateService } from "../services/db.service";
import { Category, isCategory } from "../types/category.interface";
import { CollectionName } from "../types/CollectionName.type";
import { RequestUser } from "../types/RequestUser.interface";
import { Response } from "express";

const getCollectionName = (req: RequestUser): CollectionName | null => {
  const { path } = req;
  if (path.includes("/categories/expenses")) return "categoryExpenses";
  if (path.includes("/categories/incomes")) return "categoryIncomes";
  return null;
};

export const createCategoryController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;
  const collectionName = getCollectionName(req)

  if (!data) return res.status(400).json({ message: 'Datos requeridos.' });

  if (!uid) return res.status(500).json({ message: 'Error interno: error al identificar el usuario.' });

  if (!isCategory(data)) return res.status(400).json({ message: 'Formato de categoría no válida.' });
  

  try {
    const createdCategory =  await createCategoryService(uid, data, collectionName);
    res.status(201).json(createdCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getCategoryController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;
  const collectionName = getCollectionName(req)

  if (!uid) {
    return res.status(500).json({ message: 'Error interno: error al identificar el usuario.' });
  }

  try {
    const incomes = await getService(uid, collectionName);
    res.status(200).json(incomes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCategoryController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
    const uid = req.user?.uid;
    const { docId } = req.params
    const collectionName = getCollectionName(req)

    if (!data) return res.status(400).json({ message: 'Datos requeridos.' });
    
    if (!uid) return res.status(500).json({ message: 'Error interno: error al identificar el usuario.' });
    
    if (!isCategory(data)) return res.status(400).json({ message: 'Formato de categoría no válida.' });

    if (!docId) return res.status(400).json({ message: "Falta el parámetro docId." });
  
    try {
      const updateElement = await updateService<Category>(uid, collectionName, docId, data)
      res.status(200).json(updateElement);
    } catch (e:any) {
      res.status(500).json({ message: e.message });
    }
}

export const deleteCategoryController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;
  const { docId } = req.params;
  const collectionName = getCollectionName(req)

  if (!uid)
    return res
      .status(500)
      .json({ message: "Error interno: error al identificar el usuario." });

  if (!docId)
    return res.status(400).json({ message: "Falta el parámetro docId." });

  try {
    const deleteElement = await deleteService(uid, collectionName,docId);
    res.status(200).json(deleteElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};