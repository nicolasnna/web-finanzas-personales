import { deleteExpensesAPI } from "@/api/expenses"
import { deleteIncomesAPI } from "@/api/incomes"
import { AuthContext } from "@/context/authContext"
import { Transaction } from "@/types"
import { Eraser } from "lucide-react"
import { useContext, useState } from "react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { formatNumber } from "@/utils/functions"
import { useTypeTransactionStore } from "@/hooks/useTypeTransactionStore"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface DialogDeleteTransactionInput {
  data: Transaction,
  type: 'incomes' | 'expenses'
}

export function DialogDeleteTransaction({
  data,
  type
}: DialogDeleteTransactionInput) {
  const [showAlert, setShowAlert] = useState(false)
  const [disable, setDisable] = useState(false)
  const token = useContext(AuthContext).token
  const deleteStore = useTypeTransactionStore(type).deleteTransaction
  const deleteLocal = useLocalStorage(type).deleteValue

  const apiDeleteTransaction: Record<string, (token: string, id: string) => Promise<Transaction | Error>> = {
    incomes: deleteIncomesAPI,
    expenses: deleteExpensesAPI
  }

  const handleSubmit = () => {
    if (!data.id) return
    if (!token) {
      deleteStore(data.id)
      deleteLocal(data.id)
      toast.success('Se ha eliminado la transacción ' + data.details)
      setShowAlert(() => false)
      return
    };
    setDisable(() => true);
    toast.promise(
      apiDeleteTransaction[type](token, data.id),
      {
        loading: 'Eliminando transacción...',
        success: () => {
          setShowAlert(() => false)
          if (data.id)
            deleteStore(data.id)
          return 'Transacción eliminada con exito'
        },
        error: (err) => err.message || 'Error al intentar eliminar la transacción'
      }
    )
    setDisable(() => false)
  }

  const handleClose = () => setShowAlert(false)

  return (
    <>
    <Eraser className="cursor-pointer hover:text-red-500"
      onClick={() => setShowAlert(true)}
    />

    <AlertDialog open={showAlert}>
      <AlertDialogContent className="bg-blizzard-blue-100 border-2 border-blizzard-blue-700 border-b-4 border-r-4">
        <AlertDialogHeader>
          <AlertDialogTitle className='text-2xl'>
            Eliminar transacción
          </AlertDialogTitle>
          <AlertDialogDescription className='text-base text-orange-950'>
            <p>Tipo: <strong>{type === 'incomes' ? 'Ingreso' : 'Gasto'}</strong></p>
            <p>Detalle: <strong>{data.details}</strong></p>
            <p>Categoría: <strong>{data.category}</strong></p>
            <p>Valor: <strong>{formatNumber(data.value, data.currency)}</strong></p>
            <p>Fecha: <strong>{new Date(data.date).toLocaleString('es-CL')}</strong></p>
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