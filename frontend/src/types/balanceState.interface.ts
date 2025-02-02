import { BalanceInfo } from "./balanceInfo.interface";

export interface BalanceState {
  balanceRows: BalanceInfo[];
  addBalanceRow: (balance: BalanceInfo) => void;
  setBalanceRows: (balanceRows: BalanceInfo[]) => void;
  categories: string[];
  addCategory: (category: string) => void;
  setCategories: (categories: string[]) => void;
}