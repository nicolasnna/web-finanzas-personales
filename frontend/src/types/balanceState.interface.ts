import { BalanceInfo } from "./balanceInfo.interface";

export interface category {
  id?: string;
  category: string
}

export interface BalanceState {
  balanceRows: BalanceInfo[];
  addBalanceRow: (balance: BalanceInfo) => void;
  setBalanceRows: (balanceRows: BalanceInfo[]) => void;
  categories: category[];
  addCategory: (category: category) => void;
  setCategories: (categories: category[]) => void;
}