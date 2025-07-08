import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from '@/store/useCategoryStore';

export function useTypeCategoryStore(type: 'incomes' | 'expenses') {
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

  return {
    categories,
    addCategory,
    updateCategory,
    setCategories,
    deleteCategory,
  };
}
