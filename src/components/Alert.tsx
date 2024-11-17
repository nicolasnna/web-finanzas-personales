import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AlertInputs {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  children: JSX.Element | JSX.Element[];
  title: string;
  buttonLeftLabel: string;
  buttonRightLabel: string;
  buttonRightClick: () => void;
  buttonLeftClick: () => void;
}

export const Alert = ({
  show,
  setShow,
  description,
  children,
  title,
  buttonLeftLabel,
  buttonRightLabel,
  buttonRightClick,
  buttonLeftClick,
}: AlertInputs) => {
  return (
    <AlertDialog open={show} onOpenChange={setShow}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div>{children}</div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={buttonLeftClick}>
            {buttonLeftLabel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={buttonRightClick}>
            {buttonRightLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Alert