import { formatNumber } from '@/utils/functions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface CardInfoProps {
  className?: string;
  title?: string;
  value: number;
  currency?: string;
  info?: string;
}

const CardInfo = ({className, title, value, currency = "", info =""}: CardInfoProps) => {

  return (
    <Card className={`flex flex-col ${className} select-none`}>
      <CardHeader>
        <CardTitle className='uppercase w-full text-center'>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-4xl text-blizzard-blue-950 font-semibold ">
        <p>
          {formatNumber(value, currency)} {currency}
        </p>  
      </CardContent>
      <CardFooter className='flex justify-end items-center text-xl font-semibold'>
        {info}
      </CardFooter>
    </Card>
  );
};

export default CardInfo;
