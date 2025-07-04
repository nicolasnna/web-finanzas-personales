import { loginEmailUser, refreshTokenService } from '@/api/auth'
import { useState, useEffect } from 'react'
import { AuthContext } from './authContext'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)

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
    console.log("Logout exitoso")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{token, login, logout, updateToken}}>
      {children}
    </AuthContext.Provider>
  )

}