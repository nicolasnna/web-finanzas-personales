import { BalanceInfo } from "./balanceInfo.interface";
import { category } from "./Category.interface";

export interface BalanceState {
  balanceRows: BalanceInfo[];
  addBalanceRow: (balance: BalanceInfo) => void;
  setBalanceRows: (balanceRows: BalanceInfo[]) => void;
  categories: category[];
  addCategory: (category: category) => void;
  setCategories: (categories: category[]) => void;
}