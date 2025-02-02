import {z} from "zod"

export const SignupSchema = z.object({
  email: z.string().email({message: 'Debe ser un correo válido.'}),
  password: z.string().min(6, {message: 'Debe tener un mínimo de 6 caracteres'}),
})

export type SignupType = z.infer<typeof SignupSchema>