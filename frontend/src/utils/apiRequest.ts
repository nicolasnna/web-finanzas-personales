type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiRequestOptions {
  method?: HttpMethod
  token: string
  body?: unknown
}

export async function apiRequest<T>(
  url: string,
  { method = 'GET', token, body }: ApiRequestOptions
): Promise<T> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: body ? JSON.stringify(body) : undefined
    })

    const responseData = await response.json()
    if (!response.ok) {
      throw new Error(responseData.message || 'Error en la solicitud')
    }

    return responseData as T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'Error de red')
  }
}
