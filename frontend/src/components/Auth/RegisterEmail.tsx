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
import { Button } from "../ui/button"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerEmailUser } from "@/api/auth";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { createPortal } from "react-dom";
import { RegisterType, RegisterSchema } from "@/schemas/register.schema";

const RegisterForm = () => {
  const [showForm, setShowForm] = useState(false)
  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<RegisterType> = async data => {
    const isCompleteRequest = await handleRegisterUser(data.email, data.password)
    setShowForm(!isCompleteRequest)
    if (isCompleteRequest) {
      toast.success("Se ha registrado el usuario correctamente", {
        description: `Usuario ${data.email}`
      })
    } else {
      toast.error("No se ha logrado registrar al usuario")
    }
  }

  const cancelRegister = () => {
    setShowForm(false)
    form.reset()
  }

  const handleRegisterUser = async (email: string, password: string) => {
    try {
      const result = await registerEmailUser(email, password);
      console.log("Registro exitoso:", result);
      return true
    } catch (error) {
      console.error("Error al registrar:", error);
      return false
    }
  }

  return (
    <>
      {createPortal(<Toaster/>, document.body)}
      <Button variant="primary" className="border-[1px] border-r-[3px] border-b-[3px] border-blizzard-blue-700" onClick={() => setShowForm(true)}>Registrarse</Button>

      <AlertDialog open={showForm} onOpenChange={setShowForm}>
        <AlertDialogContent className="bg-blizzard-blue-100 border-2 border-blizzard-blue-700 border-b-4 border-r-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-orange-950">Crear cuenta</AlertDialogTitle>
            <AlertDialogDescription className="text-base text-black">Regístrate con tu correo electrónico.</AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})}>
              <div className="space-y-4 px-5">

              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nombre"
                          {...field}
                          className={
                            form.formState.errors.email
                              ? "border-red-500"
                              : "border-blizzard-blue-950"
                          }
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />

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
                              : "border-blizzard-blue-950"
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
                              : "border-blizzard-blue-950"
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