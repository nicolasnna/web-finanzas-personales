import CardInfo from '@/components/CardInfo';
import FinancialChartBar from '@/components/FinancialChartBar';
import FinancialChartPie from '@/components/FinancialChartPie';
import FinancialForm from '@/components/FinancialForm';
import FinancialTable from '@/components/FinancialTable';
import Header from '@/components/Header';
import { addCategoryIncomeDb } from '@/services/dbCategoryIncomes';
import { addIncomeDb } from '@/services/dbIncomes';
import { useIncomeStore } from '@/store/useBalanceStore';
import { resumeBalance } from '@/utils/functions';
import { useMemo } from 'react';

const Incomes = () => {
  const incomeRows = useIncomeStore((state) => state.balanceRows);
  const categories = useIncomeStore((state) => state.categories);

  const resume = useMemo(() => {
    return resumeBalance(incomeRows, categories);
  }, [incomeRows, categories]);

  // const higherCategory

  return (
    <div className="flex flex-col items-center justify-center space-y-9 box-border px-3">
      <Header text="Registro de ingresos" />
      <div className='z-20'>
        <CardInfo title='Total de ingresos' value={resume.total} currency='CLP'/>
      </div>

      <div className='flex w-full flex-wrap justify-center items-center gap-10 px-4 z-10'>
        <div className='w-[700px]'>
          <FinancialChartBar data={resume} />
        </div>
        <div className='w-[400px]'>
          <FinancialChartPie data={resume} />
        </div>
      </div>
      <section className="flex justify-center w-full gap-10 flex-wrap px-5">
        <FinancialTable title="Lista de ingresos" content={incomeRows} />
        <FinancialForm
          title="Añade un nuevo ingreso"
          {...useIncomeStore()}
          addCategoryDb={addCategoryIncomeDb}
          addDb={addIncomeDb}
        />
      </section>
    </div>
  );
};

export default Incomes;
