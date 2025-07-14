import { useExpensesStore, useIncomesStore } from '@/store/useTransactionStore';
import { useLocalStorage } from './useLocalStorage';
import { Transaction } from '@/types';

export function useTypeTransactionStore(type: 'incomes' | 'expenses') {
  const localFunctions = useLocalStorage(type)

  const incomesTransaction = useIncomesStore((s) => s.transactions);
  const expensesTransaction = useExpensesStore((s) => s.transactions);

  const setIncomesTransaction = useIncomesStore((s) => s.setTransaction);
  const setExpensesTransaction = useExpensesStore((s) => s.setTransaction);

  const addIncomes = useIncomesStore((s) => s.addTransaction);
  const addExpenses = useExpensesStore((S) => S.addTransaction);

  const addIncomesArray = useIncomesStore((s) => s.addTransactionsArray);
  const addExpensesArray = useExpensesStore((s) => s.addTransactionsArray);

  const deleteIncomes = useIncomesStore((s) => s.deleteTransaction);
  const deleteExpenses = useExpensesStore((s) => s.deleteTransaction);

  const updateIncomes = useIncomesStore(s => s.updateTransaction)
  const updateExpenses = useExpensesStore(s => s.updateTransaction)

  const transaction =
    type === 'incomes' ? incomesTransaction : expensesTransaction;
  const setTransaction =
    type === 'incomes' ? setIncomesTransaction : setExpensesTransaction;
  const addTransaction = type === 'incomes' ? addIncomes : addExpenses;
  const addTransactionArray =
    type === 'incomes' ? addIncomesArray : addExpensesArray;
  const deleteTransaction = type === 'incomes' ? deleteIncomes : deleteExpenses;
  const updateTransaction = type === 'incomes' ? updateIncomes : updateExpenses

  const loadFromLocalStorage = () => {
    const demoValues = localFunctions.getValues() as Transaction[]
    setTransaction(demoValues)
  }

  return {
    transaction,
    setTransaction,
    addTransaction,
    addTransactionArray,
    deleteTransaction,
    updateTransaction,
    loadFromLocalStorage
  };
}
