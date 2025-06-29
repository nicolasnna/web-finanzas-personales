import { Transaction } from '@/types';
import { create } from 'zustand';

interface TransactionState {
  transactions: Transaction[];
}

interface TransactionActions {
  addTransaction: (trans: Transaction) => void;
  setTransaction: (trans: Transaction[]) => void;
  cleanCategories: () => void;
}

type TransactionStore = TransactionState & TransactionActions;

const createTransactionStore = () =>
  create<TransactionStore>((set, get) => ({
    transactions: [],

    addTransaction: (trans) => {
      const existing = get().transactions;
      set({ transactions: [...existing, trans] });
    },

    setTransaction: (trans) => {
      set({ transactions: trans });
    },

    cleanCategories: () => {
      set({ transactions: []})
    },
  }));

export const useIncomesStore = createTransactionStore()
export const useExpensesStore = createTransactionStore()