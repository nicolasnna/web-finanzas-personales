import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Category, CategorySchema, CategoryTypeForm } from '@/types';
import { Form } from '../ui/form';
import { NewCategoryFormField, TypeFormField } from '../FormField';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { addCategoryIncomeAPI } from '@/api/categoryIncomes';
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

  const apiTransaction: Record<string, (category: Category, token: string) => Promise<Category | Error>> = {
    incomes: addCategoryIncomeAPI,
    expenses: addCategoryExpenseAPI
  }

  const handleSubmitForm = (values: CategoryTypeForm) => {
    if (!token) return;
    setDisable(() => true)
    toast.promise(apiTransaction[values.type]({ category: values.category }, token), {
      loading: 'Creando categoria...',
      success: () => {
        setDisable(() => false)
        form.reset({ category: '', type: ''})
        return 'Categoría creada'
      },
      error: (err) => {
        setDisable(() => false)
        return err.message || 'No se ha logrado crear la categoría'
      }
    })
  };

  const handleClean = () => {
    form.reset({ category: '', type: '' });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className={`space-y-3 ${disable && 'opacity-40'}`} 
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
