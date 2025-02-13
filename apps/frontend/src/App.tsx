import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-700 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">Linkly 🔗✨</h1>
        <p className="text-xl text-white/80">Shorten your links in a snap!</p>
      </header>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Shorten Your URL 🚀</CardTitle>
          <CardDescription>
            Paste your long URL and get a short link instantly!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="longUrl">Long URL</Label>
              <Input
                id="longUrl"
                placeholder="https://your-long-url-here.com"
              />
            </div>
            <Button type="submit" className="w-full">
              Shorten URL ✨
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="w-full text-center p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-600 mb-2">Your shortened URL:</p>
            <p className="text-lg font-semibold text-blue-800">
              https://linkly.short/abc123
            </p>
          </div>
          <Button variant="outline" className="mt-4">
            Copy to Clipboard 📋
          </Button>
        </CardFooter>
      </Card>

      <footer className="mt-8 text-center text-white">
        <p>© 2025 Linkly</p>
        <p className="text-sm mt-2">
          No sign-up required! Just shorten and share! 🎈
        </p>
      </footer>
    </div>
  );
}

export default App;
