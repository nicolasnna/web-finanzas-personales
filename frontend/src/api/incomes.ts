import { Transaction } from '@/types/Transaction.interface';
import { apiRequest } from '@/utils/apiRequest';
import { URLS } from '@/utils/constants';

export const addIncomeAPI = async (
  data: Transaction,
  token: string
): Promise<Transaction | Error> => {
  const endpoint = `${URLS.API_URL}/incomes`;
  return apiRequest<Transaction>(endpoint, {
    method: 'POST',
    token,
    body: data,
  });
};

export const getIncomesAPI = async (
  token: string,
  afterDate?: Date
): Promise<Transaction[] | Error> => {
  const endpoint = afterDate
    ? `${URLS.API_URL}/incomes?afterDate=${afterDate.toISOString()}`
    : `${URLS.API_URL}/incomes`;
  return apiRequest<Transaction[]>(endpoint, {
    method: 'GET',
    token,
  });
};

export const updateIncomesAPI = async (
  token: string,
  id: string,
  data: Transaction
) : Promise<Transaction | Error> => {
  const endpoint = URLS.API_URL + '/incomes/' + id;
  return apiRequest<Transaction>(endpoint, {
    method: 'PUT',
    token,
    body: data
  })
}

export const deleteIncomesAPI = async (
  token: string,
  id: string
): Promise<Transaction | Error> => {
  const endpoint = URLS.API_URL + '/incomes/' + id;
  return apiRequest<Transaction>(endpoint, {
    method: 'DELETE',
    token
  })
};
