import { Transaction } from "@/types";
import { URLS } from "@/utils/constants";

export const addIncomeAPI = async (data: Transaction, token: string) : Promise<Transaction | Error> => {
  const endpoint = `${URLS.API_URL}/incomes`
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    
    const responseData = await response.json()
    if (!response.ok) 
      throw new Error(responseData.message || "Error al añadir el ingreso")
    
    return responseData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any ) {
    throw new Error(`Error al añadir los ingresos: ${error.message}`)
  }
}

export const getIncomesAPI = async (token: string) : Promise<Transaction[] | Error> => {
  const endpoint = `${URLS.API_URL}/incomes`
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await response.json()
    if (!response.ok) 
      throw new Error(responseData.message || "Error al obtener los ingresos")
    
    return responseData
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error al obtener los ingresos`)
  }
}
