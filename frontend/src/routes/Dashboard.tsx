import CardInfo from '@/components/CardInfo';
import FinancialChartArea from '@/components/FinancialChartArea';
import { useState } from 'react';

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

  return (
    <div className="mx-5 lg:mx-[200px] my-10 flex flex-col gap-10">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {listInfo.map((l) => (
          <CardInfo
            title={l.title}
            value={l.value}
            currency={l.currency}
            info={l.info}
            status={l.status}
          />
        ))}
      </section>
      <section className="grid grid-cols-3 gap-10">
        <FinancialChartArea className='col-span-2'/>
      </section>
    </div>
  );
}

export default Dashboard;
