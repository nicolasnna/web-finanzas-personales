import { useMemo, useState } from 'react';

export interface RawResumeTransactionByMonth {
  [month: number]: number
}

export function UseAreaChartData() {
  const [rawIncome, setRawIncome] = useState<RawResumeTransactionByMonth>({});
  const [rawExpense, setRawExpense] = useState<RawResumeTransactionByMonth>({});

  const AreaData = useMemo(() => {
    const months = Object.keys(rawIncome || rawExpense);
    console.log(rawIncome)
    // console.log(incomes)
  }, [rawIncome, rawExpense]);

  return {setRawExpense, setRawIncome}
}
