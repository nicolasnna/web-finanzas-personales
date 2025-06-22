import { createCategoryService, deleteService, getService, updateService } from "@/services/db.service";
import { Category, isCategory } from "@/types/category.interface";
import { RequestUser } from "@/types/RequestUser.interface";
import { Response } from "express";

const collectionName = 'categoryExpenses'

export const createCategoryExpenseController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) return res.status(400).json({ message: "Datos requeridos." });

  if (!uid)
    return res
      .status(500)
      .json({ message: "Error interno: error al identificar el usuario." });

  if (!isCategory(data))
    return res.status(400).json({ message: "Formato de categoría no válida." });

  try {
    const createElement = await createCategoryService(uid, data, collectionName);
    res.status(201).json(createElement);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryExpensesController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;

  if (!uid) {
    return res
      .status(500)
      .json({ message: "Error interno: error al identificar el usuario." });
  }

  try {
    const expenses = await getService(uid, collectionName);
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategoryExpensesController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;
  const { docId } = req.params;

  if (!data) return res.status(400).json({ message: "Datos requeridos." });

  if (!uid)
    return res
      .status(500)
      .json({ message: "Error interno: error al identificar el usuario." });

  if (!isCategory(data))
    return res.status(400).json({ message: "Formato de categoría no válida." });

  if (!docId)
    return res.status(400).json({ message: "Falta el parámetro docId." });

  try {
    const updateElement = await updateService<Category>(uid, collectionName, docId, data);
    res.status(200).json(updateElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteCategoryExpensesController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;
  const { docId } = req.params;

  if (!uid)
    return res
      .status(500)
      .json({ message: "Error interno: error al identificar el usuario." });

  if (!docId)
    return res.status(400).json({ message: "Falta el parámetro docId." });

  try {
    const deleteElement = await deleteService(uid, collectionName, docId);
    res.status(200).json(deleteElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
