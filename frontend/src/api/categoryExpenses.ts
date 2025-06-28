import { Category, error } from "@/types";
import { URLS } from "@/utils/constants";

export const addCategoryExpenseAPI = async (category: Category, token: string) => {
  const endpoint = `${URLS.API_URL}/db/categories/expenses`
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {error: errorData.message}
    }

    const data = await response.json()
    return data
    // eslint-disable-next-line 
  } catch (error: any) {
    return {error: error.message}
  }
}

export const getCategoryExpenseAPI = async (token: string) : Promise<Category[] | error > => {
  const endpoint = `${URLS.API_URL}/db/categories/expenses`
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Error al obtener la vategoria de gastos")
    } 

    const data = await res.json()
    return data
    //eslint-disable-next-line
  } catch (error: any) {
    return {error: error.message}
  }
}