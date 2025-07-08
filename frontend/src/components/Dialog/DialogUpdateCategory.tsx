import { Category, CategorySchema, CategoryTypeForm } from "@/types";
import { Pencil } from "lucide-react";
import { useContext, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { NewCategoryFormField } from "../FormField";
import { AuthContext } from "@/context/authContext";
import { updateIncomeCategoryAPI } from "@/api/incomeCategories";
import { updateExpenseCategoryAPI } from "@/api/expenseCategories";
import { toast } from "sonner";
import { useTypeCategoryStore } from "@/hooks/useTypeCategoryStore";

interface DialogUpdateCategoryInput {
  data: Category,
  type: 'incomes' | 'expenses'
}

export function DialogUpdateCategory({
  data,
  type
}: DialogUpdateCategoryInput) {
  const [show, setShow] = useState(false)
  const [disable, setDisable] = useState(false)
  const token = useContext(AuthContext).token
  const updateStore = useTypeCategoryStore(type).updateCategory
  const updateCategoryForm = useForm<CategoryTypeForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category: data.category
    }
  });

  const apiUpdateTransaction: Record<string, (token: string, id: string, data: Category) => Promise<Category>> = {
    incomes: updateIncomeCategoryAPI,
    expenses: updateExpenseCategoryAPI
  }

  const handleSubmit = () => {
    if (!token || !data.id) return;
    setDisable(() => true)
    toast.promise(
      apiUpdateTransaction[type](token, data.id, updateCategoryForm.watch()),
      {
        loading: 'Actualizando categoría...',
        success: () => {
          setShow(() => false)
          if (data.id)
            updateStore(data.id, updateCategoryForm.watch())
          return 'Categoría actualizada con exito'
        },
        error: (err) => err.message || 'No se ha realizado la actualización'
      }
    )
    setDisable(() => false)
  }

  const handleClose = () => {
    setShow(false)
    updateCategoryForm.reset({
      category: data.category
    })
  }

  return (
    <>
      <Pencil
        className="cursor-pointer hover:text-green-500"
        onClick={() => setShow(true)}
      />

      <AlertDialog open={show}>
        <AlertDialogContent
          className='bg-blizzard-blue-100 border-2 border-blizzard-blue-700 border-b-4 border-r-4'
        >
          <AlertDialogHeader>
            <AlertDialogTitle className='text-2xl'>
              Modificar categoría
            </AlertDialogTitle>
            <AlertDialogDescription
              className="text-base text-orange-950"
            >
              Cambia el campo para la actualización
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...updateCategoryForm}>
            <form
              className="grid gap-2"
            >
              <NewCategoryFormField
                form={updateCategoryForm}
                className="flex gap-2 justify-center items-center"
              />
            </form>
          </Form>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={disable}
              onClick={handleClose}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={disable}
              onClick={handleSubmit}
            >
              Modificar
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}