import { formatNumber } from '@/utils/functions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface CardInfoProps {
  className?: string;
}

const CardInfo = ({className}: CardInfoProps) => {

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader>
        <CardTitle className='uppercase w-full text-center'>Mes con mayor ingreso</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-4xl text-blizzard-blue-950 font-semibold">
        <p>
          {formatNumber(5000000, 'CLP')} CLP
        </p>  
      </CardContent>
      <CardFooter className='flex justify-end items-center text-xl  font-semibold'>
        Abril 2024
      </CardFooter>
    </Card>
  );
};

export default CardInfo;
