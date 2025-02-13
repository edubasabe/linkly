import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
