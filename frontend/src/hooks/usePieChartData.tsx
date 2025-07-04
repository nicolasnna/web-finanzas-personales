import { ChartConfig } from "@/components/ui/chart"
import { DataChartPie } from "@/types/DataChart.interface"
import { getRandomColor } from "@/utils/functions"
import { useMemo, useState } from "react"

export interface RawResumeTransaction {
  [category: string]: number
}

export function usePieChartData() {
  const [dataRaw, setDataRaw] = useState<RawResumeTransaction>({})
  
  const pieData = useMemo(() => {
    const categories = Object.keys(dataRaw)
    const dataChart: DataChartPie[] = categories.map((k) => ({
      category: k,
      value: dataRaw[k],
      fill: getRandomColor()
    }))
  
    const configChart: ChartConfig = categories.reduce((cfg, k) => {
      cfg[k] = { label: k };
      return cfg
    }, {value: { label: 'Total' } } as ChartConfig)
  
  
    return {data: dataChart, config: configChart}
  }, [dataRaw])

  return {setDataRaw, data: pieData.data, config: pieData.config}
}