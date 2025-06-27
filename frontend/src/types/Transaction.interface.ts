export interface Transaction {
  id?: string;
  category: string;
  details?: string | undefined;
  currency: string;
  value: number;
  date: Date;
}