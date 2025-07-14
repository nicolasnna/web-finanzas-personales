import demoData from '@/utils/dataDemo.json'

const {categoryIncomes, categoryExpenses, incomes, expenses } = demoData 

export const demoValues = {
  categoryIncomes,
  categoryExpenses,
  incomes,
  expenses
}

export const URLS = {
  API_URL: import.meta.env.VITE_BACKEND_URL,
  HOME: '/',
  INCOMES: '/incomes',
  EXPENSES: '/expenses',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
  UNAUTHORIZED: '/401',
};

export const defaultCategoryExpense = [
  { category: 'Alquiler' },
  { category: 'Facturas' },
  { category: 'Transporte' },
];

export const COLORS = {
  INCOMES: "#00b512",
  EXPENSES: "#b50000"
}
Object.freeze(COLORS)

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const defaultCategoryIncome = [{ category: 'Salario' }];
