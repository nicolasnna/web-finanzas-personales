import { HTMLProps, ReactElement } from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { COLORS } from '@/utils/constants';
import { TrendingDown, TrendingUp } from 'lucide-react';
import CardContainer from './CardContainer';
import { DataChartArea } from '@/types/DataChart.interface';

interface ChartAreaProps {
  className?: HTMLProps<HTMLElement>["className"];
  title?: string;
  description?: string;
  footer?: ReactElement;
  data?: DataChartArea[];
  chartConfig?: ChartConfig;
  areaChartConfig?: AreaChartConfigProps;
}

interface AreaChartConfigProps {
  heightChart?: number;
  xAxisKey?: string;
  areaConfig?: Array<{
    dataKey: string;
    fill: string;
    fillOpacity: number;
    stroke: string;
  }>;
}

const exampleData: DataChartArea[] = [
  { month: 'Enero', incomes: 100000, expenses: 20000 },
  { month: 'Febrero', incomes: 100000, expenses: 20000 },
  { month: 'Marzo', incomes: 20000, expenses: 20000 },
  { month: 'Abril', incomes: 300000, expenses: 200000 },
  { month: 'Junio', incomes: 143000, expenses: 320000 },
  { month: 'Julio', incomes: 100000, expenses: 20000 },
];

const exampleAreaChartConfig = [
  {
    dataKey: 'incomes',
    fill: COLORS.INCOMES,
    fillOpacity: 0.3,
    stroke: COLORS.INCOMES,
  },
  {
    dataKey: 'expenses',
    fill: COLORS.EXPENSES,
    fillOpacity: 0.3,
    stroke: COLORS.EXPENSES,
  },
];

const exampleChartConfig = {
  incomes: {
    label: 'Ingresos',
    color: COLORS.INCOMES,
    icon: TrendingUp,
  },
  expenses: {
    label: 'Egresos',
    color: COLORS.EXPENSES,
    icon: TrendingDown,
  },
} satisfies ChartConfig;

function ChartArea({
  className,
  title,
  description,
  footer,
  data,
  chartConfig,
  areaChartConfig,
}: ChartAreaProps) {
  const parseData = data && data?.length > 1 ? data : exampleData;
  const parseChartConfig = data && data?.length > 1 ? chartConfig : exampleChartConfig;
  const parseAreaChart = areaChartConfig?.areaConfig ?? exampleAreaChartConfig;

  return (
    <CardContainer className={className} title={title} classNameBody='px-1' description={description} footer={footer} classNameTitle='text-2xl'>
      <ChartContainer
        config={parseChartConfig ?? exampleChartConfig}
        // className={`h-[${areaChartConfig?.heightChart ?? 300}px] w-full`}
      >
        <AreaChart
          accessibilityLayer
          data={parseData}
          margin={{
            top: 20,
            left: 20,
            right: 20
          }}
        >
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent indicator="line" className="w-[150px]" />
            }
            animationDuration={1000}
            animationEasing="ease"
          />
          <XAxis
            dataKey={areaChartConfig?.xAxisKey ?? 'month'}
            tickLine={false}
            axisLine={false}
            tickMargin={4}
          />
          {parseAreaChart.map((e) => (
            <Area key={e.dataKey} {...e} type="bump" />
          ))}
          <ChartLegend
            content={<ChartLegendContent />}
            className="text-base"
          />
        </AreaChart>
      </ChartContainer>
    </CardContainer>
  );
}

export default ChartArea;
