import { formatNumber } from '@/utils/functions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { HTMLProps } from 'react';


interface CardInfoProps {
  className?: HTMLProps<HTMLElement>["className"];
  title?: string;
  value: number;
  currency?: string;
  info?: string;
  status?: 'increment' | 'decrement' | undefined
}

const CardInfo = ({className, title, value, currency = "", info ="", status}: CardInfoProps) => {

  return (
    <Card className={`flex flex-col ${className} select-none bg-blizzard-blue-100 z-10 border-t-1 border-l-1 border-blizzard-blue-800 border-r-4 border-b-4`}>
      <CardHeader>
        <CardTitle className='uppercase w-full text-center text-xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-3xl text-blizzard-blue-950 font-semibold gap-2">
        <p>
          {currency ? formatNumber(value, currency): value}
        </p>  
        {status === 'increment' && <TrendingUp color='#00b512' size={40}/>}
        {status === 'decrement' && <TrendingDown color='#b50000' size={40}/>}
      </CardContent>
      <CardFooter className='flex justify-end items-center text-xl font-semibold'>
        {info} ({currency})
      </CardFooter>
    </Card>
  );
};

export default CardInfo;
