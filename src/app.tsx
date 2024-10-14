import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/App/Layout/Header';
import ImageGeneration from "@/components/App/ImageGeneration/ImageGeneration";
import History from "@/components/App/History/History";
import Settings from "@/components/App/Settings/Settings";

const App = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-6xl mx-auto">
      <Header />
      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <ImageGeneration />
        </TabsContent>
        <TabsContent value="history">
          <History />
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  </div>
);

export default App;
