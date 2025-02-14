import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  children: React.ReactNode;
  label: string;
  asChild?: boolean;
};
export default function TooltipWrapper({
  children,
  label,
  asChild = true,
}: Props) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
