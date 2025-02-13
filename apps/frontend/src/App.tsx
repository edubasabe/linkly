import { useEffect } from "react";
import { getSession } from "@/lib/fetch";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenerateLink from "./components/GenerateLink";
import YourLinksCreated from "./components/YourLinksCreated";

function App() {
  useEffect(() => {
    getSession();
  }, []);

  return (
    <Layout>
      <Header />
      <Tabs defaultValue="generate" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="your-links">Your Links</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <GenerateLink />
        </TabsContent>
        <TabsContent value="your-links">
          <YourLinksCreated />
        </TabsContent>
      </Tabs>
      <Footer />
    </Layout>
  );
}

export default App;
