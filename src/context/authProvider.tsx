import { loginEmailUser } from '@/services/authService'
import { useState, useEffect } from 'react'
import { AuthContext } from './authContext'
import { useExpenseStore, useIncomeStore } from '@/store/useBalanceStore'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const {setBalanceRows: setIncomes} = useIncomeStore()
  const {setBalanceRows: setExpenses} = useExpenseStore()

  useEffect(() => {
    const token = localStorage.getItem("auth")
    if (token) {
      setUser(token)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginEmailUser(email, password)
      setUser(userData.token)
      localStorage.setItem("auth", userData.token)
      return userData
    } catch {
      console.error("Error al intentar el login")
    }
  }

  const logout = async () => {
    localStorage.removeItem("auth")
    setIncomes([])
    setExpenses([])
    setUser("")
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )

}