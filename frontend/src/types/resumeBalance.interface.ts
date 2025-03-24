export interface resumeForCategoryInterface {
  value: number;
  category: string;
}

export interface resumeBalanceInterface {
  total: number;
  resumeForCategory: resumeForCategoryInterface[]
}