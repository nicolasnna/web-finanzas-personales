export interface resumeForCategoryInterface {
  value: number;
  category: string;
}

export interface resumeForMonth {
  [month: string]: number
}

export interface resumeForYearMonth {
  [year: number]: resumeForMonth
}

export interface resumeBalanceInterface {
  total: number;
  resumeForCategory: resumeForCategoryInterface[];
  resumeForYearMonth: resumeForYearMonth;
  lastYear: number;
  lastMonth: string;
}