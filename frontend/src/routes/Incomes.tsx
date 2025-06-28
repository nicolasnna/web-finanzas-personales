import CardInfo from '@/components/CardInfo';
import FinancialChartBar from '@/components/FinancialChartBarPREV';
import FinancialChartPie from '@/components/FinancialChartPiePREV';
import FinancialForm from '@/components/FinancialForm';
import FinancialTable from '@/components/FinancialTable';
import Header from '@/components/Header';
import { addCategoryIncomeDb } from '@/api/dbCategoryIncomes';
import { addIncomeDb } from '@/api/dbIncomes';
import { useIncomeStore } from '@/store/useBalanceStore';
import { resumeForCategoryInterface } from '@/types';
import { resumeBalance } from '@/utils/functions';
import { useMemo } from 'react';

const Incomes = () => {
  const incomeRows = useIncomeStore((state) => state.balanceRows);
  const categories = useIncomeStore((state) => state.categories);

  const resume = useMemo(() => {
    return resumeBalance(incomeRows, categories);
  }, [incomeRows, categories]);

  const sortValueForCategory = (a: resumeForCategoryInterface, b: resumeForCategoryInterface) => {
    if (a.value < b.value) {
      return 1
    } else if (a.value > b.value) {
      return -1
    }
    return 0
  }

  const higherCategory = useMemo(() => {
    const topValue = [...resume.resumeForCategory]
    topValue.sort(sortValueForCategory)
    return topValue[0]
  }, [resume])

  const lastMonthYear = useMemo(() => {
    if (resume.lastYear && resume.lastMonth) {
      return resume.resumeForYearMonth[resume.lastYear][resume.lastMonth]
    } 
    return 0
  }, [resume])

  return (
    <div className="flex flex-col items-center justify-center space-y-9 box-border px-3">
      <Header text="Registro de ingresos" />
      <section className='z-20 flex gap-4 flex-wrap'>
        <CardInfo title='Total de ingresos' value={resume.total} currency='CLP'/>
        <CardInfo title='Categoría destacada' value={higherCategory.value} currency='CLP' info={higherCategory.category}/>
        <CardInfo title='Último mes' value={lastMonthYear} currency='CLP' info={`${resume.lastMonth} del ${resume.lastYear}`}/>
      </section>

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
