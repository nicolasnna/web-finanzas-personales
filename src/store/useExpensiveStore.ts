import { BalanceInfo, BalanceState } from "@/types";
import { create } from "zustand";

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createBalanceStore = (
  balanceRowsKey: "balanceRows",
  categoryKey: "categories",
  initialCategory: string[]
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
        set((state) => ({
          ...state,
          [balanceRowsKey]: balanceRows,
        }));
      },
      addCategory: (category: string) => {
        set((state) => {
          const categories = state[categoryKey];
          if (!categories.every(c => c.toLowerCase() === category.toLowerCase())) {
            return {
              ...state,
              [categoryKey]: [...categories, category],
            };
          }
          return state
        });
      },
      setCategories: (categories: string[]) => {
        set((state) => ({
          ...state,
          [categoryKey]: categories,
        }));
      },
    };

    return store;
  });

export const useExpenseStore = createBalanceStore("balanceRows", "categories", ["Alquiler", "Facturas", "Transporte"]);
export const useIncomeStore = createBalanceStore("balanceRows", "categories", ["Salario"]);
