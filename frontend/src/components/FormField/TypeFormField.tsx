import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Path, UseFormReturn } from 'react-hook-form';
import { HTMLProps } from 'react';

interface TypeFormFieldProps<T extends { type: string }> {
  form: UseFormReturn<T>;
  className?: HTMLProps<HTMLElement>["className"];
  defaultValue?: 'incomes' | 'expenses';
}

function TypeFormField<T extends { type: string }>({
  form,
  className,
  defaultValue
}: TypeFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={'type' as Path<T>}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base text-blizzard-blue-950 font-semibold">
            Tipo de transacción
          </FormLabel>
          <Select
            name={field.name}
            onValueChange={field.onChange}
            defaultValue={defaultValue ?? field.value}
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
  );
}

export default TypeFormField;
