import { Category } from "@/types";
import { apiRequest } from "@/utils/apiRequest";
import { URLS } from "@/utils/constants";

export const addExpenseCategoryAPI = async (category: Category, token: string) : Promise<Category | Error> => {
  const endpoint = `${URLS.API_URL}/categories/expenses`
  return apiRequest<Category>(endpoint, {
    method: 'POST',
    token,
    body: category
  })
}

export const getExpenseCategoryAPI = async (token: string) : Promise<Category[] | Error > => {
  const endpoint = `${URLS.API_URL}/categories/expenses`
  return apiRequest<Category[]>(endpoint, {
    method: 'GET',
    token
  })
}