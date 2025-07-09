import { useTypeCategoryStore } from '@/hooks/useTypeCategoryStore';
import { CategoryColumns } from '@/types';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DialogUpdateCategory } from '../Dialog/DialogUpdateCategory';
import { DialogDeleteCategory } from '../Dialog/DialogDeleteCategory';

interface CategoryTableInput {
  type: 'incomes' | 'expenses';
}

export function CategoryTable({ type }: CategoryTableInput) {
  const { categories } = useTypeCategoryStore(type);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  // const token = useContext(AuthContext).token;

  const table = useReactTable({
    data: categories,
    columns: CategoryColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  return (
    <article>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`text-center text-base cursor-pointer tracking-wide text-blizzard-blue-50 font-bold bg-blizzard-blue-900 ${index === 0 && 'rounded-tl-2xl'}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
              <TableHead
                className={`text-center 
                    text-base
                    cursor-pointer
                    tracking-wide	
                    text-blizzard-blue-50 font-bold bg-blizzard-blue-900 rounded-tr-2xl`}
              >
                Acciones
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => 
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => 
                (<TableCell
                  key={cell.id}
                  className="text-center text-secondary-950 font-semibold p-3"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>))}
              <TableCell className='p-2 flex justify-center gap-4'>
                <DialogUpdateCategory
                  type={type ?? 'incomes'}
                  data={row.original}
                />
                <DialogDeleteCategory 
                  type={type ?? 'incomes'}
                  data={row.original}
                />
              </TableCell>
            </TableRow>)
          ) : (
            <TableRow>
              <TableCell
                colSpan={CategoryColumns.length +1}
                className="h-24 text-center text-xl font-bold"
              >
                No hay resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end py-2">
          {table.getPageCount() !== 0 && (
            <div className="mx-5 flex items-center">
              <span className="text-sm">
                Página{' '}
                <strong>
                  {table.getState().pagination.pageIndex + 1} de{' '}
                  {table.getPageCount()}
                </strong>
              </span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
    </article>
  );
}
