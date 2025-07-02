import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Category, CategorySchema, CategoryTypeForm } from '@/types';
import { Form } from '../ui/form';
import { NewCategoryFormField, TypeFormField } from '../FormField';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { addIncomeCategoryAPI } from '@/api/incomeCategories';
import { addExpenseCategoryAPI } from '@/api/expenseCategories';
import { toast } from 'sonner';
import { useExpenseCategoriesStore, useIncomeCategoriesStore } from '@/store/useCategoryStore';

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
  const cleanIncomes = useIncomeCategoriesStore(s => s.cleanCategories)
  const cleanExpenses = useExpenseCategoriesStore(s => s.cleanCategories)

  const apiTransaction: Record<string, (category: Category, token: string) => Promise<Category | Error>> = {
    incomes: addIncomeCategoryAPI,
    expenses: addExpenseCategoryAPI
  }

  const cleanCategories: Record<string, () => void> = {
    incomes: cleanIncomes,
    expenses: cleanExpenses
  }

  const handleSubmitForm = (values: CategoryTypeForm) => {
    if (!token) return;
    setDisable(() => true)
    toast.promise(apiTransaction[values.type]({ category: values.category }, token), {
      loading: 'Creando categoria...',
      success: () => {
        setDisable(() => false)
        form.reset({ category: '', type: ''})
        cleanCategories[values.type]()
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
