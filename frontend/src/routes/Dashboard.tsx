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
  const localResumes = useLocalResume(year, month)

  useEffect(() => {
    if (!user.token) {
      dataAreaChart.setRawIncome(localResumes.rawIncomeByMonth);
      dataAreaChart.setRawExpense(localResumes.rawExpenseByMonth);
      dataPieIncomes.setDataRaw(localResumes.rawIncomeByCategory);
      dataPieExpenses.setDataRaw(localResumes.rawExpenseByCategory);
      return;
    }

    const fetchAll = async () => {
      setDisable(true);
      try {
        setDisableArea(() => true)
        const [catInc, catExp, monthInc, monthExp] = await Promise.all([
          getResumeTransactionByCategory(user.token as string, 'incomes', year, 'category', month),
          getResumeTransactionByCategory(user.token as string, 'expenses', year, 'category', month),
          getResumeTransactionByMonth(user.token as string, 'incomes', year),
          getResumeTransactionByMonth(user.token as string, 'expenses', year),
        ]);
        dataPieIncomes.setDataRaw(catInc as RawResumeTransaction);
        dataPieExpenses.setDataRaw(catExp as RawResumeTransaction);
        dataAreaChart.setRawIncome(monthInc.data);
        dataAreaChart.setRawExpense(monthExp.data);
        toast.success('Datos cargados correctamente');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message || 'Error al cargar el resumen');
        user.updateToken();
      } finally {
        setDisable(false);
        setDisableArea(() => false)
      }
    };

    fetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token, month, year, localResumes.rawExpenseByCategory]);

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
