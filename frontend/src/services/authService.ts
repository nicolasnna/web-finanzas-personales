const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

/** 
 * Registrar usuario a partir de email
 * @param email - Correo registgrado
 * @param password - Contraseña
 * @returns - uid, email
*/
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

/** 
 * ingresar cuenta con el usuario
 * @param email - Correo registgrado
 * @param password - Contraseña
 * @returns - token, uid, email
*/
export const loginEmailUser = async (email: string, password: string) => {
  const endpoint = `${BACKEND_URL}/auth/signup-email`

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
      throw new Error(errorData.message || "Error al iniciar sesión")
    }

    return await response.json()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error; // Re-lanzamos el error
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Error inesperado al iniciar sesión");
    }
  }
}