import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BalanceColumns, BalanceInfo } from '@/types';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const FinancialTable = ({
  title,
  content,
}: {
  title: string;
  content: BalanceInfo[];
}) => {

  const table = useReactTable({
    data: content,
    columns: BalanceColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-[700px]  z-10">
      <div className="p-4">
        <h2 className="text-2xl font-semibold ">{title}</h2>
      </div>
      <Table className="border-collapse border border-gray-300">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={BalanceColumns.length}
                className="h-24 text-center"
              >
                No hay resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FinancialTable;
