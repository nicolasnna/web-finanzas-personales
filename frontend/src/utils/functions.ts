import { BalanceInfo, Category, resumeBalanceInterface, resumeForCategoryInterface, resumeForYearMonth } from '@/types';
import { months } from './constants';

export const resumeBalance = (
  balanceRows: BalanceInfo[],
  categories: Category[]
): resumeBalanceInterface => {
  const resumeForCategory: resumeForCategoryInterface[] = categories.map((c) => ({
    category: c.category,
    value: 0,
  }));

  const resumeForYearMonth: resumeForYearMonth = {}
  let total = 0
  let lastYear = 0
  let lastMonth = 0
  for (const c of balanceRows) {
    const date = new Date(c.date)
    const year = date.getFullYear()
    const monthNro = date.getMonth()
    lastYear = lastYear < year ? year : lastYear
    if (lastYear <= year && lastMonth < monthNro) {
      lastMonth = monthNro
    }
    const month = months[monthNro]
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
  const lastMonthText = months[lastMonth]
  return {total, resumeForCategory, resumeForYearMonth, lastYear: lastYear, lastMonth: lastMonthText}
};

export const formatNumber = (value: number, currency: string) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: currency}).format(value);
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
