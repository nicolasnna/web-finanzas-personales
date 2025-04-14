import { createContext } from 'react'

type AuthContextType = {
  user: string | null; // Datos del usuario
  login: (email: string, password: string) => Promise<void>; // Método de inicio de sesión
  logout: () => void; // Método de cierre de sesión
  updateToken: () => Promise<void>; // Método para actualizar el token
};

export const AuthContext =  createContext<AuthContextType>({
  user: null,
  login: async () => {
    throw new Error("login no está implementado.");
  },
  logout: () => {
    throw new Error("logout no está implementado.");
  },
  updateToken: async () => {
    throw new Error("updateToken no está implementado.");
  }
});