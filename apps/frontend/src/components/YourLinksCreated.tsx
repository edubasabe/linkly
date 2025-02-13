import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";

// Sample data for demonstration
const sampleLinks = [
  {
    original: "https://www.example.com/very/long/url/that/needs/shortening",
    shortened: "https://linkly.short/abc123",
  },
  {
    original: "https://another-example.com/with/a/long/path/to/shorten",
    shortened: "https://linkly.short/def456",
  },
  {
    original: "https://yet-another-long-url-example.com/path/to/page",
    shortened: "https://linkly.short/ghi789",
  },
];
export default function YourLinksCreated() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Your Shortened Links 📊</CardTitle>
        <CardDescription>
          Here's a list of your recently shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Shortened URL</TableHead>
              <TableHead className="w-[100px]">Copy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleLinks.map((link, index) => (
              <TableRow key={index}>
                <TableCell
                  className="font-medium truncate max-w-[300px]"
                  title={link.original}
                >
                  {link.original}
                </TableCell>
                <TableCell>{link.shortened}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Copy shortened URL"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
