import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";

export default function ShortLinkDisplay({ shortLink }: { shortLink: string }) {
  const [copyText, setCopyText] = useState("Copy to Clipboard 📋");
  const handleCopyToClipboard = () => {
    copyToClipboard(shortLink).then(() => {
      setCopyText("Copied! 🎉");
      setTimeout(() => {
        setCopyText("Copy to Clipboard 📋");
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full text-center p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-600 mb-2">Your shortened URL:</p>
        <a
          href={shortLink}
          target="_blank"
          className="text-lg font-semibold text-blue-800 hover:text-blue-600 underline"
        >
          {shortLink}
        </a>
      </div>
      <Button
        onClick={handleCopyToClipboard}
        variant="outline"
        className="mt-4"
      >
        {copyText}
      </Button>
    </div>
  );
}
