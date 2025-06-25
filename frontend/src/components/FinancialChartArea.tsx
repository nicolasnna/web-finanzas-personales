import { ReactElement } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Area, AreaChart } from "recharts";
import { COLORS } from "@/utils/constants";

interface FinancialChartAreaProps {
  className?: string
  title?: string
  description?: string
  footer?: ReactElement
}

const exampleData = [
  { month: 'Enero', incomes: 100000, expenses: 20000 },
  { month: 'Febrero', incomes: 100000, expenses: 20000 },
  { month: 'Marzo', incomes: 20000, expenses: 20000 },
  { month: 'Abril', incomes: 300000, expenses: 200000 },
  { month: 'Junio', incomes: 143000, expenses: 320000 },
  { month: 'Julio', incomes: 100000, expenses: 20000 },  
]


function FinancialChartArea({className, title, description, footer} : FinancialChartAreaProps) {

  const chartConfig = {
    incomes: {
      label: "Ingresos",
      color: COLORS.INCOMES,
    },
    expenses: {
      label: "Egresos",
      color: COLORS.EXPENSES
    }
  } satisfies ChartConfig

  return <Card className={`${className} select-none bg-blizzard-blue-100 z-10 border-t-1 border-l-1 border-blizzard-blue-800 border-r-4 border-b-4`}>
    {(title || description) && 
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    }
    <CardContent>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={exampleData}
          margin={{
            top: 20
          }}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" className="flex flex-col gap-1"/>}
            offset={20}
            animationDuration={1000}
            animationEasing="ease"
          />
          <Area
            dataKey="incomes"
            type="natural"
            fill={COLORS.INCOMES}
            fillOpacity={0.3}
            stroke={COLORS.INCOMES}
          />
          <Area
            dataKey="expenses"
            type="natural"
            fill={COLORS.EXPENSES}
            fillOpacity={0.3}
            stroke={COLORS.EXPENSES}
          />

        </AreaChart>
      </ChartContainer>
    </CardContent>
    {footer && 
      <CardFooter>
        {footer}
      </CardFooter>
    }
  </Card>
}

export default FinancialChartArea