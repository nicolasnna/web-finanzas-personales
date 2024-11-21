import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface BalanceInfo {
  id?: string;
  category: string;
  details?: string | undefined;
  currency: string;
  value: number;
  date: Date;
}

export const BalanceColumns: ColumnDef<BalanceInfo>[] = [
  { accessorKey: 'category', header: 'Categoría' },
  { accessorKey: 'details', header: 'Detalle' },
  { accessorKey: 'value', header: 'Valor' },
  { accessorKey: 'currency', header: 'Divisa' },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const dateFormated = format(date, 'PPP', { locale: es });
      return dateFormated;
    },
  },
];

export function isBalanceInfo(input: object): input is BalanceInfo {
  return (
    typeof input === 'object' &&
    'category' in input &&
    'details' in input &&
    'value' in input &&
    'date' in input
  );
}
