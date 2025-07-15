import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from '@/store/useCategoryStore';
import { useLocalStorage } from './useLocalStorage';
import { Category } from '@/types';

export function useTypeCategoryStore(type: 'incomes' | 'expenses') {
  const localFunctions = useLocalStorage(
    type === 'incomes' ? 'categoryIncomes' : 'categoryExpenses'
  );

  const categoriesIncomes = useIncomeCategoriesStore((s) => s.categories);
  const categoriesExpenses = useExpenseCategoriesStore((s) => s.categories);

  const addCategoriesIncomes = useIncomeCategoriesStore((s) => s.addCategory);
  const addCategoriesExpenses = useExpenseCategoriesStore((s) => s.addCategory);

  const updateCategoryIncome = useIncomeCategoriesStore(
    (s) => s.updateCategory
  );
  const updateCategoryExpense = useExpenseCategoriesStore(
    (s) => s.updateCategory
  );

  const setCategoriesIncomes = useIncomeCategoriesStore((s) => s.setCategories);
  const setCategoriesExpenses = useExpenseCategoriesStore(
    (s) => s.setCategories
  );

  const deleteCategoryIncomes = useIncomeCategoriesStore(
    (s) => s.deleteCategory
  );
  const deleteCategoryExpenses = useExpenseCategoriesStore(
    (s) => s.deleteCategory
  );

  const cleanIncomes = useIncomeCategoriesStore((s) => s.cleanCategories);
  const cleanExpenses = useExpenseCategoriesStore((s) => s.cleanCategories);

  const categories =
    type === 'incomes' ? categoriesIncomes : categoriesExpenses;
  const addCategory =
    type === 'incomes' ? addCategoriesIncomes : addCategoriesExpenses;
  const updateCategory =
    type === 'incomes' ? updateCategoryIncome : updateCategoryExpense;
  const setCategories =
    type === 'incomes' ? setCategoriesIncomes : setCategoriesExpenses;
  const deleteCategory =
    type === 'incomes' ? deleteCategoryIncomes : deleteCategoryExpenses;
  const cleanCategory = type === 'incomes' ? cleanIncomes : cleanExpenses;

  const loadFromLocalStorage = () => {
    const demoValues = localFunctions.getValues() as Category[];
    setCategories(demoValues);
  };

  return {
    categories,
    addCategory,
    updateCategory,
    setCategories,
    deleteCategory,
    loadFromLocalStorage,
    cleanCategory
  };
}
