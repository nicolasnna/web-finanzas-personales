import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionSchema, TransactionTypeForm } from '@/types';
import {
  CategoryFormField,
  DateFormField,
  DetailsFormField,
  TypeFormField,
  ValueFormField,
} from '../FormField';

function TransactionForm() {
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

  const handleSubmitForm = (values: TransactionTypeForm) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="grid grid-cols-3 gap-4"
      >
        <TypeFormField form={form} />
        <DetailsFormField form={form} />
        <DateFormField form={form} />
        <CategoryFormField form={form} categories={['cat1', 'cat2']} />
        <ValueFormField form={form} />
      </form>
    </Form>
  );
}

export default TransactionForm;
