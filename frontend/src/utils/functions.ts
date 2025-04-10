import { BalanceInfo, category, resumeBalanceInterface, resumeForCategoryInterface, resumeForYearMonth } from '@/types';
import { months } from './constants';

export const resumeBalance = (
  balanceRows: BalanceInfo[],
  categories: category[]
): resumeBalanceInterface => {
  const resumeForCategory: resumeForCategoryInterface[] = categories.map((c) => ({
    category: c.category,
    value: 0,
  }));

  const resumeForYearMonth: resumeForYearMonth = {}
  let total = 0
  
  for (const c of balanceRows) {
    const date = new Date(c.date)
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    /* Checkear si existe */
    if (!resumeForYearMonth[year]) {
      resumeForYearMonth[year] = {};
    }
    if (resumeForYearMonth[year][month] === undefined) {
      resumeForYearMonth[year][month] = 0;
    }

    resumeForYearMonth[year][month] += c.value
    /* Resumir por */
    resumeForCategory.forEach(e => {
      if (e.category == c.category) {
        e.value += c.value;
      }
    });
    total += c.value
  }
  return {total, resumeForCategory, resumeForYearMonth}
};

export const formatNumber = (value: number, currency: string) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: currency}).format(value);
}