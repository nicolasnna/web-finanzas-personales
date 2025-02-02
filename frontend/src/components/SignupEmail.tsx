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
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { createPortal } from "react-dom";
import { SignupSchema, SignupType } from "@/schemas/signup.schema";
import { AuthContext } from "@/context/authContext";

const SignupEmail = () => {
  const [showForm, setShowForm] = useState(false)
  const { login } = useContext(AuthContext)
    const form = useForm<SignupType>({
      resolver: zodResolver(SignupSchema),
      defaultValues: {
        email: '',
        password: ''
      }
    })

  const cancelRegister = () => {
    setShowForm(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<SignupType> = async data => {
    try {
      const info = await login(data.email, data.password);
      console.log(info)
      setShowForm(false)
      toast.success(`Se ha iniciado sesión con exito - ${data.email} `)
    
    } catch {
      toast.error(`No se ha logrado iniciar sesión con ${data.email} `)
    }
  }


  return (<>
    {createPortal(<Toaster/>, document.body)}
    <Button variant="default" onClick={() => setShowForm(true)}>Iniciar sesión</Button>

    <AlertDialog open={showForm} onOpenChange={setShowForm} >
      <AlertDialogContent className="bg-blizzard-blue-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-orange-950">Iniciar sesión</AlertDialogTitle>
          <AlertDialogDescription className="text-base text-black">Ingresa con tu correo electrónico.</AlertDialogDescription>
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
            Iniciar sesión
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>)

}

export default SignupEmail