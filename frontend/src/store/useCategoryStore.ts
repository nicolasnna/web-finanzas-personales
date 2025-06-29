import { Category } from '@/types';
import { create } from 'zustand';

interface CategoryState {
  categories: Category[]
}

interface CategoryActions {
  addCategory: (cat: Category) => void
  setCategories: (cats: Category[]) => void
  deleteCategory: (cat: Category) => void
  cleanCategories: () => void
}

type CategoryStore = CategoryState & CategoryActions

export const createCategoryStore = () =>
  create<CategoryStore>((set, get) => ({
    categories: [],

    addCategory: (cat) => {
      const existing = get().categories
      // Evita duplicados (case‑insensitive)
      if (
        existing.some(
          (c) => c.category.toLowerCase() === cat.category.toLowerCase()
        )
      ) return

      set({ categories: [...existing, cat] })
    },

    setCategories: (cats) => {
      set({ categories: [...cats] })
    },

    deleteCategory: (cat) => {
      const filtered = get().categories.filter(
        (c) => c.category.toLowerCase() !== cat.category.toLowerCase()
      )
      set({ categories: filtered })
    },

    cleanCategories: () => {
      set({ categories: [] })
    },
  }))


export const useIncomeCategoriesStore = createCategoryStore()
export const useExpenseCategoriesStore = createCategoryStore()