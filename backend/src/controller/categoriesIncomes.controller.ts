import { createCategoryIncomeService, deleteCategoryIncomesService, getCategoryIncomesService, updateCategoryIncomesService } from "@/services/categoriesIncomes.service";
import { isCategory } from "@/types/category.interface";
import { RequestUser } from "@/types/RequestUser.interface";
import { Response } from "express";

export const createCategoryIncomeController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) return res.status(400).json({ message: 'Datos requeridos.' });

  if (!uid) return res.status(500).json({ message: 'Error interno: error al identificar el usuario.' });

  if (!isCategory(data)) return res.status(400).json({ message: 'Formato de categoría no válida.' });
  

  try {
    const createdCategory =  await createCategoryIncomeService(uid, data);
    res.status(201).json(createdCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getCategoryIncomesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(500).json({ message: 'Error interno: error al identificar el usuario.' });
  }

  try {
    const incomes = await getCategoryIncomesService(uid);
    res.status(200).json(incomes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCategoryIncomesController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
    const uid = req.user?.uid;
    const { docId } = req.params
  
    if (!data) return res.status(400).json({ message: 'Datos requeridos.' });
    
    if (!uid) return res.status(500).json({ message: 'Error interno: error al identificar el usuario.' });
    
    if (!isCategory(data)) return res.status(400).json({ message: 'Formato de categoría no válida.' });

    if (!docId) return res.status(400).json({ message: "Falta el parámetro docId." });
  
    try {
      const updateElement = await updateCategoryIncomesService(uid, docId, data)
      res.status(200).json(updateElement);
    } catch (e:any) {
      res.status(500).json({ message: e.message });
    }
}

export const deleteCategoryIncomesController = async (
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
    const deleteElement = await deleteCategoryIncomesService(uid, docId);
    res.status(200).json(deleteElement);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};