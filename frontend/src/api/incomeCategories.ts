import { Category} from "@/types";
import { apiRequest } from "@/utils/apiRequest";
import { URLS } from "@/utils/constants";

export const addIncomeCategoryAPI = async (category: Category, token: string): Promise<Category | Error> => {
  const endpoint = `${URLS.API_URL}/categories/incomes`
  return apiRequest<Category>(endpoint, {
    method: 'POST',
    token,
    body: category
  })
}

export const getIncomeCategoryAPI = async (token: string) : Promise<Category[] | Error > => {
  const endpoint = `${URLS.API_URL}/categories/incomes`
  return apiRequest<Category[]>(endpoint, {
    method: 'GET',
    token
  })
}

export const updateIncomeCategoryAPI = async (token: string, id: string, data: Category) : Promise<Category> => {
  const endpoint = URLS.API_URL + '/categories/incomes/' + id
  return apiRequest<Category>(endpoint, {
    method: 'PUT',
    token,
    body: data
  })
}

export const deleteIncomeCategoryAPI = async (token: string, id: string) : Promise<Category> => {
  const endpoint = URLS.API_URL + '/categories/incomes/' + id
  return apiRequest<Category>(endpoint, {
    method: 'DELETE',
    token
  })
}