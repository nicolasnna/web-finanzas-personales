import CardContainer from '@/components/CardContainer';
import CardInfo from '@/components/CardInfo';
import CategoryForm from '@/components/Form/CategoryForm';
import ChartArea from '@/components/ChartArea';
import ChartPie from '@/components/ChartPie';
import TransactionForm from '@/components/Form/TransactionForm';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { RawResumeTransaction, usePieChartData } from '@/hooks/usePieChartData';
import { toast } from 'sonner';
import { getResumeTransactionByCategory } from '@/api/resumes';
import { RawResumeTransactionByMonth, UseAreaChartData } from '@/hooks/useAreaChartData';

interface ListInfoProps {
  title: string;
  value: number;
  currency: 'CLP' | undefined;
  info: string;
  status: 'increment' | 'decrement' | undefined
}

function Dashboard() {
  const [listInfo, setListInfo] = useState<ListInfoProps[]>([
    {
      title: 'Mayor ingreso del mes',
      value: 800000,
      currency: 'CLP',
      info: 'Sueldo mayo',
      status: undefined
    },
    {
      title: 'Mayor Gasto del mes',
      value: 300000,
      currency: 'CLP',
      info: 'Compra celular',
      status: undefined
    },
    {
      title: 'Resultado neto del mes',
      value: -2000000,
      currency: 'CLP',
      info: 'Ingreso neto',
      status: 'decrement'
    },
  ]);
  const dataPieIncomes = usePieChartData()
  const dataPieExpenses = usePieChartData()
  const dataAreaChart = UseAreaChartData()
  const user = useContext(AuthContext)

  useEffect(() => {
    const fetchAllSummary = async () => {
      if (!user.token) return
      try {
        const [resInc, resExp, resMonthInc] = await Promise.all([
          getResumeTransactionByCategory(user.token, 'incomes', 2025, 'category', 6),
          getResumeTransactionByCategory(user.token, 'expenses', 2025, 'category', 6),
          getResumeTransactionByCategory(user.token, 'incomes', 2025, 'categoryByMonth')
        ])
        dataPieIncomes.setDataRaw(resInc as RawResumeTransaction)
        dataPieExpenses.setDataRaw(resExp as RawResumeTransaction)
        dataAreaChart.setRawIncome(resMonthInc as RawResumeTransactionByMonth)
        toast.success('Resumenes cargados')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message || 'Error al cargar el resumen')
        user.updateToken()
      }
    }
    
    fetchAllSummary()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token])
  
  return (
    <div className="mx-5 xl:mx-[250px] my-10 flex flex-col gap-5">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listInfo.map((l) => (
          <CardInfo
            key={l.info}
            title={l.title}
            value={l.value}
            currency={l.currency}
            info={l.info}
            status={l.status}
          />
        ))}
      </section>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-5 h-full">
        <ChartArea 
          title='Tendencia mensual - año 2025'
          className='col-span-2 row-span-2 flex flex-col justify-around'
        />
        <ChartPie
          title='Ingreso por categoría'
          className='col-span-2 md:col-span-1 row-span-1'
          chartConfig={dataPieIncomes.config}
          chartData={dataPieIncomes.data}
        />
        <ChartPie
          title='Gasto por categoría'
          className='col-span-2 md:col-span-1 row-span-1'
          chartConfig={dataPieExpenses.config}
          chartData={dataPieExpenses.data}
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
