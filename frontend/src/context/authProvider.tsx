import { loginEmailUser, refreshTokenService } from '@/services/authService'
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
      throw new Error("Error al intentar el login")
    }
  }

  const updateToken = async () => {
    if (user) {
      const res = await refreshTokenService(user)
      console.log("Token actualizado", res)
      if (res.token) {
        setUser(res.token)
        localStorage.setItem("auth", res.token)
      } else {
        throw new Error("Error al refrescar el token")
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("auth")
    console.log("Logout exitoso")
    setIncomes([])
    setExpenses([])
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, login, logout, updateToken}}>
      {children}
    </AuthContext.Provider>
  )

}