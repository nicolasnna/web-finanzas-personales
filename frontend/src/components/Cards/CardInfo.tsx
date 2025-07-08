import { formatNumber } from '@/utils/functions';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { HTMLProps, useEffect, useState } from 'react';

interface CardInfoProps {
  className?: HTMLProps<HTMLElement>['className'];
  classNameHeader?: HTMLProps<HTMLElement>['className'];
  classNameContent?: HTMLProps<HTMLElement>['className'];
  classNameFooter?: HTMLProps<HTMLElement>['className'];
  title?: string;
  value: number;
  currency?: string;
  info?: string;
  status?: 'increment' | 'decrement' | undefined;
}

const CardInfo = ({
  className,
  classNameHeader,
  classNameContent,
  classNameFooter,
  title,
  value,
  currency = '',
  info = '',
  status,
}: CardInfoProps) => {
  const [valueCount, setValueCount] = useState(0)
  console.log(value)
  useEffect(() => {
    const increment = Math.round(value / 4)
    const interval = setInterval(() => {
      setValueCount((prev) => {
        const next = prev + increment
        if (next >= value) {
          clearInterval(interval)
          return value
        }
        return next
      })
    }, 60)

    // Cleanup para desmontar o cuando `value` cambie
    return () => clearInterval(interval)
  }, [value])

  return (
    <Card
      className={`flex flex-col ${className} select-none bg-blizzard-blue-100 z-10 border-t-1 border-l-1 border-blizzard-blue-800 border-r-4 border-b-4`}
    >
      <CardHeader className={classNameHeader}>
        <CardTitle className="uppercase w-full text-center text-xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={`flex items-center justify-center text-3xl text-blizzard-blue-950 font-semibold gap-2 ${classNameContent}`}>
        <p>{currency ? formatNumber(valueCount, currency) : valueCount}</p>
        {status === 'increment' && <TrendingUp color="#00b512" size={40} />}
        {status === 'decrement' && <TrendingDown color="#b50000" size={40} />}
      </CardContent>
      {(info ) && 
        <CardFooter className={`flex justify-end items-center text-xl font-semibold ${classNameFooter}`}>
          {info} {currency ? `(${currency})` : ''}
        </CardFooter>
      }
    </Card>
  );
};

export default CardInfo;
