import { Category } from "@/types"
import { Eraser } from "lucide-react"
import { useContext, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { AuthContext } from "@/context/authContext"
import { deleteIncomeCategoryAPI } from "@/api/incomeCategories"
import { deleteExpenseCategoryAPI } from "@/api/expenseCategories"
import { useTypeCategoryStore } from "@/hooks/useTypeCategoryStore"
import { toast } from "sonner"

interface DialogDeleteCategoryInput {
  data: Category,
  type: 'incomes' | 'expenses'
}

export function DialogDeleteCategory({
  data,
  type,
} : DialogDeleteCategoryInput ) {
  const [showAlert, setShowAlert] = useState(false)
  const [disable, setDisable] = useState(false)
  const token = useContext(AuthContext).token
  const deleteStore = useTypeCategoryStore(type).deleteCategory

  const apiDeleteCategory: Record<string, (token:string, id: string) => Promise<Category>> = {
    incomes: deleteIncomeCategoryAPI,
    expenses: deleteExpenseCategoryAPI
  }

  const handleSubmit = () => {
    if (!token || !data.id) return;
    setDisable(() => true)
    toast.promise(
      apiDeleteCategory[type](token, data.id),
      {
        loading: 'Eliminando categoría...',
        success: () => {
          setShowAlert(() => false)
          if (data.id)
            deleteStore(data.id)
          return 'Categoría eliminada con exito'
        },
        error: (err) => err.message || 'Error al intentar eliminar la categoría'
      }
    )
    setDisable(() => false)
  }

  const handleClose = () => setShowAlert(false)

  return (
    <>
      <Eraser className='cursor-pointer hover:text-red-500' 
        onClick={() => setShowAlert(true)}
      />

      <AlertDialog open={showAlert}>
        <AlertDialogContent className='bg-blizzard-blue-100 border-2 border-blizzard-blue-700 border-b-4 border-r-4'>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Eliminar categoría
            </AlertDialogTitle>
            <AlertDialogDescription
              className="text-base text-orange-950"
            >
              <p>Categoría: <strong>{data.category}</strong></p>
            </AlertDialogDescription>
          </AlertDialogHeader>

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
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}