import { useMemo, useState } from 'react';

export interface RawResumeTransactionByMonth {
  [month: number]: {
    [category: string]: number;
  };
}

export function UseAreaChartData() {
  const [rawIncome, setRawIncome] = useState<RawResumeTransactionByMonth>({});
  const [rawExpense, setRawExpense] = useState<RawResumeTransactionByMonth>({});

  const AreaData = useMemo(() => {
    const months = Object.keys(rawIncome || rawExpense);
    const incomes = months.map((m) => ({
      [m]: Object.values(rawIncome[m] || {}).reduce((acc, value) => acc + value, 0),
    }));

    // console.log(incomes)
  }, [rawIncome, rawExpense]);

  return {setRawExpense, setRawIncome}
}
