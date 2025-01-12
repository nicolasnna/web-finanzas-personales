import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email({message: 'Debe ser un correo válido.'}),
  password: z.string().min(6, {message: 'Debe tener un mínimo de 6 caracteres'}),
})

export type RegisterType = z.infer<typeof RegisterSchema>
