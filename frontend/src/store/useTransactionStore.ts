import { Transaction } from '@/types/Transaction.interface';
import { create } from 'zustand';

interface TransactionState {
  transactions: Transaction[];
}

interface TransactionActions {
  addTransaction: (trans: Transaction) => void;
  addTransactionsArray: (trans: Transaction[]) => void;
  deleteTransaction: (id: string) => void;
  setTransaction: (trans: Transaction[]) => void;
  cleanCategories: () => void;
  updateTransaction: (id: string, trans: Transaction) => void;
}

type TransactionStore = TransactionState & TransactionActions;

const createTransactionStore = () =>
  create<TransactionStore>((set, get) => ({
    transactions: [],

    addTransaction: (trans) => {
      const existing = get().transactions;
      set({ transactions: [...existing, trans] });
    },

    addTransactionsArray: (trans) => {
      const existing = get().transactions;
      set({ transactions: [...existing, ...trans] });
    },

    deleteTransaction: (id) => {
      const filterData = get().transactions.filter((t) => t.id !== id);
      set({ transactions: [...filterData] });
    },

    setTransaction: (trans) => {
      set({ transactions: trans });
    },

    cleanCategories: () => {
      set({ transactions: [] });
    },

    updateTransaction: (id, trans) => {
      const updated = get().transactions.map((t) =>
        t.id === id ? { ...t, ...trans } : t
      );
      set({ transactions: updated });
    },
  }));

export const useIncomesStore = createTransactionStore();
export const useExpensesStore = createTransactionStore();
