import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import Alert from "./Alert"
import { Button } from "./ui/button"
import { FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"

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
      
      <Alert
        show={showForm}
        setShow={setShowForm}
        description="Crea una nueva categoría para el formularío."
        title="Crear categoría"
        buttonLeftLabel="Cancelar"
        buttonRightLabel="Guardar"
        buttonLeftClick={() => setShowForm(false)}
        buttonRightClick={form.handleSubmit(onSubmit)}
      >
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
      </Alert>
  
    </>
  )
}

export default CategoryForm