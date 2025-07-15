import { CollectionName, TransactionName } from "../types/CollectionName.type";
import { getFilterYearMonthService, getTotalDocuments } from "./db.service";

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

  for (let month = 1; month <= 12; month++) {
    categoryTotalPerMonth[month] = {};
    const transactions = await getFilterYearMonthService(uid, collectionName, year, month, 200);
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
  for (let month = 1; month <= 12; month++) {
    totalPerMonth[String(month)] = 0;
    const transactions = await getFilterYearMonthService(uid, collectionName, year, month, 500);
    for (const tx of transactions) {
      totalPerMonth[String(month)] += tx.value;
    }
  }

  return totalPerMonth
}

export const getTotalCountForUserService = async (uid: string) => {
  const collections : CollectionName[] = [
    'incomes',
    'expenses',
    'categoryIncomes',
    'categoryExpenses'
  ]
  const results = await Promise.all(
    collections.map(col => getTotalDocuments(uid, col))
  )
  return {
    incomes: results[0],
    expenses: results[1],
    categoryIncomes: results[2],
    categoryExpenses: results[3]
  }
}