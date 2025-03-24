
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { resumeBalanceInterface } from "@/types";

const chartConfigData = {
  value: {
    label: "Valor",
    color: 'hsl(var(--chart-1))',
  }
} satisfies ChartConfig

const FinancialChartBar = ({data}: {data: resumeBalanceInterface}) => {
  const filterResumeZero = data.resumeForCategory.filter(e => e.value !== 0)
  return (
    <ChartContainer config={chartConfigData} className="min-h-[200px] max-h-[350px] w-full px-10 z-[100]">
      <BarChart accessibilityLayer data={filterResumeZero} >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{fontSize: 20}}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <ChartTooltip  content={<ChartTooltipContent className="text-sm"/>}/>
        <Bar dataKey="value" fill="#0369a1" radius={10}/>
      </BarChart>
    </ChartContainer>
  )
}

export default FinancialChartBar;