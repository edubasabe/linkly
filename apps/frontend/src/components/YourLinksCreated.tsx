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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLinks } from "@/hooks/useLinks";
import TableRowItem from "./TableRowItem";

export default function YourLinksCreated() {
  const {
    getAll: { data: links },
  } = useLinks();

  return (
    <Card className="w-full max-w-xs xl:max-w-2xl">
      <CardHeader>
        <CardTitle>Your Shortened Links 📊</CardTitle>
        <CardDescription>
          Here's a list of your recently shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!links?.length ? (
          <p className="text-center text-sm text-gray-500">
            You haven't shortened any links yet
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Original URL</TableHead>
                <TableHead>Shortened URL</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link, index) => (
                <TableRow key={index}>
                  <TableRowItem link={link} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
