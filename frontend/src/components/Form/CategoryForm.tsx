import { addExpenseCategoryAPI } from '@/api/expenseCategories';
import { addIncomeCategoryAPI } from '@/api/incomeCategories';
import { AuthContext } from '@/context/authContext';
import { useTypeCategoryStore } from '@/hooks/useTypeCategoryStore';
import { Category, CategorySchema, CategoryTypeForm } from '@/types/Category.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { NewCategoryFormField, TypeFormField } from '../FormField';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { generateId } from '@/utils/functions';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface CategoryFormInput {
  typeDefault?: 'incomes' | 'expenses'
}

function CategoryForm({typeDefault}: CategoryFormInput) {
  const [disable, setDisable] = useState<boolean>(false)
  const token = useContext(AuthContext).token
  const form = useForm<CategoryTypeForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category: '',
      type: typeDefault ?? '',
    },
  });
  const localManage = useLocalStorage(form.watch().type === 'expenses' ? 'categoryExpenses' : 'categoryIncomes')
  const cleanCategories = useTypeCategoryStore(form.watch().type as 'incomes' | 'expenses' ?? 'incomes').cleanCategory
  const addCategory = useTypeCategoryStore(form.watch().type as 'incomes' | 'expenses' ?? 'incomes').addCategory

  const apiTransaction: Record<string, (category: Category, token: string) => Promise<Category | Error>> = {
    incomes: addIncomeCategoryAPI,
    expenses: addExpenseCategoryAPI
  }

  const handleSubmitForm = (values: CategoryTypeForm) => {
    if (!token) {
      const newCat = {
        id: generateId(),
        category: values.category,
      }
      addCategory(newCat)
      localManage.addValue(newCat)
      form.reset({ category: '', type: ''})
      toast.success('Se ha creado la categoría ' + values.category )
      return
    };
    setDisable(() => true)
    toast.promise(apiTransaction[values.type]({ category: values.category }, token), {
      loading: 'Creando categoria...',
      success: () => {
        setDisable(() => false)
        form.reset({ category: '', type: ''})
        cleanCategories()
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
        <TypeFormField defaultValue={typeDefault} form={form}/>
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
