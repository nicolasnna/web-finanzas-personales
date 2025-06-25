export const URLS = {
  API_URL: 'http://localhost:4000/api',
  HOME: '/',
  INCOMES: '/incomes',
  EXPENSES: '/expenses',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
  UNAUTHORIZED: '/401',
};
Object.freeze(URLS)

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
