import { getResumeTransactionByCategory, getResumeTransactionByMonth } from '@/api/resumes';
import CardContainer from '@/components/Cards/CardContainer';
import { CardNetTransaction } from '@/components/Cards/CardNetTransaction';
import { CardTopTransaction } from '@/components/Cards/CardTopTransaction';
import ChartArea from '@/components/ChartArea';
import ChartPie from '@/components/ChartPie';
import CategoryForm from '@/components/Form/CategoryForm';
import TransactionForm from '@/components/Form/TransactionForm';
import { AuthContext } from '@/context/authContext';
import { UseAreaChartData } from '@/hooks/useAreaChartData';
import { useLocalResume } from '@/hooks/useLocalResume';
import { RawResumeTransaction, usePieChartData } from '@/hooks/usePieChartData';
import { months } from '@/utils/constants';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

function Dashboard() {
  const [month, setMonth] = useState<number>(new Date(Date.now()).getMonth() + 1)
  const [year, setYear] = useState<number>(new Date(Date.now()).getFullYear())
  const [disable, setDisable] = useState<boolean>(false)
  const [disableArea, setDisableArea] = useState<boolean>(false)
  const dataPieIncomes = usePieChartData()
  const dataPieExpenses = usePieChartData()
  const dataAreaChart = UseAreaChartData()
  const user = useContext(AuthContext)
  const localResumes = useLocalResume(year)

  useEffect(() => {
    const fetchAllSummary = async () => {
      if (!user.token) return
      try {
        setDisable(() => true)
        const [resInc, resExp] = await Promise.all([
          getResumeTransactionByCategory(user.token, 'incomes', year, 'category', month),
          getResumeTransactionByCategory(user.token, 'expenses', year, 'category', month),
        ])
        dataPieIncomes.setDataRaw(resInc as RawResumeTransaction)
        dataPieExpenses.setDataRaw(resExp as RawResumeTransaction)
        toast.success('Resumenes cargados')
        setDisable(() => false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message || 'Error al cargar el resumen')
        user.updateToken()
      }
    }
    fetchAllSummary()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token, month, year])
  
  useEffect(() => {
    const fetchArea = async () => {
      if (!user.token) return
      try {
        setDisableArea(() => true)
        const [resMonthInc, resMonthExp] = await Promise.all([
          getResumeTransactionByMonth(user.token, 'incomes', year),
          getResumeTransactionByMonth(user.token, 'expenses', year)
        ])
        dataAreaChart.setRawIncome(resMonthInc.data)
        dataAreaChart.setRawExpense(resMonthExp.data)
      } catch {
        user.updateToken()
      }
      setDisableArea(() => false)
    }
    fetchArea()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token, year])

  useEffect(() => {
    if (user.token) return
    dataAreaChart.setRawIncome(localResumes.rawIncomeByMonth)
    dataAreaChart.setRawExpense(localResumes.rawExpenseByMonth)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token, localResumes.rawExpenseByMonth, localResumes.rawIncomeByMonth])

  const handleClickAreaChart = (e: {activeTooltipIndex: number}) => {
    if (Object.keys(e).length === 0) return 
    setMonth(() => e.activeTooltipIndex + 1)
  }

  return (
    <div className="mx-5 xl:mx-[250px] my-10 flex flex-col gap-5">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CardTopTransaction type='incomes' month={month} year={year}/>
        <CardTopTransaction type='expenses' month={month} year={year}/>
        <CardNetTransaction
          value={dataAreaChart.rawIncome[month] - dataAreaChart.rawExpense[month]}
          month={month}
        />
      </section>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-5 h-full">
        <ChartArea 
          title={`Tendencia mensual - año ${year}`}
          className={`col-span-2 row-span-2 flex flex-col justify-around ${disable ? 'opacity-40': ''}`}
          data={dataAreaChart.data}
          chartConfig={dataAreaChart.config}
          onClickHandle={handleClickAreaChart}
          footer={<p className='italic'>*Seleccione un mes para ajustar los gráficos y la información destacada</p>}
          handleArrowLeft={() => !disableArea && setYear((prev) => prev-1)}
          handleArrowRight={() => !disableArea && setYear((prev) => prev+1)}
        />
        <ChartPie
          title='Ingreso por categoría*'
          className={`col-span-2 md:col-span-1 row-span-1 ${disable ? 'opacity-30 cursor-wait' : ''}`}
          chartConfig={dataPieIncomes.config}
          chartData={dataPieIncomes.data}
          month={months[month-1]}
        />
        <ChartPie
          title='Gasto por categoría*'
          className={`col-span-2 md:col-span-1 row-span-1 ${disable ? 'opacity-30 cursor-wait' : ''}`}
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
