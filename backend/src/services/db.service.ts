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
export const createService = async (uid: string, data: incomesData | expenseData, collectionName: string) => {
  try {
    const collectionRef = collection(db, 'users', uid, collectionName);
    const doc = await addDoc(collectionRef, data);
    return doc;
  } catch (error: any) {
    throw error;
  }
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
    throw error;
  }
}

/**
 * Obtiene los datos de una colección
 * @param uid - Identificador único del usuario
 * @param collectionName - Nombre de la colección
 */
export const getService = async (uid: string, collectionName: string) => {
  try {
    const collectionRef = collection(db, 'users', uid, collectionName);
    const collectionSnapshot = await getDocs(collectionRef);

    const collectionData = collectionSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return collectionData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
