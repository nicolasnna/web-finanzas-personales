import { Transaction } from "@/types";
import { URLS } from "@/utils/constants";

export const addExpenseAPI = async (data: Transaction, token: string) => {
  const endpoint = `${URLS.API_URL}/db/expenses`
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
      throw new Error(errorData.message || "Error al añadir el gasto")
    }

    const responseData = await response.json()
    return responseData
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error al añadir los egresos`)
  }
}

export const getExpensesAPI = async (token: string) => {
  const endpoint = `${URLS.API_URL}/db/expenses`
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al obtener los gastos")
    }

    const data = await response.json()
    return data
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error al obtener los egresos`)
  }
}

