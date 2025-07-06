import { Transaction } from '@/types';
import { apiRequest } from '@/utils/apiRequest';
import { URLS } from '@/utils/constants';

export const addExpenseAPI = async (
  data: Transaction,
  token: string
): Promise<Transaction | Error> => {
  const endpoint = `${URLS.API_URL}/expenses`;
  return apiRequest<Transaction>(endpoint, {
    method: 'POST',
    token,
    body: data,
  });
};

export const getExpensesAPI = async (
  token: string,
  afterDate?: Date
): Promise<Transaction[] | Error> => {
  const endpoint = afterDate
    ? `${URLS.API_URL}/expenses?afterDate=${afterDate.toISOString()}`
    : `${URLS.API_URL}/expenses`;
  return apiRequest<Transaction[]>(endpoint, {
    method: 'GET',
    token
  })
};

export const deleteExpensesAPI = async (
  token: string,
  id: string
) : Promise<Transaction | Error> => {
  const endpoint = URLS.API_URL + 'expenses/' + id
  return apiRequest<Transaction>(endpoint, {
    method: 'DELETE',
    token
  })
}