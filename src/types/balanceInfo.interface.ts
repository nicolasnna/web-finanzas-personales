import { ColumnDef } from '@tanstack/react-table';

export interface BalanceInfo {
  id?: string;
  category: string;
  details?: string | undefined;
  currency: string;
  value: number;
  date: Date;
  dateLabel: string;
}

export const BalanceColumns: ColumnDef<BalanceInfo>[] = [
  { accessorKey: 'category', header: 'Categoría' },
  { accessorKey: 'details', header: 'Detalle' },
  { accessorKey: 'value', header: 'Valor' },
  { accessorKey: 'currency', header: 'Divisa' },
  { accessorKey: 'dateLabel', header: 'Fecha' },
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
