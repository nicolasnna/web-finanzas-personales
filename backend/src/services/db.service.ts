import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { TransactionData } from '@/types/TransactionData.interface';
import { Category } from '@/types/category.interface';

export const getService = async (uid: string, collectionName: string) => {
  try {
    const collectionRef = collection(db, 'users', uid, collectionName);
    const collectionSnapshot = await getDocs(collectionRef);

    const collectionData = collectionSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return collectionData;
  } catch (error: any) {
    throw error;
  }
}

export const createService = async (uid: string, data: TransactionData, collectionName: string) => {
  try {
    const collectionRef = collection(db, 'users', uid, collectionName);
    const doc = await addDoc(collectionRef, data);
    return doc;
  } catch (error: any) {
    throw error;
  }
}

export const createCategoryService = async (uid: string, data: Category, collectionName: string) => {
  try {
    const collectionRef = collection(db, 'users', uid, collectionName);
    const collectionSnapshot = await getDocs(collectionRef)
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

export const updateService = async <T>(uid: string, collectionName: string, docId: string, data: Partial<T>) => {
  try {
    const documentRef = doc(db, 'users', uid, collectionName, docId)

    const { id, ...payload } = data as { id?: string } & Partial<T>;
    
    await updateDoc(documentRef, payload);

    const newDocument = await getDoc(documentRef)

    return newDocument;
  } catch (e: any) {
    throw e;
  }
}

export const deleteService = async (uid: string, collectionName: string, docId: string) => {
  try {
    const documentRef = doc(db, 'users', uid, collectionName, docId)

    const getDocument = await getDoc(documentRef)
    await deleteDoc(documentRef)

    return getDocument
  } catch (e: any) {
    throw e
  }
}

export const getResumeService = async (uid: string, collectionName: string, year?: number, month?: number) => {
  const transactionRef = collection(db, 'users', uid, collectionName)
  let q

  // Sin filtros
  if (!year) {
    q = query(transactionRef, orderBy('date'));
  } else {
    const start = new Date(year, (month ?? 1) - 1, 1);
    const end = month !== undefined
      ? new Date(year, month, 1)  //Sgte mes
      : new Date(year + 1, 0, 1)  //Sgte año
    
    q = query(
      transactionRef,
      where('date', '>=', start),
      where('date', '<=', end),
      orderBy('date')
    )
  }

  const snapshot = await getDocs(q)
  const docs = snapshot.docs.map(doc => doc.data());

  return docs
} 