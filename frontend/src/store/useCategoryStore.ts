import { Category } from '@/types/Category.interface';
import { create } from 'zustand';

interface CategoryState {
  categories: Category[];
}

interface CategoryActions {
  addCategory: (cat: Category) => void;
  updateCategory: (id: string, cat: Category) => void;
  setCategories: (cats: Category[]) => void;
  deleteCategory: (id: string) => void;
  cleanCategories: () => void;
}

type CategoryStore = CategoryState & CategoryActions;

export const createCategoryStore = () =>
  create<CategoryStore>((set, get) => ({
    categories: [],

    addCategory: (cat) => {
      const existing = get().categories;
      // Evita duplicados (case‑insensitive)
      if (
        existing.some(
          (c) => c.category.toLowerCase() === cat.category.toLowerCase()
        )
      )
        return;

      set({ categories: [...existing, cat] });
    },

    updateCategory: (id, cat) => {
      const updated = get().categories.map((c) =>
        c.id === id ? { ...c, ...cat } : c
      );
      set({ categories: updated });
    },

    setCategories: (cats) => {
      set({ categories: [...cats] });
    },

    deleteCategory: (id) => {
      const filtered = get().categories.filter((c) => c.id !== id);
      set({ categories: filtered });
    },

    cleanCategories: () => {
      set({ categories: [] });
    },
  }));

export const useIncomeCategoriesStore = createCategoryStore();
export const useExpenseCategoriesStore = createCategoryStore();
