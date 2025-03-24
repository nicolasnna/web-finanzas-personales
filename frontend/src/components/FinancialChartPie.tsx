import { resumeBalanceInterface } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { Cell, Pie, PieChart } from 'recharts';
const chartConfig = {
  value: {
    label: 'Valor',
  },
} satisfies ChartConfig;

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const FinancialChartPie = ({ data }: { data: resumeBalanceInterface }) => {
  const filterResumeZero = data.resumeForCategory.filter(e => e.value !== 0)
  const percentajesResume = filterResumeZero.map(e => ({ ...e, value: e.value / data.total * 100 }))
  return (
    <Card className="flex flex-col z-20">
      <CardHeader className='b-0 m-0'>
        <CardTitle>Porcentaje de ingreso por categoría</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer config={chartConfig} className="aspect-square">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={percentajesResume}
              dataKey="value"
              nameKey="category"
              fill="#8884d8"
              innerRadius={60}
            >
              {percentajesResume.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:bg-gray-900"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FinancialChartPie;
