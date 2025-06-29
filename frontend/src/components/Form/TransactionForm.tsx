import { useLoadCategories } from '@/hooks/useLoadCategories';
import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from '@/store/useCategoryStore';
import { TransactionSchema, TransactionTypeForm } from '@/types';
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


function TransactionForm() {
  const incomeCategories = useIncomeCategoriesStore(
    (state) => state.categories
  );
  const expenseCategories = useExpenseCategoriesStore(
    (state) => state.categories
  );
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
  const typeValue = form.watch("type");

  useLoadCategories(typeValue)

  const handleSubmitForm = (values: TransactionTypeForm) => {
    console.log(values);
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

  const categoriesToShow = (typeValue === 'incomes' &&
    incomeCategories) ||
    (typeValue === 'expenses' && expenseCategories) || [
      { category: 'example1' },
      { category: 'example2' },
    ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-end"
      >
        <TypeFormField form={form} />
        <DetailsFormField form={form} />
        <DateFormField className="col-span-2 lg:col-span-1" form={form} />
        <CategoryFormField
          form={form}
          categories={categoriesToShow.map((c) => c.category)}
          disable={
            !(typeValue=== 'incomes' ||
            typeValue === 'expenses')
          }
        />
        <ValueFormField form={form} />
        <CurrencyFormField form={form} />

        <div className="flex gap-2 justify-end col-span-2 lg:col-span-3">
          <Button onClick={handleClearForm} type="reset" variant="secondary">
            Limpiar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TransactionForm;
