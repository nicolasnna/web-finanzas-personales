import { useForm } from 'react-hook-form';
import { Form } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionSchema, TransactionTypeForm } from '@/types';
import TypeFormField from './Form/TypeFormField';
import NewCategoryFormField from './Form/NewCategoryFormField';
import DateFormField from './Form/DateFormField';
import ValueFormField from './Form/ValueFormField';

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
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className='grid grid-cols-6 gap-4'>
        <NewCategoryFormField className='col-span-4' form={form}/>
        <TypeFormField className='col-span-2' form={form}/>
        <DateFormField className='col-span-2' form={form}/>
        <ValueFormField className='col-span-2' form={form}/>
      </form>
    </Form>
  );
}

export default TransactionForm;
