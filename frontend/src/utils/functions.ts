import { BalanceInfo, category, resumeBalanceInterface } from '@/types';

export const resumeBalance = (
  balanceRows: BalanceInfo[],
  categories: category[]
): resumeBalanceInterface => {
  const resumeForCategory = [];
  let total = 0
  for (const c of categories) {
    resumeForCategory.push({category: c.category, value: 0})
  }
  for (const c of balanceRows) {
    resumeForCategory.forEach(e => {
      if (e.category == c.category) {
        e.value += c.value;
      }
    });
    total += c.value
  }
  return {total, resumeForCategory}
};

interface addCategoryWithDbInterface {
  addCategory: (category: string) => void;
  token: string;
  addCategoryService: <T>(category: string, token: string) => Promise<T>;
  category: string;
}

export const addCategoryWithDb = async ({
  addCategory,
  token,
  addCategoryService,
  category,
}: addCategoryWithDbInterface) => {
  await addCategoryService(category, token)
  addCategory(category)
};
