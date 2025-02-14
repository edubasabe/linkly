import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import CreateLinkForm from "@/components/CreateLinkForm";
import ShortLinkDisplay from "@/components/ShortLinkDisplay";

export default function GenerateLink() {
  const [shortLink, setShortLink] = useState("");

  return (
    <Card className="w-full max-w-xs xl:max-w-2xl">
      <CardHeader>
        <CardTitle>Shorten Your URL 🚀</CardTitle>
        <CardDescription>
          Paste your long URL and get a short link instantly!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateLinkForm
          onLinkCreated={(shortLink) => setShortLink(shortLink)}
        />
      </CardContent>
      {!!shortLink.length && (
        <CardFooter>
          <ShortLinkDisplay shortLink={shortLink} />
        </CardFooter>
      )}
    </Card>
  );
}
