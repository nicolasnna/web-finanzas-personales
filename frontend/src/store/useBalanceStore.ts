import { BalanceInfo, BalanceState, category } from "@/types";
import { defaultCategoryExpense, defaultCategoryIncome } from "@/utils/constants";
import { create } from "zustand";

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createBalanceStore = (
  balanceRowsKey: "balanceRows",
  categoryKey: "categories",
  initialCategory: category[]
) =>
  create<BalanceState>((set) => {
    const store: BalanceState = {
      balanceRows: [],
      categories: [...initialCategory],

      addBalanceRow: (balance: BalanceInfo) => {
        const newId = generateId();
        set((state) => {
          const balanceRows = state[balanceRowsKey];
          return {
            ...state,
            [balanceRowsKey]: [...balanceRows, { ...balance, id: newId }],
          };
        });
      },
      setBalanceRows: (balanceRows: BalanceInfo[]) => {
        set(() => ({
          [balanceRowsKey]: balanceRows,
        }));
      },
      addCategory: (category: category) => {
        set((state) => {
          const categories = state[categoryKey];
          if (!categories.every(c => c.category.toLowerCase() === category.category.toLowerCase())) {
            return {
              ...state,
              [categoryKey]: [...categories, category],
            };
          }
          return state
        });
      },
      setCategories: (categories: category[]) => {
        set((state) => ({
          ...state,
          [categoryKey]: categories,
        }));
      },
    };

    return store;
  });

export const useExpenseStore = createBalanceStore("balanceRows", "categories", defaultCategoryExpense);
export const useIncomeStore = createBalanceStore("balanceRows", "categories", defaultCategoryIncome);
