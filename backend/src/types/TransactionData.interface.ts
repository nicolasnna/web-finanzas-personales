export interface TransactionData {
  id?: string;
  category?: string;
  details?: string;
  currency: string;
  value: number;
  date: Date;
}

export function isTransactionData(obj: any): obj is TransactionData {
  if (typeof obj !== "object" || obj === null) return false;

  const hasValidId = obj.id === undefined || typeof obj.id === "string";

  const hasValidCategory =
    obj.category === undefined || typeof obj.category === "string";
  const hasDetails =
    obj.details === undefined || typeof obj.details === "string";
  const hasCurrency = typeof obj.currency === "string";
  const hasValue =
    typeof obj.value === "number" && obj.value >= 0 && !isNaN(obj.value);
  const hasDate =
    (obj.date instanceof Date && !isNaN(obj.date.getTime())) ||
    (typeof obj.date === "string" && !isNaN(Date.parse(obj.date)));

  const keyCountOk = Object.keys(obj).length <= 6;

  return (
    hasValidId &&
    hasDetails &&
    hasValidCategory &&
    hasCurrency &&
    hasValue &&
    hasDate &&
    keyCountOk
  );
}
