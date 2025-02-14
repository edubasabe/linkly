import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  asChild?: boolean;
  title?: string;
  description?: string;
  className?: string;
  onConfirm: () => void;
  onCancel: () => void;
};
export default function ConfirmationModal({
  children,
  title = "Are you sure?",
  description,
  className,
  asChild = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild} className={cn(className)}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
