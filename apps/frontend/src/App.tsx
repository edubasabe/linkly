import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/fetch";
import CreateLinkForm from "./components/CreateLinkForm";
import ShortLinkDisplay from "./components/ShortLinkDisplay";
import Layout from "@/components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [shortLink, setShortLink] = useState("");

  useEffect(() => {
    getSession();
  }, []);

  return (
    <Layout>
      <Header />
      <Card className="w-full max-w-md">
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
      <Footer />
    </Layout>
  );
}

export default App;
