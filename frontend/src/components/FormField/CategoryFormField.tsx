import { HTMLProps } from "react"
import { Path, UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface CategoryFormFieldProps<T extends { category: string }>{
  form: UseFormReturn<T>
  className?: HTMLProps<HTMLElement>["className"],
  categories: Array<string>
}

function CategoryFormField<T extends { category: string}>({form, className, categories} : CategoryFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={'category' as Path<T>}
      render={({field}) => (
        <FormItem className={className}>
          <FormLabel className="text-base text-blizzard-blue-950 font-semibold" htmlFor={field.name}>
            Categoría
          </FormLabel>
          <Select
            name={field.name}
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger id={field.name}>
                <SelectValue placeholder='Selecciona la categoría'/>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}

export default CategoryFormField