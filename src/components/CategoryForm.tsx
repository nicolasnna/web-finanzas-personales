import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
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

const CategorySchema = z.object({
  category: z.string().min(2, {message: 'Debe tener un mínimo de 3 letras'}).trim()
})

type CategoryForm = z.infer<typeof CategorySchema>

const CategoryForm = ({addResult} : {addResult: (category: string) => void}) => {
  const [showForm, setShowForm] = useState(false)
  const form = useForm<CategoryForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category: ''
    }
  })
  
  const onSubmit: SubmitHandler<CategoryForm> = (data) => {
    addResult(data.category)
    setShowForm(false)
  }


  return (
    <>
      <Button onClick={() => setShowForm(true)}>Crear categoría</Button>
      
      <AlertDialog open={showForm} onOpenChange={setShowForm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Crear categoría</AlertDialogTitle>
            <AlertDialogDescription>Crea una nueva categoría para el formularío.</AlertDialogDescription>
          </AlertDialogHeader>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Escribe una nueva categoría"
                    type="text"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
            />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowForm(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
              Guardar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CategoryForm