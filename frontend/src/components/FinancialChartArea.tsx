import { ReactElement } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
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

interface FinancialChartAreaProps {
  className?: string;
  title?: string;
  description?: string;
  footer?: ReactElement;
  data?: Array<object>;
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

const exampleData = [
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

function FinancialChartArea({
  className,
  title,
  description,
  footer,
  data,
  chartConfig,
  areaChartConfig,
}: FinancialChartAreaProps) {
  const parseData = data ?? exampleData;
  const parseChartConfig = chartConfig ?? exampleChartConfig;
  const parseAreaChart = areaChartConfig?.areaConfig ?? exampleAreaChartConfig;

  return (
    <Card
      className={`${className} select-none bg-blizzard-blue-100 z-10 border-t-1 border-l-1 border-blizzard-blue-800 border-r-4 border-b-4`}
    >
      {(title || description) && (
        <CardHeader>
          {title && (
            <CardTitle className="text-2xl font-semibold uppercase">{title}</CardTitle>
          )}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ChartContainer
          config={parseChartConfig}
          className={`h-[${areaChartConfig?.heightChart ?? 300}px] w-full`}
        >
          <AreaChart
            accessibilityLayer
            data={parseData}
            margin={{
              top: 20,
              left: 20,
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
              <Area key={e.dataKey} {...e} type="natural" />
            ))}
            <ChartLegend
              content={<ChartLegendContent />}
              className="text-base"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default FinancialChartArea;
