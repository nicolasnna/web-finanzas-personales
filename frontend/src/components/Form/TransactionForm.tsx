import { useLoadCategories } from '@/hooks/useLoadCategories';
import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from '@/store/useCategoryStore';
import { Transaction, TransactionSchema, TransactionTypeForm } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { addIncomeAPI } from '@/api/incomes';
import { addExpenseAPI } from '@/api/expenses';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { toast } from 'sonner';

const dictAddTransaction: Record<string, (data: Transaction, token: string) => Promise<Transaction | Error>> = {
  incomes: addIncomeAPI,
  expenses: addExpenseAPI
}

function TransactionForm() {
  const [disable, setDisable] = useState<boolean>(false)
  const incomeCategories = useIncomeCategoriesStore((s) => s.categories);
  const expenseCategories = useExpenseCategoriesStore((s) => s.categories);
  const form = useForm<TransactionTypeForm>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: '',
      category: '',
      details: '',
      value: 0,
      currency: 'CLP',
      date: new Date(),
    },
  });
  const typeValue = form.watch('type');
  const token = useContext(AuthContext).token

  useLoadCategories(typeValue);

  const handleSubmitForm = (values: TransactionTypeForm) => {
    if (!token) return;
    setDisable(() => true)
    toast.promise(dictAddTransaction[values.type](values, token),{
      loading: 'Creando registro...',
      success: () => {
        setDisable(() => false)
        return 'Registro creado con exito'
      },
      error: (err) => {
        setDisable(() => false)
        return err.message || 'No se ha podido crear el registro'
      }
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

  const categoriesToShow = (typeValue === 'incomes' && incomeCategories) ||
    (typeValue === 'expenses' && expenseCategories) || [
      { category: 'example1' },
      { category: 'example2' },
    ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className={`grid grid-cols-2 lg:grid-cols-3 gap-4 items-end ${disable && 'opacity-40'}`}
      >
        <TypeFormField form={form} />
        <DetailsFormField form={form} />
        <DateFormField className="col-span-2 lg:col-span-1" form={form} />
        <CategoryFormField
          form={form}
          categories={categoriesToShow.map((c) => c.category)}
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
