import { Transaction } from "@/types";

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

export function sortTransactions(a: Transaction, b:Transaction) {
  if (a.value > b.value) {
    return -1
  } else if (a.value < b.value) {
    return 1
  } 

  return 0
}

export function generateId() {
  return "id" + Math.random().toString(16).slice(2)
}