import { RawResumeTransactionByMonth } from '@/hooks/useAreaChartData';
import { RawResumeTransaction } from '@/hooks/usePieChartData';
import { apiRequest } from '@/utils/apiRequest';
import { URLS } from '@/utils/constants';

export const getResumeTransactionByCategory = async (
  token: string,
  type: 'incomes' | 'expenses',
  year: number,
  groupBy: 'category' | 'categoryByMonth',
  month?: number
): Promise<RawResumeTransactionByMonth | RawResumeTransaction | Error> => {
  const endpoint = month
    ? `${URLS.API_URL}/resume/by-category?type=${type}&year=${year}&groupBy=${groupBy}&month=${month}`
    : `${URLS.API_URL}/resume/by-category?type=${type}&year=${year}&groupBy=${groupBy}`;

  return apiRequest<RawResumeTransaction | RawResumeTransactionByMonth>(
    endpoint,
    {
      method: 'GET',
      token,
    }
  );
};

export const getResumeTransactionByMonth = async (
  token: string,
  type: 'incomes' | 'expenses',
  year: number
) => {
  const endpoint = `${URLS.API_URL}/resume/by-month?type=${type}&year=${year}`;
  return apiRequest(endpoint, {
    method: 'GET',
    token,
  });
};

export const getTopTransactionAPI = async (
  token: string,
  type: 'incomes' | 'expenses',
  year: number,
  month: number,
  limit?: number
) => {
  const endpoint = limit
    ? `${URLS.API_URL}/resume/top?type=${type}&year=${year}&month=${month}&limit=${limit}`
    : `${URLS.API_URL}/resume/top?type=${type}&year=${year}&month=${month}`;

  return apiRequest(endpoint, {
    method: 'GET',
    token,
  });
};
