import { HTMLProps, ReactElement } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface CardContainerProps {
  className?: HTMLProps<HTMLElement>["className"];
  classNameTitle?: HTMLProps<HTMLElement>["className"];
  classNameHeader?: HTMLProps<HTMLElement>["className"];
  classNameBody?: HTMLProps<HTMLElement>["className"];
  classNameFooter?: HTMLProps<HTMLElement>["className"];
  children?: ReactElement;
  title?: string;
  description?: string;
  footer?: ReactElement | string;
}

function CardContainer({
  className,
  classNameTitle,
  classNameBody,
  classNameHeader,
  classNameFooter,
  children,
  title,
  description,
  footer,
}: CardContainerProps) {
  return (
    <Card
      className={`${className} select-none bg-blizzard-blue-100 z-10 border-t-1 border-l-1 border-blizzard-blue-800 border-r-4 border-b-4`}
    >
      {(title || description) && (
        <CardHeader className={`pb-2 ${classNameHeader}`}>
          {title && (
            <CardTitle className={`text-xl font-semibold uppercase ${classNameTitle}`}>
              {title}
            </CardTitle>
          )}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={classNameBody}>{children}</CardContent>
      {footer && <CardFooter className={classNameFooter}>{footer}</CardFooter>}
    </Card>
  );
}

export default CardContainer;
