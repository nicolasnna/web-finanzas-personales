import { URLS } from "@/utils/constants";

export const registerEmailUser = async (email: string, password: string) => {
  const endpoint = `${URLS.API_URL}/auth/register`

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al registrarse")
    }

    return await response.json()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al registrarse:", error.message);
      throw error; // Re-lanzamos el error
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Error inesperado al registrarse");
    }
  }
}

export const loginEmailUser = async (email: string, password: string) => {
  const endpoint = `${URLS.API_URL}/auth/login`

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password}),
      credentials: "include"
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al iniciar sesión")
    }

    return await response.json()
  } catch {
    console.error("Error inesperado al iniciar sesión");
    throw new Error("Error inesperado al iniciar sesión");
  }
}

export const refreshTokenService = async (token: string) => {
  const endpoint = `${URLS.API_URL}/auth/refresh-token`

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      credentials: "include",
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Error al refrescar el token")
    }

    return await res.json()
  } catch (error: unknown) {
    console.error("Error al refrescar el token:", error);
  }
}