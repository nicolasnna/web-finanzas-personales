import CardContainer from '@/components/CardContainer';
import CardInfo from '@/components/CardInfo';
import CategoryForm from '@/components/CategoryForm';
import ChartArea from '@/components/ChartArea';
import ChartPie from '@/components/ChartPie';
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
    <div className="mx-5 lg:mx-[250px] my-10 flex flex-col gap-5">
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
      <section className="grid grid-cols-3 gap-5 h-full">
        <ChartArea 
          title='Tendencia mensual - año 2025'
          className='col-span-2 row-span-2 flex flex-col justify-around'
        />
        <ChartPie
          title='Ingreso por categoría'
          className='col-span-1 row-span-1'
        />
        <ChartPie
          title='Gasto por categoría'
          className='col-span-1 row-span-1'
        />
      </section>
      <section className='grid grid-cols-3 z-10'>
        <CardContainer
          title='Registrar nueva categoría'
          className='space-y-1'
          classNameHeader='pt-4'
          classNameBody='pb-4'
        >
          <CategoryForm/>
        </CardContainer>
      </section>
    </div>
  );
}

export default Dashboard;
