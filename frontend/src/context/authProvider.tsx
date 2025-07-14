import { loginEmailUser, refreshTokenService } from '@/api/auth'
import { useState, useEffect } from 'react'
import { AuthContext } from './authContext'
import { useTypeTransactionStore } from '@/hooks/useTypeTransactionStore'
import { useTypeCategoryStore } from '@/hooks/useTypeCategoryStore'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)

  const cleanIncomes = useTypeTransactionStore('incomes').setTransaction
  const cleanExpenses = useTypeTransactionStore('expenses').setTransaction
  const cleanCategoryIncomes = useTypeCategoryStore('incomes').setCategories
  const cleanCategoryExpenses = useTypeCategoryStore('expenses').setCategories

  const cleanValuesStore = () => {
    cleanIncomes([])
    cleanExpenses([])
    cleanCategoryIncomes([])
    cleanCategoryExpenses([])
  }

  useEffect(() => {
    const tokenStorage = sessionStorage.getItem("auth")
    if (tokenStorage) {
      setToken(tokenStorage)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginEmailUser(email, password)
      setToken(userData.token)
      sessionStorage.setItem("auth", userData.token)
      cleanValuesStore()
      return userData
    } catch {
      throw new Error("Error al intentar el login")
    }
  }

  const updateToken = async () => {
    if (token) {
      const res = await refreshTokenService(token)
      if (res?.token) {
        setToken(res.token)
        sessionStorage.setItem("auth", res.token)
      } else {
        logout()
        throw new Error("Error al refrescar el token. Cerrando sesión.")
      }
    }
  }

  const logout = () => {
    sessionStorage.removeItem("auth")
    cleanValuesStore()
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{token, login, logout, updateToken}}>
      {children}
    </AuthContext.Provider>
  )

}