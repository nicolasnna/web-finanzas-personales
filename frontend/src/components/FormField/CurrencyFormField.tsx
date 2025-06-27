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

interface CurrencyFormFieldProps<T extends { currency: string }> {
  form: UseFormReturn<T>;
  className?: HTMLProps<HTMLElement>['className'];
}

function CurrencyFormField<T extends { currency: string }>({
  form,
  className,
}: CurrencyFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={'currency' as Path<T>}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base text-blizzard-blue-950 font-semibold">
            Divisa
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la divisa" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="CLP">CLP</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CurrencyFormField;
