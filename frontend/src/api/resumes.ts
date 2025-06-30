import { RawResumeTransactionByMonth } from '@/hooks/useAreaChartData';
import { RawResumeTransaction } from '@/hooks/usePieChartData';
import { URLS } from '@/utils/constants';

export const getResumeTransactionByCategory = async (
  token: string,
  type: 'incomes' | 'expenses',
  year: number,
  groupBy: 'category' | 'categoryByMonth',
  month?: number,
) : Promise<RawResumeTransactionByMonth | RawResumeTransaction | Error> => {
  let endpoint = `${URLS.API_URL}/resume/by-category?type=${type}&year=${year}&groupBy=${groupBy}`;
  if (month) endpoint = `${endpoint}&month=${month}`

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await res.json()
    if (!res.ok)
      throw new Error(responseData.message || "Error al obtener el resument")

    return responseData
  } catch  {
    throw new Error('Error al obtener el resumen');
  }
};
