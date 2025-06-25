import CardInfo from '@/components/CardInfo';
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
    <div className="lg:mx-[250px] my-10">
      <section className="grid grid-cols-3 gap-5 ">
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
    </div>
  );
}

export default Dashboard;
