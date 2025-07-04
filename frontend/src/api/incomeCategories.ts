import { Category} from "@/types";
import { URLS } from "@/utils/constants";

export const addIncomeCategoryAPI = async (category: Category, token: string): Promise<Category | Error> => {
  const endpoint = `${URLS.API_URL}/categories/incomes`
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Error al crear la categoría')
    }

    return data
    // eslint-disable-next-line 
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener la categoria de ingresos")
  }
}


export const getIncomeCategoryAPI = async (token: string) : Promise<Category[] | Error > => {
  const endpoint = `${URLS.API_URL}/categories/incomes`
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Error al obtener la categoria de ingresos")
    } 

    const data = await res.json()
    return data
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener la categoria de ingresos")
  }
}