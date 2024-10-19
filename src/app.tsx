import History from "@/components/History/History";
import ImageGeneration from "@/components/ImageGeneration/ImageGeneration";
import Header from "@/components/Layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClockIcon, ImageIcon } from "lucide-react";

const iconStyle = "w-5 h-5 mr-2";
const tabTriggerStyle =
  "flex items-center justify-center bg-muted text-muted-foreground border-border hover:bg-secondary hover:text-secondary-foreground focus:ring-ring active:bg-secondary active:text-secondary-foreground text-lg";

const App = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="mx-auto max-w-4xl">
      <Header />
      <Tabs defaultValue="generate">
        <TabsList className="grid w-full grid-cols-2 rounded-lg border-border bg-card text-card-foreground">
          <TabsTrigger value="generate" className={tabTriggerStyle}>
            <ImageIcon className={iconStyle} />
            Generate
          </TabsTrigger>
          <TabsTrigger value="history" className={tabTriggerStyle}>
            <ClockIcon className={iconStyle} />
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <ImageGeneration />
        </TabsContent>
        <TabsContent value="history">
          <History />
        </TabsContent>
      </Tabs>
    </div>
  </div>
);

export default App;
