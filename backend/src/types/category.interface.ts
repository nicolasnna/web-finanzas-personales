export interface category {
  category: string
  id?: string;
}

export function isCategory(obj: any): obj is category {
  const isObject = typeof obj === 'object'
  const isStringCategory = typeof obj?.category === 'string' && obj.category.trim() !== '';
  const objectKeys = Object.keys(obj).length <= 2;;

  return ( isObject && isStringCategory && objectKeys );
}