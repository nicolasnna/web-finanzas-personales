import { CollectionName, TransactionName } from "@/types/CollectionName.type";
import { getFilterYearMonthService } from "./db.service";

export const getResumeCategoryService = async (
  uid: string,
  collectionName: CollectionName,
  year?: number,
  month?: number,
) => {
  const transactionArray = await getFilterYearMonthService(uid, collectionName, year, month)

  const categoryTotals: Record<string, number> = {}

  transactionArray.forEach(el => {
    const category = el.category ?? "Sin categoria";
    categoryTotals[category] = (categoryTotals[category] ?? 0) + el.value;
  })

  return categoryTotals
}

export const getResumeCategoryPerMonthService = async (
  uid: string,
  collectionName: CollectionName,
  year: number
) => {
  const categoryTotalPerMonth: Record<string, Record<string, number>> = {};

  for (let month = 0; month < 12; month++) {
    categoryTotalPerMonth[month] = {};
    const transactions = await getFilterYearMonthService(uid, collectionName, 200, year, month);
    for (const tx of transactions) {
      const cat = tx.category ?? "Sin categoria";
      categoryTotalPerMonth[month][cat] = (categoryTotalPerMonth[month][cat] ?? 0) + tx.value;
    }
  }
  return categoryTotalPerMonth;
}

export const getResumePerMonthService = async (
  uid: string,
  collectionName: TransactionName,
  year: number
) => {
  const totalPerMonth: Record<string, number> = {};
  for (let month = 0; month < 12; month++) {
    totalPerMonth[String(month)] = 0;
    const transactions = await getFilterYearMonthService(uid, collectionName, 500, year, month);
    for (const tx of transactions) {
      totalPerMonth[String(month)] += tx.value;
    }
  }

  return totalPerMonth
}