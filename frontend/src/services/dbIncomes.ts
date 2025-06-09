import { BalanceInfo } from "@/types";
import { URLS } from "@/utils/constants";

const BACKEND_URL = URLS.API_URL

/**
 * Añadir ingreso 
 * @param incomeData - Objeto tipo Balnceinfo
 * @param token 
 * @returns Respuesta del servidor
 */
export const addIncomeDb = async (incomeData: BalanceInfo, token: string) => {
  const endpoint = `${BACKEND_URL}/db/incomes`
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(incomeData)
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al añadir el ingreso")
    }

    const data = await response.json()
    return data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any ) {
    throw new Error(`Error al añadir los ingresos: ${error.message}`)
  }
}

/**
 * Obtiene los ingresos del usuario
 * @param token 
 * @returns - Retorna los ingresos del usuario desde la base de datos
 */
export const getIncomesDb = async (token: string) => {
  const endpoint = `${BACKEND_URL}/db/incomes`
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al obtener los ingresos")
    }

    const data = await response.json()
    return data
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error al obtener los ingresos: ${error.message}`)
  }
}
