import { Transaction } from "@/types";
import { URLS } from "@/utils/constants";

export const addExpenseAPI = async (data: Transaction, token: string) : Promise<Transaction | Error> => {
  const endpoint = `${URLS.API_URL}/expenses`
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
      throw new Error(responseData.message || "Error al añadir el gasto")

    return responseData
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error al añadir los egresos`)
  }
}

export const getExpensesAPI = async (token: string) : Promise<Transaction[] | Error> => {
  const endpoint = `${URLS.API_URL}/expenses`
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()
    if (!response.ok) 
      throw new Error(data.message || "Error al obtener los gastos")
    
    return data
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error al obtener los egresos`)
  }
}

