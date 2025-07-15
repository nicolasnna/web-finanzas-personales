import { updateExpensesAPI } from '@/api/expenses';
import { updateIncomesAPI } from '@/api/incomes';
import { AuthContext } from '@/context/authContext';
import { useTypeCategoryStore } from '@/hooks/useTypeCategoryStore';
import { useTypeTransactionStore } from '@/hooks/useTypeTransactionStore';
import { Transaction, TransactionSchema, TransactionTypeForm } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  CategoryFormField,
  DateFormField,
  DetailsFormField,
  ValueFormField,
} from '../FormField';
import CurrencyFormField from '../FormField/CurrencyFormField';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Form } from '../ui/form';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface DialogUpdateTransactionInput {
  data: Transaction;
  type: 'incomes' | 'expenses';
}

export function DialogUpdateTransaction({
  data,
  type,
}: DialogUpdateTransactionInput) {
  const [showAlert, setShowAlert] = useState(false);
  const [disable, setDisable] = useState(false);

  const categories = useTypeCategoryStore(type).categories
  const token = useContext(AuthContext).token;
  const updateStore = useTypeTransactionStore(type).updateTransaction
  const updateLocal = useLocalStorage(type).updateValue

  const updateForm = useForm<TransactionTypeForm>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      category: data.category,
      details: data.details,
      value: data.value,
      currency: data.currency as 'CLP' | 'USD' | 'EUR',
      date: data.date,
    },
  });

  const apiUpdateTransaction: Record<
    string,
    (
      token: string,
      id: string,
      data: Transaction
    ) => Promise<Transaction | Error>
  > = {
    incomes: updateIncomesAPI,
    expenses: updateExpensesAPI,
  };

  const handleSubmit = () => {
    if (!data.id) return
    const newData = {...updateForm.watch()}
    if (!token) {
      updateStore(data.id, newData)
      updateLocal(data.id, newData)
      toast.success('Se ha actualizado la transacción '+ newData.details)
      setShowAlert(() => false)
      return
    };
    setDisable(() => true);
    toast.promise(
      apiUpdateTransaction[type](token, data.id, updateForm.watch()),
      {
        loading: 'Actualizando transacción...',
        success: () => {
          setShowAlert(() => false);
          if (data.id)
            updateStore(data.id, updateForm.watch())
          return 'Transacción actualizada con exito';
        },
        error: (err) => err.message || 'No se ha realizado la actualización',
      }
    );
    setDisable(() => false);
  };

  const handleClose = () => {
    setShowAlert(false)
    updateForm.reset({
      category: data.category,
      details: data.details,
      value: data.value,
      currency: data.currency as 'CLP' | 'USD' | 'EUR',
      date: data.date,
    })
  }

  return (
    <>
      <Pencil
        className="cursor-pointer hover:text-green-500"
        onClick={() => setShowAlert(true)}
      />

      <AlertDialog open={showAlert}>
        <AlertDialogContent className="bg-blizzard-blue-100 border-2 border-blizzard-blue-700 border-b-4 border-r-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Modificar transacción
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-orange-950">
              Cambia los campos para la actualización
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...updateForm}>
            <form
              onSubmit={updateForm.handleSubmit(handleSubmit)}
              className="grid grid-cols-2 gap-2"
            >
              <DetailsFormField
                form={updateForm}
                className="flex gap-2 justify-center items-center col-span-2"
              />

              <ValueFormField
                form={updateForm}
                className="flex gap-2 justify-center items-center"
              />

              <CurrencyFormField
                form={updateForm}
                className="flex gap-2 justify-center items-center"
              />

              <CategoryFormField
                categories={categories.map((c) => c.category)}
                form={updateForm}
                className="flex gap-2 justify-center items-center col-span-2 sm:col-span-1"
              />

              <DateFormField
                form={updateForm}
                className="flex flex-row gap-2 justify-start items-center col-span-2 sm:col-span-1"
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
            <AlertDialogAction onClick={handleSubmit} disabled={disable}>
              Modificar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
