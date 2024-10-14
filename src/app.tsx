import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/App/Layout/Header';
import ImageGeneration from "@/components/App/ImageGeneration/ImageGeneration";
import History from "@/components/App/History/History";
import Settings from "@/components/App/Settings/Settings";
import { ClockIcon, ImageIcon, SettingsIcon } from 'lucide-react';

const iconStyle = "w-4 h-4 mr-2";

const App = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-6xl mx-auto">
      <Header />
      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-primary text-primary-foreground rounded-lg p-1">
          <TabsTrigger value="generate">
            <ImageIcon className={iconStyle} />
            Generate
          </TabsTrigger>
          <TabsTrigger value="history">
            <ClockIcon className={iconStyle} />
            History
          </TabsTrigger>
          <TabsTrigger value="settings">
            <SettingsIcon className={iconStyle} />
            Settings
          </TabsTrigger>
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
