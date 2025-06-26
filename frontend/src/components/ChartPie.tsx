import { Pie, PieChart, Sector } from 'recharts';
import CardChart from './CardChart';
import { ChartConfig, ChartContainer} from './ui/chart';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { useMemo, useState } from 'react';
import { formatNumber } from '@/utils/functions';

interface ChartPieProps {
  className?: string
  title?: string
  month?: string
  year?: number
}

const exampleChartConfig = {
  cantidad: {
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
  { category: "categoria1", cantidad: 50000, fill: "hsl(var(--chart-1))" },
  { category: "categoria2", cantidad: 5000, fill: "hsl(var(--chart-2))" },
  { category: "categoria3", cantidad: 15000, fill: "hsl(var(--chart-3))" },
  { category: "categoria4", cantidad: 32000, fill: "hsl(var(--chart-4))" },
  { category: "categoria5", cantidad: 55000, fill: "hsl(var(--chart-5))" },
] 

function ChartPie({className, title, month, year} : ChartPieProps) {
  const [activeCategory, setActiveCategory] = useState(exampleChartData[0].category)

  const activeIndex = useMemo(() => exampleChartData.findIndex((item) => item.category === activeCategory ), [activeCategory])

  return (
    <CardChart 
      className={className}
      classNameBody='pb-0'
      classNameFooter='pb-2 text-base justify-end'
      title={title}
      footer={`${activeCategory}: ${formatNumber(exampleChartData[activeIndex].cantidad, 'CLP')} | ${month ?? 'Enero'} - ${year ?? 2025}`}
    >
      <ChartContainer
        config={exampleChartConfig}
      >
        <PieChart>
          {/* <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          /> */}
          <Pie
            data={exampleChartData}
            dataKey="cantidad"
            nameKey="category"
            innerRadius={0}
            paddingAngle={2}
            strokeWidth={0}
            activeIndex={activeIndex}
            onMouseEnter={(_, index) => setActiveCategory(exampleChartData[index].category)}
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
    </CardChart>
  );
}

export default ChartPie;
