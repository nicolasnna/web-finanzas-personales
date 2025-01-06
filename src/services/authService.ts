const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

export const registerEmailUser = async (email: string, password: string) => {
  const endpoint = `${BACKEND_URL}/auth/register-email`

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