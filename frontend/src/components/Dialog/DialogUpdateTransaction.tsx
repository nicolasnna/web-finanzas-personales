import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from '@/store/useCategoryStore';
import { Transaction, TransactionSchema, TransactionTypeForm } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CategoryFormField,
  DateFormField,
  DetailsFormField,
  ValueFormField,
} from '../FormField';
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
import CurrencyFormField from '../FormField/CurrencyFormField';
import { updateIncomesAPI } from '@/api/incomes';
import { updateExpensesAPI } from '@/api/expenses';
import { AuthContext } from '@/context/authContext';
import { toast } from 'sonner';

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
  const incomesCategories = useIncomeCategoriesStore((s) => s.categories);
  const expensesCategories = useExpenseCategoriesStore((s) => s.categories);
  const categories =
    type === 'incomes' ? incomesCategories : expensesCategories;
  const token = useContext(AuthContext).token;

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

  const handleSubmit = async () => {
    if (!token || !data.id) return;
    setDisable(() => true);
    toast.promise(
      apiUpdateTransaction[type](token, data.id, updateForm.watch()),
      {
        loading: 'Actualizando transacción...',
        success: () => {
          setShowAlert(() => false);
          return 'Transacción actualizada con exito, recarge para ver los cambios';
        },
        error: (err) => err.message || 'No se ha realizado la actualización',
        action: {
          label: 'Recargar',
          onClick: () => location.reload()
        }
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
