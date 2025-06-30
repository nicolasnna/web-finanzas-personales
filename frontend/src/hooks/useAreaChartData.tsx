import { COLORS, months } from '@/utils/constants';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface RawResumeTransactionByMonth {
  [month: number]: number
}

export function UseAreaChartData() {
  const [rawIncome, setRawIncome] = useState<RawResumeTransactionByMonth>({});
  const [rawExpense, setRawExpense] = useState<RawResumeTransactionByMonth>({});

  const AreaData = useMemo(() => {
    if (
      Object.keys(rawIncome).length === 0 ||
      Object.keys(rawExpense).length === 0
    ) {
      return { data: [] as { month: string; incomes: number; expenses: number }[], config: {} };
    }

    const dataEx = months.map((m, index) => ({month: m, incomes: rawIncome[index], expenses: rawExpense[index]}))

    const configChart = {
        incomes: {
        label: 'Ingresos',
        color: COLORS.INCOMES,
        icon: TrendingUp,
      },
      expenses: {
        label: 'Egresos',
        color: COLORS.EXPENSES,
        icon: TrendingDown,
      }
    }

    return {data: dataEx, config: configChart}
  }, [rawIncome, rawExpense]);

  return {setRawExpense, setRawIncome, data: AreaData.data, config: AreaData.config}
}
