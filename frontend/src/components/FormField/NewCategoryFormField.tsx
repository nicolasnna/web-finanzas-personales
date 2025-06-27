import { Path, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { HTMLProps } from 'react';

interface NewCategoryFormFieldProps<T extends { category: string }> {
  form: UseFormReturn<T>;
  className?: HTMLProps<HTMLElement>["className"];
}

function NewCategoryFormField<T extends { category: string }>({
  form,
  className,
}: NewCategoryFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={'category' as Path<T>}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base text-blizzard-blue-950 font-semibold"
            htmlFor={field.name}
          >
            Nueva categoría
          </FormLabel>
          <FormControl>
            <Input id={field.name} placeholder="Escribe una nueva categoría" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default NewCategoryFormField;
