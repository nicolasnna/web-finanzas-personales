import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { incomesData } from '@/types/incomes.interface';
import { expenseData } from '@/types/expense.interface';
import { category } from '@/types/category.interface';

/**
 * Crea un servicio para añadir datos a una colección
 * @param uid - Identificador único del usuario
 * @param data - Información a subir
 * @param collectionName - Nombre de la colección
 */
const createService = async (uid: string, data: incomesData | expenseData, collectionName: string) => {
  try {
    const collectionRef = collection(db, 'users', uid, collectionName);
    const doc = await addDoc(collectionRef, data);
    return doc;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Añade un ingreso de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del ingreso a subir
 */
export const createIncomeService = async (uid: string, data: incomesData) => {
  return await createService(uid, data, 'incomes');
}

/**
 * Añade un gasto de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del gasto a subir
 */
export const createExpenseService = async (uid: string, data: expenseData) => {
  return await createService(uid, data, 'expenses');
}


export const createCategoryService = async (uid: string, data: category, collectionName: string) => {
  try {
    const collectionRef = collection(db, 'users', uid, collectionName);
    const collectionSnapshot = await getDocs(collectionRef)
    console.log(data)
    const exist = collectionSnapshot.docs.some( items => items.data().category.toLowerCase() == data.category.toLowerCase())
    if (!exist) {
      const doc = await addDoc(collectionRef, data);
      return doc.id;
    } else {
      throw new Error(`La categoria ${data.category} ya se encuentra creada.`)
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Añade una categoria para los gastos para un usuario especifico
 * @param uid - Identificador único del usuario
 * @param data - Información de la categoria a subir
 */
export const createCategoryIncomeService = async (uid: string, data: any) => {
  return await createCategoryService(uid, data, 'categoryIncomes');
}

/**
 * Añade una categoria para los gastos para un usuario especifico
 * @param uid - Identificador único del usuario
 * @param data - Información de la categoria a subir  
 */
export const createCategoryExpenseService = async (uid: string, data: any) => {
  return await createCategoryService(uid, data, 'categoryExpenses');
}

/**
 * Obtiene los datos de una colección
 * @param uid - Identificador único del usuario
 * @param collectionName - Nombre de la colección
 */
const getService = async (uid: string, collectionName: string) => {
  try {
    const collectionRef = collection(db, 'users', uid, collectionName);
    const collectionSnapshot = await getDocs(collectionRef);

    const collectionData = collectionSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return collectionData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Obtiene los ingresos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getIncomesService = async (uid: string) => {
  return await getService(uid, 'incomes');
}

/**
 * Obtiene los gastos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getExpensesService = async (uid: string) => {
  return await getService(uid, 'expenses');
}

/**
 * Obtiene las categorias de ingresos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getCategoryIncomesService = async (uid:string) => {
  return await getService(uid, 'categoryIncomes');
}


/**
 * Obtiene las categorias de gastos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getCategoryExpensesService = async (uid:string) => {
  return await getService(uid, 'categoryExpenses');
}