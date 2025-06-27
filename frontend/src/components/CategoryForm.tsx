import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

const CategorySchema = z.object({
  category: z
    .string()
    .trim()
    .min(2, { message: 'Debe tener un mínimo de 3 letras' }),
  type: z.string().min(1, { message: 'Debes seleccionar un tipo' }),
});
type CategoryForm = z.infer<typeof CategorySchema>;

function CategoryForm() {
  const form = useForm<CategoryForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category: '',
      type: '',
    },
  });

  const handleSubmitForm = (values: z.infer<typeof CategorySchema>) => {
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-blizzard-blue-950 font-semibold">
                Nueva categoría
              </FormLabel>
              <FormControl>
                <Input placeholder="Escribe una nueva categoría" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-blizzard-blue-950 font-semibold">
                Tipo de transacción
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona si es ingreso o gasto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="incomes">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Ingreso
                    </div>
                  </SelectItem>
                  <SelectItem value="expenses">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      Gasto
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
