import { Category } from "@/types/Category.interface"
import { Transaction } from "@/types/Transaction.interface"
import { TypeCategories, TypeTransaction } from "@/types/Type.interface"
import { demoValues } from "@/utils/constants"

export function useLocalStorage(type: TypeTransaction | TypeCategories) {

  const getValues = () => JSON.parse(localStorage.getItem(type) as string)

  const addValue = (data: Category | Transaction) => {
    const currentValues = getValues()
    if (currentValues && currentValues?.length > 0) {
      localStorage.setItem(type, JSON.stringify([...currentValues, data]))
    } else {
      localStorage.setItem(type, JSON.stringify(data))
    }
  }

  const deleteValue = (id: string) => {
    const currentValues = getValues()
    if (currentValues && currentValues?.length > 0) {
      const existing = currentValues.filter((c: Category | Transaction) => c.id !== id)
      localStorage.setItem(type, JSON.stringify(existing))
    }
  }

  const updateValue = (id: string, data: Category | Transaction) => {
    const currentValues = getValues()
    if (currentValues && currentValues?.length > 0) {
      const updated = currentValues.map((c: Category | Transaction) => c.id === id ? {...c, ...data} : c)
      localStorage.setItem(type, JSON.stringify(updated))
    }
  }

  const cleanLocalValues = () => {
    localStorage.removeItem(type)
  }

  const setupDemoValues = () => {
    if (getValues() === null) {
      localStorage.setItem(type, JSON.stringify(demoValues[type]) as string);
    }
  }

  return {
    getValues,
    addValue,
    deleteValue,
    updateValue,
    cleanLocalValues,
    setupDemoValues
  }
}