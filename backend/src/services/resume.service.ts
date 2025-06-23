import { CollectionName } from "@/types/CollectionName.type";
import { getFilterYearMonthService } from "./db.service";
import { months } from "@/utils/constants";

export const getResumeCategoryService = async (
  uid: string,
  collectionName: CollectionName,
  year?: number,
  month?: number,
) => {
  try {
    const transactionArray = await getFilterYearMonthService(uid, collectionName, year, month)

    const categoryTotals: Record<string, number> = {}

    transactionArray.forEach(el => {
      const category = el.category ?? "Sin categoria";
      categoryTotals[category] = (categoryTotals[category] ?? 0) + el.value;
    })

    return categoryTotals

  } catch (error) {
    throw error
  }
}

export const getResumeCategoryPerMonthService = async (
  uid: string,
  collectionName: CollectionName,
  year: number
) => {
  try {
    const transactionArray = await getFilterYearMonthService(uid, collectionName, year)

    const categoryTotalPerMonth: Record<string, Record<string, number>> = {}
    months.forEach(m => {
      categoryTotalPerMonth[m] = {}
    })

    transactionArray.forEach(data => {
      const category = data.category ?? "Sin categoria"
      const monthNumber = new Date(data.date).getMonth()
      const monthText = months[monthNumber]
      categoryTotalPerMonth[monthText][category] = (categoryTotalPerMonth[monthText][category] ?? 0) + data.value 
    })
    return categoryTotalPerMonth
  } catch (error) {
    throw error
  }
}