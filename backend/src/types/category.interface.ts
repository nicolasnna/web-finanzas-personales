export interface Category {
  category: string
  id?: string;
}

export function isCategory(obj: any): obj is Category {
  if (typeof obj !== 'object' || obj === null) return false;

  const hasValidCategory = typeof obj.category === 'string' && obj.category.trim() !== '';
  const hasValidId = obj.id === undefined || typeof obj.id === 'string';
  const keyCountOk = Object.keys(obj).length <= 2;

  return hasValidCategory && hasValidId && keyCountOk;
}