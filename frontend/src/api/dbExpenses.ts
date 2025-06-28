import { BalanceInfo } from "@/types";
import { URLS } from "@/utils/constants";

const BACKEND_URL = URLS.API_URL

export const addExpenseDb = async (expenseData: BalanceInfo, token: string) => {
  const endpoint = `${BACKEND_URL}/db/expenses`
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(expenseData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al añadir el gasto")
    }

    const data = await response.json()
    return data
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error al añadir los egresos: ${error.message}`)
  }
}

export const getExpensesDb = async (token: string) => {
  const endpoint = `${BACKEND_URL}/db/expenses`
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
    throw new Error(`Error al obtener los egresos: ${error.message}`)
  }
}

