import { z } from "zod";

export interface Transaction {
  id?: string;
  category: string;
  details?: string | undefined;
  currency: string;
  value: number;
  date: Date;
}

export const TransactionSchema = z.object({
  type: z.string().min(1, { message: 'Debes seleccionar un tipo' }),
  category: z.string().min(1, { message: 'Selecciona una categoría' }),
  details: z.string().max(50).optional(),
  value: z.number().min(1, { message: 'Debe ser un número positivo' }),
  currency: z.enum(['CLP', 'USD', 'EUR'], {
    errorMap: () => ({ message: 'Selecciona una moneda válida' }),
  }),
  date: z.date({ required_error: 'Selecciona una fecha válida' }),
});

export type TransactionTypeForm = z.infer<typeof TransactionSchema>;