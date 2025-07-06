import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatNumber } from '@/utils/functions';

export interface Transaction {
  id?: string;
  category: string;
  details?: string | undefined;
  currency: string;
  value: number;
  date: Date;
}

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const dateFormated = format(date, 'PPP', { locale: es });
      return dateFormated;
    },
  },
  { accessorKey: 'category', header: 'Categoría' },
  { accessorKey: 'details', header: 'Detalle' },
  {
    accessorKey: 'value',
    header: 'Valor',
    cell: ({ row }) =>
      formatNumber(row.getValue('value'), row.getValue('currency') ?? 'CLP'),
  },
  { accessorKey: 'currency', header: 'Divisa' },
];

export const TransactionSchema = z.object({
  type: z.string().min(1, { message: 'Debes seleccionar un tipo' }),
  category: z.string().min(1, { message: 'Selecciona una categoría' }),
  details: z.string().max(50),
  value: z.number().min(1, { message: 'Debe ser un número positivo' }),
  currency: z.enum(['CLP', 'USD', 'EUR'], {
    errorMap: () => ({ message: 'Selecciona una moneda válida' }),
  }),
  date: z.date({ required_error: 'Selecciona una fecha válida' }),
});

export type TransactionTypeForm = z.infer<typeof TransactionSchema>;
