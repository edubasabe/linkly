import { Edit, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import TooltipWrapper from "./TooltipWrapper";

type Props = {
  shortLink: string;
  original?: string;
};
export default function TableItemActions({ shortLink }: Props) {
  return (
    <div className="flex gap-x-4">
      <TooltipWrapper label="Copy shortened URL">
        <Button variant="ghost" size="icon" title="Copy shortened URL">
          <Copy
            onClick={async () => {
              await copyToClipboard(shortLink);
            }}
            className="h-4 w-4"
          />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper label="Edit original URL">
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
    </div>
  );
}
