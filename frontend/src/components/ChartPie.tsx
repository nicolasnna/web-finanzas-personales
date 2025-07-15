import { DataChartPie } from '@/types/DataChart.interface';
import { formatNumber } from '@/utils/functions';
import { HTMLProps, useContext, useEffect, useMemo, useState } from 'react';
import { Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import CardContainer from './Cards/CardContainer';
import { ChartConfig, ChartContainer } from './ui/chart';
import { AuthContext } from '@/context/authContext';

interface ChartPieProps {
  className?: HTMLProps<HTMLElement>["className"]
  title?: string
  month?: string
  year?: number
  chartConfig?: ChartConfig
  chartData?: DataChartPie[]
}

const exampleChartConfig = {
  value: {
    label: 'Cantidad',
  },
  category1: {
    label: 'Categoria 1',
  },
  category2: {
    label: 'Categoria 2',
  },
  category3: {
    label: 'Categoria 3',
  },
  category4: {
    label: 'Categoria 4',
  },
  category5: {
    label: 'Categoria 5',
  },
} satisfies ChartConfig;

const exampleChartData = [
  { category: "categoria1", value: 50000, fill: "hsl(var(--chart-1))" },
  { category: "categoria2", value: 5000, fill: "hsl(var(--chart-2))" },
  { category: "categoria3", value: 15000, fill: "hsl(var(--chart-3))" },
  { category: "categoria4", value: 32000, fill: "hsl(var(--chart-4))" },
  { category: "categoria5", value: 55000, fill: "hsl(var(--chart-5))" },
] 

function ChartPie({className, title, month, year, chartConfig, chartData} : ChartPieProps) {
  const token = useContext(AuthContext).token
  const chartDataToUse = useMemo(() => {
    if (token) return chartData ?? [] // En caso de estar el usuario logeado
    return chartData?.length ? chartData : []
  }, [chartData, token])
  const configToUse = useMemo(() => {
    return chartConfig && Object.keys(chartConfig).length > 1 ? chartConfig : exampleChartConfig
  }, [chartConfig])
  const [activeCategory, setActiveCategory] = useState(chartDataToUse[0]?.category ?? "")

  useEffect(() => {
    setActiveCategory(chartDataToUse[0]?.category ?? "")
  }, [chartDataToUse])

  const activeIndex = useMemo(() => chartDataToUse.findIndex((item) => item.category === activeCategory ), [activeCategory, chartDataToUse])

  const activeData = chartDataToUse[activeIndex] ?? chartDataToUse[0]
  const activeLabel = activeData?.category ?? ""
  const activeValue = activeData?.value ?? ''

  if (!activeData) {
    return <CardContainer 
      className={className}
      classNameBody='pb-0'
      classNameFooter='pb-2 text-base justify-end text-blizzard-blue-950 font-semibold'
      title={title}
      footer={`${month ?? 'Enero'} - ${year ?? 2025}`}
    >
      <div className='flex justify-center my-6'>
        <p className='text-xl font-bold text-center'>Sin registros para este mes/año</p>
      </div>
    </CardContainer>
  }

  return (
    <CardContainer 
      className={className}
      classNameBody='pb-0'
      classNameFooter='pb-2 text-base justify-end text-blizzard-blue-950 font-semibold'
      title={title}
      footer={`${activeLabel}: ${formatNumber(activeValue, 'CLP')} | ${month ?? 'Enero'} - ${year ?? 2025}`}
    >
      <ChartContainer
        config={configToUse}
      >
        <PieChart>
          {/* <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          /> */}
          <Pie
            data={chartDataToUse}
            dataKey="value"
            nameKey="category"
            innerRadius={0}
            paddingAngle={2}
            strokeWidth={0}
            activeIndex={activeIndex}
            onMouseEnter={(_, index) => setActiveCategory(chartDataToUse[index].category)}
            activeShape={({
              outerRadius = 0,
              ...props
            }: PieSectorDataItem) => (
              <g>
                <Sector {...props} outerRadius={outerRadius + 10} />
              </g>
            )}
          />
        </PieChart>
      </ChartContainer>
    </CardContainer>
  );
}

export default ChartPie;
