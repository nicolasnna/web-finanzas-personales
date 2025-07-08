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

export const updateExpenseCategoryAPI = async (token: string, id: string, data: Category) : Promise<Category> => {
  const endpoint = URLS.API_URL + '/categories/expenses/' + id
  return apiRequest<Category>(endpoint, {
    method: 'PUT',
    token,
    body: data
  })
}

export const deleteExpenseCategoryAPI = async (token: string, id: string) : Promise<Category> => {
  const endpoint = URLS.API_URL + '/categories/expenses/' + id
  return apiRequest<Category>(endpoint, {
    method: 'DELETE',
    token
  })
}