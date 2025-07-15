import { RawResumeTransactionByMonth } from '@/hooks/useAreaChartData';
import { RawResumeTransaction } from '@/hooks/usePieChartData';
import { RawResumeTransactionByMonthAPI, TotalCountsAPI } from '@/types/Promises.interface';
import { Transaction } from '@/types/Transaction.interface';
import { apiRequest } from '@/utils/apiRequest';
import { URLS } from '@/utils/constants';

export const getResumeTransactionByCategory = (
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

export const getResumeTransactionByMonth = (
  token: string,
  type: 'incomes' | 'expenses',
  year: number
) : Promise<RawResumeTransactionByMonthAPI> => {
  const endpoint = `${URLS.API_URL}/resume/by-month?type=${type}&year=${year}`;
  return apiRequest(endpoint, {
    method: 'GET',
    token,
  });
};

export const getTopTransactionAPI = (
  token: string,
  type: 'incomes' | 'expenses',
  year: number,
  month: number,
  limit?: number
) : Promise<Transaction[]> => {
  const endpoint = limit
    ? `${URLS.API_URL}/resume/top?type=${type}&year=${year}&month=${month}&limit=${limit}`
    : `${URLS.API_URL}/resume/top?type=${type}&year=${year}&month=${month}`;

  return apiRequest(endpoint, {
    method: 'GET',
    token,
  });
};

export const getCountsTotalAPI = (
  token: string
) : Promise<TotalCountsAPI> => {
  const endpoint = URLS.API_URL + '/resume/total-counts'
  return apiRequest(endpoint, {
    method: 'GET',
    token
  })
}