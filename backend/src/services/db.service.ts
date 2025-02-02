import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { incomesData } from '@/types/incomes.interface';
import { expenseData } from '@/types/expense.interface';

/**
 * Añade un ingreso de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del ingreso a subir
 */
export const createIncomeService = async (uid: string, data: incomesData) => {
  try {
    const incomesRef = collection(db, 'users', uid, 'incomes');
    const incomeDoc = await addDoc(incomesRef, data);
    // console.log("Ingreso añadido con ID:", incomeDoc.id);
    return incomeDoc.id; // Retorna el ID del ingreso creado
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Añade un gasto de finanzas para un usuario
 * @param uid - Identificador único del usuario
 * @param data - Información del gasto a subir
 */
export const createExpenseService = async (uid: string, data: expenseData) => {
  try {
    const expensesRef = collection(db, 'users', uid, 'expenses');
    const expenseDoc = await addDoc(expensesRef, data);
    // console.log("Gasto añadido con ID:", expenseDoc.id);
    return expenseDoc.id; // Retorna el ID del gasto creado
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Obtiene los ingresos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getIncomesService = async (uid: string) => {
  try {
    const incomesRef = collection(db, 'users', uid, 'incomes');
    const incomesSnapshot = await getDocs(incomesRef);

    const incomes = incomesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return incomes;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Obtiene los gastos de un usuario
 * @param uid - Identificador único del usuario
 */
export const getExpensesService = async (uid: string) => {
  try {
    const expensesRef = collection(db, 'users', uid, 'expenses');
    const expensesSnapshot = await getDocs(expensesRef);

    const expenses = expensesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return expenses;
  } catch (error: any) {
    throw new Error(error.message);
  }
}