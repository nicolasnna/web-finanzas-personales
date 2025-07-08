import { RawResumeTransactionByMonth } from "@/hooks/useAreaChartData"

export interface error {
  error: string
}

export interface ErrorAPI {
  message: string
}

export interface RawResumeTransactionByMonthAPI {
  data: RawResumeTransactionByMonth
}

export interface TotalCountsAPI {
  incomes: number,
  expenses: number,
  categoryIncomes: number,
  categoryExpenses: number,
}