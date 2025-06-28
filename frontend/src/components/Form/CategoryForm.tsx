import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Category, CategorySchema, CategoryTypeForm } from '@/types';
import { Form } from '../ui/form';
import { NewCategoryFormField, TypeFormField } from '../FormField';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { addCategoryIncomeAPI } from '@/api/CategoryIncomes';
import { addCategoryExpenseAPI } from '@/api/categoryExpenses';
import { toast } from 'sonner';

function CategoryForm() {
  const [disable, setDisable] = useState<boolean>(false)
  const token = useContext(AuthContext).token
  const form = useForm<CategoryTypeForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category: '',
      type: '',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiTransaction: Record<string, (category: Category, token: string) => Promise<any>> = {
    incomes: addCategoryIncomeAPI,
    expenses: addCategoryExpenseAPI
  }

  const handleSubmitForm = async (values: CategoryTypeForm) => {
    console.log(values);
    if (!token) return;
    setDisable(() => true)
    try {
      await toast.promise(apiTransaction[values.type]({category: values.category}, token), {
        loading: 'Creando categoria...',
        success: 'Categoría creada',
        error: (err) => err.message || 'No se ha logrado crear la categoría'
      })
      
      form.reset({ category: '', type: ''})
    } catch {
      throw new Error('Error al subir el registro de categoría')
    }
    setDisable(() => false)
  };

  const handleClean = () => {
    form.reset({ category: '', type: '' });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="space-y-3"
      >
        <NewCategoryFormField form={form}/>
        <TypeFormField form={form}/>
        <div className="flex items-center gap-2 justify-end">
          <Button variant="secondary" onClick={handleClean} type="reset" disabled={disable}>
            Limpiar
          </Button>
          <Button variant={'primary'} type="submit" disabled={disable}>
            Crear
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CategoryForm;
