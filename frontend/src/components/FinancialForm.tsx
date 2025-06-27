import { BalanceInfo, BalanceState, Category } from '@/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'; // Ajusta la ruta según tu proyecto
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FinancialInfoForm, FinancialSchema } from '@/schemas/financialInfo.schema';
import DatePicker from './DatePicker';
import { Button } from '@components/ui/button';
import CategoryForm from './CategoryFormPREV';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

interface FinancialFormInputs extends BalanceState {
  title: string;
  addDb: (data: BalanceInfo, token: string) => void;
  addCategoryDb: (category: Category, token: string) => void;
}

const FinancialForm = ({
  title,
  addBalanceRow,
  categories,
  addCategory,
  addDb,
  addCategoryDb
}: FinancialFormInputs) => {
  const {user} = useContext(AuthContext)
  const form = useForm<FinancialInfoForm>({
    resolver: zodResolver(FinancialSchema),
    defaultValues: {
      category: '',
      details: '',
      value: 0,
      currency: 'CLP',
      date: new Date(),
    },
  });

  const onSubmit: SubmitHandler<FinancialInfoForm> = async (data) => {
    console.log(data);
    if (user) {
      await addDb(data, user);
      addBalanceRow(data)
    } else {
      console.error('User is null');
      addBalanceRow(data)
    }
    form.reset()
  };

  return (
    <Card className='h-max z-10'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

            {/* Categoria */}
            <FormLabel className="text-xm">Categoría:</FormLabel>
            <div className='flex justify-between items-center gap-3'>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.category} value={c.category}>
                            {c.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <CategoryForm addResult={addCategory} addDb={addCategoryDb}/>
            </div>

            {/* Details */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xm">Detalle:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa un detalle descriptivo"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex gap-3 justify-start'>
              {/* Valor */}
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xm">Valor:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa el valor"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Divisa */}
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xm">Divisa:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'CLP'}>CLP - Peso chileno</SelectItem>
                        <SelectItem value={'USD'}>
                          USD - Dólar estadounidense
                        </SelectItem>
                        <SelectItem value={'EUR'}>EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Fecha */}
            <div className='py-3'>
              <DatePicker form={form}/>
            </div>
            
            <div className='flex items-center justify-between'>
              <Button type='submit'>Guardar</Button>
              <Button variant="outline" onClick={() => form.reset()}>Limpiar</Button>
            </div>
          </form>
        </Form>

      </CardContent>
    </Card>
  );
};

export default FinancialForm;
