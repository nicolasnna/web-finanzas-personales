import { getResumeTransactionByCategory } from '@/api/resumes';
import { AuthContext } from '@/context/authContext';
import { getRandomColor } from '@/utils/functions';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface DataChart {
  category: string,
  cantidad: number,
  fill: string
}

export function useResumeByCategories(
  typeTransaction: 'incomes' | 'expenses',
  typeResume: 'category' | 'categoryByMonth',
  year: number,
  month?: number
) {
  const token = useContext(AuthContext).token;
  const [dataFetch, setDataFetch] = useState<Record<string, number>>({});
  const [dataChart, setDataChart] = useState<DataChart[]>([])
  const [configChart, setConfigChart] = useState({})

  useEffect(() => {
    if (!token) return;

    const getDataToChart = () => {
      if (typeResume === 'category') {
        const objectKeys = Object.keys(dataFetch);
        const arResume = objectKeys.map((k) => ({
          category: k,
          cantidad: dataFetch[k],
          fill: getRandomColor()
        }));
        console.log(arResume)
        setDataChart(arResume)
        const obj: Record<string, any> = {};
        objectKeys.every(k => {
          obj[k] = { label: k };
        })
        const objChartConfig = {...obj, cantidad: { label: 'Cantidad'}}
        setConfigChart(objChartConfig)
        console.log(objChartConfig)
      }
    };
    
    toast.promise(
      getResumeTransactionByCategory(
        token,
        typeTransaction,
        year,
        typeResume,
        month
      ),
      {
        loading: 'Cargando resumen...',
        success: (data) => {
          setDataFetch(data);
          getDataToChart()
          return 'Resumen obtenido';
        },
        error: (err) => err.message || 'No se ha podido cargar el resumen',
      }
    );
  }, [token, typeResume, typeTransaction, year, month]);


  return { dataChart, configChart };
}
