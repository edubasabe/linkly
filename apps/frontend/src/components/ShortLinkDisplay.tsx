import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ShortLinkDisplay({ shortLink }: { shortLink: string }) {
  const [copyText, setCopyText] = useState("Copy to Clipboard 📋");
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortLink).then(() => {
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
        <p className="text-lg font-semibold text-blue-800">{shortLink}</p>
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
