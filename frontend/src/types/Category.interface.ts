import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export interface Category {
  id?: string;
  category: string
}

export const CategoryColumns: ColumnDef<Category>[] = [
  {accessorKey: 'category', header: 'Categoría'}
]

export const CategorySchema = z.object({
  category: z
    .string()
    .trim()
    .min(2, { message: 'Debe tener un mínimo de 3 letras' }),
  type: z.string().min(1, { message: 'Debes seleccionar un tipo' }),
});

export type CategoryTypeForm = z.infer<typeof CategorySchema>;