import { Transaction } from "@/types";
import { URLS } from "@/utils/constants";

export const addIncomeAPI = async (data: Transaction, token: string) => {
  const endpoint = `${URLS.API_URL}/db/incomes`
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al añadir el ingreso")
    }

    const responseData = await response.json()
    return responseData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any ) {
    throw new Error(`Error al añadir los ingresos: ${error.message}`)
  }
}

export const getIncomesAPI = async (token: string) => {
  const endpoint = `${URLS.API_URL}/db/incomes`
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

    const responseData = await response.json()
    return responseData
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error al obtener los ingresos`)
  }
}
