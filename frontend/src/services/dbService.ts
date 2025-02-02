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
  const endpoint = `${BACKEND_URL}/db/add-income`
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
    console.error("Error al añadir el ingreso: ", error.message)
  }
}

/**
 * Añadir gasto del usuario a la base de datos
 * @param expenseData - Datos de gasto del tipo BalanceInfo
 * @param token 
 * @returns - Retorna respuesta del servidor
 */
export const addExpenseDb = async (expenseData: BalanceInfo, token: string) => {
  const endpoint = `${BACKEND_URL}/db/add-expense`
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
    console.error("Error al añadir el gasto: ", error.message)
  }
}

/**
 * Obtiene los ingresos del usuario
 * @param token 
 * @returns - Retorna los ingresos del usuario desde la base de datos
 */
export const getIncomesDb = async (token: string) => {
  const endpoint = `${BACKEND_URL}/db/get-incomes`
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
    console.error("Error al obtener los ingresos:", error.message)
  }
}

/**
 * Obtiene los gastos del usuario
 * @param token 
 * @returns - Gastos del usuario
 */
export const getExpensesDb = async (token: string) => {
  const endpoint = `${BACKEND_URL}/db/get-expenses`
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
    console.error("Error al obtener los gastos:", error.message)
  }
}