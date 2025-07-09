import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email({message: 'Debe ser un correo válido.'}),
  password: z.string().min(6, {message: 'Debe tener un mínimo de 6 caracteres'}),
  confirmPassword: z.string().min(6, {message: 'Debe tener un mínimo de 6 caracteres'})
}).superRefine(({confirmPassword, password}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword']
    })
  }
})

export type RegisterType = z.infer<typeof RegisterSchema>
