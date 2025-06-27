import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/form'; 
import { Button } from '@/components/ui/button'; 
import { Calendar } from '@/components/ui/calendar';
import { Path, UseFormReturn } from "react-hook-form";
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { es } from 'date-fns/locale'
import { HTMLProps } from "react";

interface DateFormFieldProps<T extends { date: Date }> {
  form: UseFormReturn<T>,
  className?: HTMLProps<HTMLElement>["className"]
}

function DateFormField<T extends { date: Date }>({form, className}: DateFormFieldProps<T>) {
  return (
    <FormField
    control={form.control}
    name={"date" as Path<T>}
    render={({ field }) => (
      <FormItem className={className}>
        <FormLabel className="text-base text-blizzard-blue-950 font-semibold">
          Fecha
        </FormLabel>
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn(
                "justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}>
                <CalendarIcon />
                {field.value
                  ? format(field.value, "PPP", {locale: es}) // Formatea la fecha
                  : "Selecciona una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0 bg-white border border-gray-200 rounded-md shadow-md">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange} 
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      </FormItem>
    )}
  />
  )
}

export default DateFormField