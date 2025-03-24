import { createCategoryExpenseService, createCategoryIncomeService, createExpenseService, createIncomeService, getCategoryExpensesService, getCategoryIncomesService, getExpensesService, getIncomesService } from '@/services/db.service';
import { RequestUser } from '@/types/request.interface';
import {Request, Response} from 'express';

/* 
 * Subir a la base de datos un nuevo ingreso
 */
export const createIncomeController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) {
    return res.status(400).json({ message: 'Datos requeridos.' });
  }
  if (!uid) {
    return res.status(400).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    await createIncomeService(uid, data);
    res.status(201).json({ message: 'Ingreso creado con exito.' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

/*
 * Subir a la base de datos un nuevo gasto
 */
export const createExpenseController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) {
    return res.status(400).json({ message: 'Datos requeridos.' });
  }
  if (!uid) {
    return res.status(400).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    await createExpenseService(uid, data);
    res.status(201).json({ message: 'Gasto creado con exito.' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

/*
 * Subir a la base de datos una nueva categoria de ingreso
*/
export const createCategoryIncomeController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) {
    return res.status(400).json({ message: 'Datos requeridos.' });
  }
  if (!uid) {
    return res.status(400).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    await createCategoryIncomeService(uid, data);
    res.status(201).json({ message: 'Categoria de ingreso creada con exito.' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

/*
* Subir a la base de datos una nueva categoria de Gasto
*/
export const createCategoryExpenseController = async (req: RequestUser, res: Response): Promise<any> => {
  const data = req.body;
  const uid = req.user?.uid;

  if (!data) {
    return res.status(400).json({ message: 'Datos requeridos.' });
  }
  if (!uid) {
    return res.status(400).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    await createCategoryExpenseService(uid, data);
    res.status(201).json({ message: 'Categoria de gasto creada con exito.' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

/*
* Obtener los ingresos de un usuario
*/
export const getIncomesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;  
  if (!uid) {
    return res.status(400).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    const incomes = await getIncomesService(uid);
    res.status(200).json(incomes);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

/*
* Obtener los gastos de un usuario
*/
export const getExpensesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(400).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    const expenses = await getExpensesService(uid);
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

/*
* Obtener las categorias de ingresos de un usuario 
*/
export const getCategoryIncomesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(400).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    const incomes = await getCategoryIncomesService(uid);
    res.status(200).json(incomes);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

/*
* Obtener las categorias de egresos de un usuario
*/
export const getCategoryExpensesController = async (req: RequestUser, res: Response): Promise<any> => {
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(400).json({ message: 'Se requiere un uid de usuario.' });
  }

  try {
    const expenses = await getCategoryExpensesService(uid);
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}