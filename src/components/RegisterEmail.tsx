import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { registerEmailUser } from "@/services/authService";

const RegisterSchema = z.object({
  email: z.string().email({message: 'Debe ser un correo válido.'}),
  password: z.string().min(6, {message: 'Debe tener un mínimo de 6 caracteres'}),
})

type RegisterForm = z.infer<typeof RegisterSchema>

const RegisterForm = () => {
  const [showForm, setShowForm] = useState(false)
  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<RegisterForm> = data => {
    console.log(data)
    handleRegisterUser(data.email, data.password)
  }

  const cancelRegister = () => {
    setShowForm(false)
    form.reset()
  }

  const handleRegisterUser = async (email: string, password: string) => {
    try {
      const result = await registerEmailUser(email, password);
      console.log("Registro exitoso:", result);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setShowForm(true)}>Registrarse</Button>

      <AlertDialog open={showForm} onOpenChange={setShowForm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Crear cuenta</AlertDialogTitle>
            <AlertDialogDescription>Regístrate con tu correo electrónico.</AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})}>
              <div className="space-y-4 px-5">

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Correo electrónico"
                          {...field}
                          className={
                            form.formState.errors.email
                              ? "border-red-500"
                              : "border-gray-300"
                          }
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          {...field}
                          className={
                            form.formState.errors.password
                              ? "border-red-500"
                              : "border-gray-300"
                          }
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelRegister}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
              Registrarse
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default RegisterForm