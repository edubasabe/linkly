import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import TooltipWrapper from "./TooltipWrapper";

export default function ButtonCopy({ text }: { text: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    copyToClipboard(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <TooltipWrapper label="Copy shortened URL">
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        disabled={copied}
        className="disabled:!opacity-100"
      >
        <div
          className={cn(
            "transition-all",
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <Check
            className="stroke-emerald-500"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <div
          className={cn(
            "absolute transition-all",
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <Copy size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </Button>
    </TooltipWrapper>
  );
}
