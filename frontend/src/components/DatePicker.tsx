import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import {
  FormField,
  FormItem,
  FormControl,
} from '@/components/ui/form'; 
import { Button } from '@/components/ui/button'; 
import { Calendar } from '@/components/ui/calendar';
import { FinancialInfoForm } from "@/schemas/financialInfo.schema";
import { UseFormReturn } from "react-hook-form";
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { es } from 'date-fns/locale'

interface DatePicker {
  form: UseFormReturn<FinancialInfoForm>,
}

const DatePicker = ({form} : DatePicker) => {
  return (
    <FormField
    control={form.control}
    name="date"
    render={({ field }) => (
      <FormItem className="flex items-center w-full justify-start">
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn(
                "w-[300px] justify-start text-left font-normal",
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

export default DatePicker