import { HTMLProps } from "react"
import { Path, UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface ValueFormFieldProps<T extends { value: number }>{
  form: UseFormReturn<T>
  className?: HTMLProps<HTMLElement>["className"]
}

function ValueFormField<T extends { value: number}>({form, className} : ValueFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={'value' as Path<T>}
      render={({field}) => (
        <FormItem className={className}>
          <FormLabel className="text-base text-blizzard-blue-950 font-semibold">
            Valor
          </FormLabel>
          <FormControl>
            <Input placeholder="Ingresar monto" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}

export default ValueFormField