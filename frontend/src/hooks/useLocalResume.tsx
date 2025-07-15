import { useExpensesStore, useIncomesStore } from '@/store/useTransactionStore';
import { useMemo } from 'react';
import { RawResumeTransactionByMonth } from './useAreaChartData';
import { RawResumeTransaction } from './usePieChartData';
import { Transaction } from '@/types';

export function useLocalResume(year: number, month: number) {
  const incomes = useIncomesStore((s) => s.transactions);
  const expenses = useExpensesStore((s) => s.transactions);

  const rawFunctionByMonth = (transaction: Transaction[], year: number) => {
    const resume: RawResumeTransactionByMonth = {};
    for (let m = 1; m <= 12; m++) {
      resume[m] = 0;
    }
    transaction.forEach((t) => {
      const month = new Date(t.date).getMonth() + 1;
      if (new Date(t.date).getFullYear() === year)
        resume[month] = resume[month] + t.value;
    });
    return resume;
  };

  const rawIncomeByMonth = useMemo(
    () => rawFunctionByMonth(incomes, year),
    [incomes, year]
  );

  const rawExpenseByMonth = useMemo(
    () => rawFunctionByMonth(expenses, year),
    [expenses, year]
  );

  const rawFunctionByCategory = (
    transaction: Transaction[],
    year: number,
    month: number
  ) => {
    const resume: RawResumeTransaction = {};
    const filtered = transaction.filter(
      (t) =>
        new Date(t.date).getFullYear() === year &&
        new Date(t.date).getMonth() + 1 === month
    );
    if (filtered.length === 0) return resume;

    filtered.forEach((f) => {
      if (!resume[f.category])
        resume[f.category] = 0
      resume[f.category] = resume[f.category] + f.value;
    });

    return resume;
  };

  const rawIncomeByCategory = useMemo(
    () => rawFunctionByCategory(incomes, year, month),
    [incomes, year, month]
  );

  const rawExpenseByCategory = useMemo(
    () => rawFunctionByCategory(expenses, year, month),
    [expenses, year, month]
  );

  return {
    rawIncomeByMonth,
    rawExpenseByMonth,
    rawIncomeByCategory,
    rawExpenseByCategory,
  };
}
