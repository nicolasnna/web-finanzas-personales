import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  limit,
  startAfter,
  startAt,
  Timestamp,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { TransactionData } from "@/types/TransactionData.interface";
import { Category } from "@/types/category.interface";
import { CollectionName, TransactionName } from "@/types/CollectionName.type";


const transformDocumentToDataTransaction = (docSnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
  return docSnapshot.docs.map((doc) => {
    const data = doc.data() as TransactionData;
    let date;

    if (data.date instanceof Timestamp) {
      date = data.date.toDate().toISOString();
    } else if (typeof data.date === "string") {
      date = new Date(data.date).toISOString();
    } else {
      date = null; // o undefined, o algún valor por defecto
    }

    return {id: doc.id, ...data, date: date}
  })
}

export const getService = async (
  uid: string,
  collectionName: CollectionName
) => {
  const collectionRef = collection(db, "users", uid, collectionName);
  const collectionSnapshot = await getDocs(collectionRef);

  return transformDocumentToDataTransaction(collectionSnapshot)
};

export const getTransactionService = async (
  uid: string,
  collectionName: CollectionName,
  limitDoc?: number,
  afterDate?: Date,
  atDate?: Date,
  order: "asc" | "desc" = "desc"
) => {
  if (afterDate && !(afterDate instanceof Date)) {
    throw new Error("afterDate debe ser un tipo Date valido");
  }

  if (atDate && !(atDate instanceof Date)) {
    throw new Error("atDate debe ser un tipo Date valido");
  }

  const collectionRef = collection(db, "users", uid, collectionName);
  let q;

  if (afterDate) {
    q = query(
      collectionRef,
      orderBy("date", order),
      startAfter(afterDate),
      limit(limitDoc ?? 200)
    );
  } else if (atDate) {
    q = query(
      collectionRef,
      orderBy("date", order),
      startAt(atDate),
      limit(limitDoc ?? 200)
    );
  } else {
    q = query(collectionRef, orderBy("date", order), limit(limitDoc ?? 200));
  }

  const collectionSnapshot = await getDocs(q);

  return transformDocumentToDataTransaction(collectionSnapshot)
};

export const createService = async (
  uid: string,
  data: TransactionData,
  collectionName: CollectionName
) => {
  const collectionRef = collection(db, "users", uid, collectionName);
  const dataRevised = {...data, date: Timestamp.fromDate(new Date(data.date))}
  const newDocRef = await addDoc(collectionRef, dataRevised);
  return { id: newDocRef.id, ...dataRevised };
};

export const createCategoryService = async (
  uid: string,
  data: Category,
  collectionName: CollectionName
) => {
  const collectionRef = collection(db, "users", uid, collectionName);
  const collectionSnapshot = await getDocs(collectionRef);
  const exist = collectionSnapshot.docs.some(
    (items) =>
      items.data().category.toLowerCase() == data.category.toLowerCase()
  );
  if (!exist) {
    const doc = await addDoc(collectionRef, data);
    return { id: doc.id, ...data };
  } else {
    throw new Error(`La categoria ${data.category} ya se encuentra creada.`);
  }
};

export const updateService = async <T>(
  uid: string,
  collectionName: CollectionName,
  docId: string,
  data: Partial<T>
) => {
  try {
    const documentRef = doc(db, "users", uid, collectionName, docId);

    const { id, ...payload } = data as { id?: string } & Partial<T>;

    await updateDoc(documentRef, payload);

    const newDocument = await getDoc(documentRef);

    if (!newDocument.exists()) {
      throw new Error("No existe el documento");
    }

    return { id: newDocument.id, ...newDocument.data() };
  } catch (e: any) {
    throw e;
  }
};

export const deleteService = async (
  uid: string,
  collectionName: CollectionName,
  docId: string
) => {
  try {
    const documentRef = doc(db, "users", uid, collectionName, docId);

    const getDocument = await getDoc(documentRef);
    const snapshot = getDocument.exists()
      ? { id: getDocument.id, ...getDocument.data() }
      : null;
    await deleteDoc(documentRef);

    return snapshot;
  } catch (e: any) {
    throw e;
  }
};

export const getFilterYearMonthService = async (
  uid: string,
  collectionName: CollectionName,
  limitValue?: number,
  year?: number,
  month?: number,
) => {
  if (
    collectionName === "categoryExpenses" ||
    collectionName === "categoryIncomes"
  )
    throw new Error("El servicio solo esta disponible para incomes y expenses");

  const transactionRef = collection(db, "users", uid, collectionName);
  let q;

  // Sin filtros
  if (!year) {
    q = query(transactionRef, limit(limitValue ?? 200), orderBy("date"));
  } else {
    const start = new Date(year, (month ?? 1) - 1, 1);
    const end =
      month !== undefined
        ? new Date(year, month, 1) //Sgte mes
        : new Date(year + 1, 0, 1); //Sgte año
    q = query(
      transactionRef,
      where("date", ">=", start),
      where("date", "<=", end),
      orderBy("date")
    );
  }

  const snapshot = await getDocs(q);
  const docs = transformDocumentToDataTransaction(snapshot);

  return docs;
};

export const getFilterMostValueService = async (
  uid: string,
  collectionName: CollectionName,
  order: 'asc' | 'desc' = 'desc',
  limitValue: number = 5,
  year?: number,
  month?: number
) => {
  if (
    collectionName === "categoryExpenses" ||
    collectionName === "categoryIncomes"
  )
    throw new Error("El servicio solo esta disponible para incomes y expenses");

  const transactionRef = collection(db, "users", uid, collectionName);
  
  let q;

  if (!year) {
    q = query(transactionRef, orderBy("value", order), limit(limitValue));
  } else {
    const start = new Date(year, (month ?? 1) - 1, 1);
    const end =
      month !== undefined
        ? new Date(year, month, 1) //Sgte mes
        : new Date(year + 1, 0, 1); //Sgte año

    q = query(
      transactionRef,
      where("date", ">=", start),
      where("date", "<=", end),
      orderBy("value", order),
      limit(limitValue)
    );
  }

  const snapshot = await getDocs(q);
  const docs = transformDocumentToDataTransaction(snapshot);

  return docs;
};
