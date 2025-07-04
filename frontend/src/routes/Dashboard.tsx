import CardContainer from '@/components/Cards/CardContainer';
import CardInfo from '@/components/Cards/CardInfo';
import CategoryForm from '@/components/Form/CategoryForm';
import ChartArea from '@/components/ChartArea';
import ChartPie from '@/components/ChartPie';
import TransactionForm from '@/components/Form/TransactionForm';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { RawResumeTransaction, usePieChartData } from '@/hooks/usePieChartData';
import { toast } from 'sonner';
import { getResumeTransactionByCategory, getResumeTransactionByMonth } from '@/api/resumes';
import { RawResumeTransactionByMonth, UseAreaChartData } from '@/hooks/useAreaChartData';
import { TopTransactionCard } from '@/components/Cards/TopTransactionCard';
import { NetTransactionCard } from '@/components/Cards/NetTransactionCard';
import { months } from '@/utils/constants';

function Dashboard() {
  const [month, setMonth] = useState<number>(new Date(Date.now()).getMonth() + 1)
  const dataPieIncomes = usePieChartData()
  const dataPieExpenses = usePieChartData()
  const dataAreaChart = UseAreaChartData()
  const user = useContext(AuthContext)

  useEffect(() => {
    const fetchAllSummary = async () => {
      if (!user.token) return
      try {
        const [resInc, resExp, resMonthInc, resMonthExp] = await Promise.all([
          getResumeTransactionByCategory(user.token, 'incomes', 2025, 'category', month),
          getResumeTransactionByCategory(user.token, 'expenses', 2025, 'category', month),
          getResumeTransactionByMonth(user.token, 'incomes', 2025),
          getResumeTransactionByMonth(user.token, 'expenses', 2025)
        ])
        dataPieIncomes.setDataRaw(resInc as RawResumeTransaction)
        dataPieExpenses.setDataRaw(resExp as RawResumeTransaction)
        dataAreaChart.setRawIncome(resMonthInc.data as RawResumeTransactionByMonth)
        dataAreaChart.setRawExpense(resMonthExp.data as RawResumeTransactionByMonth)
        toast.success('Resumenes cargados')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message || 'Error al cargar el resumen')
        user.updateToken()
      }
    }
    
    fetchAllSummary()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token, month])
  
  const handleClickAreaChart = (e: {activeTooltipIndex: number}) => {
    if (Object.keys(e).length === 0) return 
    setMonth(() => e.activeTooltipIndex + 1)
  }

  return (
    <div className="mx-5 xl:mx-[250px] my-10 flex flex-col gap-5">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <TopTransactionCard type='incomes'/>
        <TopTransactionCard type='expenses' />
        <NetTransactionCard/>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-5 h-full">
        <ChartArea 
          title='Tendencia mensual - año 2025'
          className='col-span-2 row-span-2 flex flex-col justify-around'
          data={dataAreaChart.data}
          chartConfig={dataAreaChart.config}
          onClickHandle={handleClickAreaChart}
        />
        <ChartPie
          title='Ingreso por categoría'
          className='col-span-2 md:col-span-1 row-span-1'
          chartConfig={dataPieIncomes.config}
          chartData={dataPieIncomes.data}
          month={months[month-1]}
        />
        <ChartPie
          title='Gasto por categoría'
          className='col-span-2 md:col-span-1 row-span-1'
          chartConfig={dataPieExpenses.config}
          chartData={dataPieExpenses.data}
          month={months[month-1]}
        />
      </section>
      <section className='grid md:grid-cols-3 z-10 gap-5'>
        <CardContainer
          title='Registrar nueva categoría'
          className='space-y-1'
          classNameHeader='pt-4'
          classNameBody='pb-2'
        >
          <CategoryForm/>
        </CardContainer>
        <CardContainer
          title='Registrar nueva transacción'
          className='md:col-span-2'
          classNameHeader='pt-4'
          classNameBody='pb-4'
        >
          <TransactionForm/>
        </CardContainer>
      </section>
    </div>
  );
}

export default Dashboard;
