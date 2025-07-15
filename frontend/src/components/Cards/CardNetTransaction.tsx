import { months } from '@/utils/constants';
import CardInfo from './CardInfo';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

interface infoValues {
  value: number;
  currency: string;
  info: string;
}

const defaultValue: infoValues = {
  value: 0,
  currency: 'CLP',
  info: '',
};

interface NetTransactionCardProps {
  value?: number;
  currency?: string;
  info?: string;
  month?: number;
}

export function CardNetTransaction({
  value,
  currency,
  info,
  month,
}: NetTransactionCardProps) {
  const token = useContext(AuthContext).token
  const transaction: infoValues = {
    value: value && !isNaN(value) ? value : token ? 0 : defaultValue.value,
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
