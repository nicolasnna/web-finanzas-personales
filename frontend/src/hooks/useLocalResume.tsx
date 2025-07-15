import { useExpensesStore, useIncomesStore } from "@/store/useTransactionStore";
import { useMemo } from "react";
import { RawResumeTransactionByMonth } from "./useAreaChartData";

export function useLocalResume(year: number) {
  const incomes = useIncomesStore(s => s.transactions)
  const expenses = useExpensesStore(s => s.transactions)

  const rawIncomeByMonth = useMemo(() => {
    const resume: RawResumeTransactionByMonth = {}
    for (let m = 1; m <= 12; m++ ) {
      resume[m] = 0
    }
    incomes.forEach(t => {
      const month = new Date(t.date).getMonth() +1
      if (new Date(t.date).getFullYear() === year)
        resume[month] = resume[month] + t.value
    })
    return resume
  }, [incomes, year])

  const rawExpenseByMonth = useMemo(() => {
    const resume: RawResumeTransactionByMonth = {}
    for (let m = 1; m <= 12; m++ ) {
      resume[m] = 0
    }
    expenses.forEach(t => {
      const month = new Date(t.date).getMonth() +1
      if (new Date(t.date).getFullYear() === year)
        resume[month] = resume[month] + t.value
    })
    return resume
  }, [expenses, year])

  return {
    rawIncomeByMonth,
    rawExpenseByMonth
  }
}