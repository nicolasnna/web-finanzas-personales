import { z } from 'zod';

export const FinancialSchema = z.object({
  category: z.string().min(1, { message: 'Selecciona una categoría' }),
  details: z.string().optional(),
  value: z.number().min(5, { message: 'Debe ser un número positivo' }),
  currency: z.enum(['CLP', 'USD', 'EUR'], {
    errorMap: () => ({ message: 'Selecciona una moneda válida' }),
  }),
  date: z.date({ required_error: "Selecciona una fecha válida" }),
});

export type FinancialInfoForm = z.infer<typeof FinancialSchema>;