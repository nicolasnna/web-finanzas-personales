import { getExpensesAPI } from '@/api/expenses';
import { getIncomesAPI } from '@/api/incomes';
import { AuthContext } from '@/context/authContext';
import { useTypeTransactionStore } from '@/hooks/useTypeTransactionStore';
import { TransactionColumns } from '@/types';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DialogDeleteTransaction } from '../Dialog/DialogDeleteTransaction';
import { DialogUpdateTransaction } from '../Dialog/DialogUpdateTransaction';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface TransactionTableProps {
  type?: 'incomes' | 'expenses';
}

export function TransactionTable({ type }: TransactionTableProps) {
  const { transaction, setTransaction, addTransactionArray} = useTypeTransactionStore(type ?? 'incomes')

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const token = useContext(AuthContext).token;

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !type) return;
      let res;
      if (type === 'incomes') {
        res = await getIncomesAPI(token);
      } else {
        res = await getExpensesAPI(token);
      }
      if (res instanceof Error) {
        console.error('Error al obtener transacciones:', res.message);
        return; // o muestra un toast
      }
      toast.success('Obtenido las 200 transacciones más recientes');
      setTransaction(res);
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, token]);

  const table = useReactTable({
    data: transaction,
    columns: TransactionColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  const getNextValues = async () => {
    if (!token || !type) return;
    let res;
    if (type === 'incomes') {
      res = await getIncomesAPI(
        token,
        new Date(transaction[transaction.length - 1].date)
      );
    } else {
      res = await getExpensesAPI(
        token,
        new Date(transaction[transaction.length - 1].date)
      );
    }
    if (res instanceof Error) {
      // console.error('Error al obtener transacciones:', res.message);
      return; // o muestra un toast
    }

    if (res.length === 0) {
      toast.success('No existen más transacciones');
      return;
    }
    toast.success('Se han cargado más transacciones');
    addTransactionArray(res)
  };

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
                  className={`text-center 
                    text-base
                    cursor-pointer
                    tracking-wide	
                    text-blizzard-blue-50 font-bold bg-blizzard-blue-900 ${
                      index === 0 && 'rounded-tl-2xl'
                    }`}
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
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-center text-secondary-950 font-semibold p-3"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className='p-2 flex justify-center gap-4'>
                  <DialogUpdateTransaction
                    data={row.original}
                    type={type ?? 'incomes'}
                  />
                  <DialogDeleteTransaction
                    data={row.original}
                    type={type ?? 'incomes'}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={TransactionColumns.length +1}
                className="h-24 text-center text-xl font-bold"
              >
                No hay resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex p-2 gap-2 justify-between flex-wrap">
        {transaction.length !== 0 && (
          <div className="flex items-center gap-1 ">
            <strong className="text-sm">{transaction.length}</strong>
            <span className="text-sm">Transacciones mostradas</span>
            <Button
              variant="secondary"
              className="my-0 mx-1"
              disabled={!token}
              onClick={getNextValues}
            >
              Más
            </Button>
          </div>
        )}
        <div className="flex items-center">
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
      </div>
    </article>
  );
}
