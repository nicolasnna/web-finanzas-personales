import { category, error } from "@/types";
import { URLS } from "@/utils/constants";

const BACKEND_URL = URLS.API_URL

/**
 * Añadir categoria creada a la base de datos (gastos)
 * @param category - Categoria creada
 * @param token
 */
export const addCategoryIncomeDb = async (category: category, token: string) => {
  const endpoint = `${BACKEND_URL}/db/add-category-income`
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


/**
 * Obtener categorias creadas previamente en la base de datos
 * @param token
 */
export const getCategoryIncomeDb = async (token: string) : Promise<category[] | error > => {
  const endpoint = `${BACKEND_URL}/db/get-category-income`
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
    return {error: error.message}
  }
}