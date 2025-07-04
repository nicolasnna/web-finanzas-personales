import { months } from '@/utils/constants';
import CardInfo from './CardInfo';

interface infoValues {
  value: number;
  currency: string;
  info: string;
}

const defaultValue: infoValues = {
  value: 500000,
  currency: 'CLP',
  info: 'Gasto neto',
};

interface NetTransactionCardProps {
  value?: number;
  currency?: string;
  info?: string;
  month?: number;
}

export function NetTransactionCard({
  value,
  currency,
  info,
  month,
}: NetTransactionCardProps) {
  const transaction: infoValues = {
    value: value && !isNaN(value) ? value : defaultValue.value,
    currency: currency ?? defaultValue.currency,
    info: info ?? defaultValue.info,
  };
  const statusCheck =
    transaction.value > 0
      ? 'increment'
      : transaction.value < 0
      ? 'decrement'
      : undefined;

  return (
    <CardInfo
      title="Resultado neto del mes"
      value={transaction.value}
      currency={transaction.currency}
      info={`${transaction.info} | ${
        months[(month && month - 1) ?? new Date(Date.now()).getMonth()]
      }`}
      status={statusCheck}
    />
  );
}
