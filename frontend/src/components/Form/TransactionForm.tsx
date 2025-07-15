import { addExpenseAPI } from '@/api/expenses';
import { addIncomeAPI } from '@/api/incomes';
import { AuthContext } from '@/context/authContext';
import { useLoadCategories } from '@/hooks/useLoadCategories';
import { useTypeCategoryStore } from '@/hooks/useTypeCategoryStore';
import { useTypeTransactionStore } from '@/hooks/useTypeTransactionStore';
import { Transaction, TransactionSchema, TransactionTypeForm, TypeTransaction } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  CategoryFormField,
  DateFormField,
  DetailsFormField,
  TypeFormField,
  ValueFormField,
} from '../FormField';
import CurrencyFormField from '../FormField/CurrencyFormField';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateId } from '@/utils/functions';

const dictAddTransaction: Record<string, (data: Transaction, token: string) => Promise<Transaction | Error>> = {
  incomes: addIncomeAPI,
  expenses: addExpenseAPI
}

interface TransactionFormInput {
  typeDefault?: 'incomes' | 'expenses'
}

function TransactionForm({typeDefault}: TransactionFormInput) {
  const [disable, setDisable] = useState<boolean>(false)
  const form = useForm<TransactionTypeForm>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: typeDefault ?? '',
      category: '',
      details: '',
      value: 0,
      currency: 'CLP',
      date: new Date(),
    },
  });
  const typeValue = form.watch('type');
  const token = useContext(AuthContext).token
  const categories = useTypeCategoryStore(typeValue as TypeTransaction).categories
  const addTransaction = useTypeTransactionStore(typeValue as TypeTransaction).addTransaction
  const localManage = useLocalStorage(typeValue as TypeTransaction)

  useLoadCategories(typeValue);

  const handleSubmitForm = (values: TransactionTypeForm) => {
    if (!token) {
      const newTrans: Transaction = {
        id: generateId(),
        category: values.category,
        details: values.details,
        currency: values.currency,
        value: values.value,
        date: values.date
      }
      addTransaction(newTrans)
      localManage.addValue(newTrans)
      handleClearForm()
      toast.success('Se ha creado la transacción ' + values.details)
      return
    };
    setDisable(() => true)
    toast.promise(dictAddTransaction[values.type](values, token),{
      loading: 'Creando registro...',
      success: (res) => {
        setDisable(() => false)
        handleClearForm()
        // const dataToLoad = {...res, date: new Date(res.date)}
        addTransaction(res as Transaction)
        return 'Registro creado con exito'
      },
      error: (err) => {
        setDisable(() => false)
        return err.message || 'No se ha podido crear el registro'
      },
    })
  };

  const handleClearForm = () => {
    form.reset({
      type: '',
      category: '',
      details: '',
      value: 0,
      currency: 'CLP',
      date: new Date(),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className={`grid grid-cols-2 lg:grid-cols-3 gap-4 items-end ${disable && 'opacity-40'}`}
      >
        <TypeFormField form={form} defaultValue={typeDefault}/>
        <DetailsFormField form={form} />
        <DateFormField className="col-span-2 lg:col-span-1" form={form} />
        <CategoryFormField
          form={form}
          categories={categories.map((c) => c.category)}
          disable={!(typeValue === 'incomes' || typeValue === 'expenses')}
        />
        <ValueFormField form={form} />
        <CurrencyFormField form={form} />

        <div className="flex gap-2 justify-end col-span-2 lg:col-span-3">
          <Button onClick={handleClearForm} type="reset" variant="secondary" disabled={disable}>
            Limpiar
          </Button>
          <Button type="submit" variant="primary" disabled={disable}>
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TransactionForm;
