import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { CategorySchema, CategoryTypeForm } from '@/types';
import { Form } from '../ui/form';
import { NewCategoryFormField, TypeFormField } from '../FormField';

function CategoryForm() {
  const form = useForm<CategoryTypeForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category: '',
      type: '',
    },
  });

  const handleSubmitForm = (values: CategoryTypeForm) => {
    console.log(values);
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
          <Button variant="secondary" onClick={handleClean} type="reset">
            Limpiar
          </Button>
          <Button variant={'primary'} type="submit">
            Crear
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CategoryForm;
