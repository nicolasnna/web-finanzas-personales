import { getExpenseCategoryAPI } from "@/api/expenseCategories";
import { getIncomeCategoryAPI } from "@/api/incomeCategories";
import { AuthContext } from "@/context/authContext";
import { useExpenseCategoriesStore, useIncomeCategoriesStore } from "@/store/useCategoryStore";
import { Category } from "@/types/Category.interface";
import { useCallback, useContext, useEffect } from "react";
import { toast } from "sonner";

export function useLoadCategories(type: string) {
  const token = useContext(AuthContext).token
  const incomeCategories = useIncomeCategoriesStore(s => s.categories);
  const setIncomeCategories = useIncomeCategoriesStore(s => s.setCategories)
  const expenseCategories = useExpenseCategoriesStore(s => s.categories);
  const setExpenseCategories = useExpenseCategoriesStore(s => s.setCategories)


  const load = useCallback(() => {
    if (!token) return
    if (type !== 'incomes' && type !== 'expenses') return

    const categories = type === 'incomes' ? incomeCategories : expenseCategories;
    if (categories.length > 0) return;

    const apiFn = type === 'incomes' ? getIncomeCategoryAPI : getExpenseCategoryAPI
    const setter = type === 'incomes' ? setIncomeCategories : setExpenseCategories
    const text = type === 'incomes' ? 'ingresos': 'gastos'

    toast.promise(
      apiFn(token),
      {
        loading: `Cargando categorías de ${text}…`,
        success: data => {
          setter(data as Category[])
          return `Categorías de ${text} actualizadas`;
        },
        error: err => err.message || `Error cargando categorías de ${text}`
      })
  }, [token, type, incomeCategories, expenseCategories, setIncomeCategories, setExpenseCategories])

  useEffect(() => {
    load()
  }, [load])

}