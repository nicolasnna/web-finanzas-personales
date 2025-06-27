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

interface DetailsFormFieldProps<T extends { details: string }> {
  form: UseFormReturn<T>;
  className?: HTMLProps<HTMLElement>["className"];
}

function DetailsFormField<T extends { details: string }>({
  form,
  className,
}: DetailsFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={'details' as Path<T>}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base text-blizzard-blue-950 font-semibold">
            Detalle
          </FormLabel>
          <FormControl>
            <Input placeholder="(Opcional)" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DetailsFormField;
