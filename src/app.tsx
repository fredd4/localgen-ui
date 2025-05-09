import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import "./index.css";
import ImageGeneration from "./components/ImageGeneration/ImageGeneration";
import Settings from "./components/Settings/Settings";
import History from "./components/History/History";
import ErrorNotification from "./components/ErrorNotification";
import Header from "@/components/Layout/Header";
import { ClockIcon, ImageIcon } from "lucide-react";
import { useInitializeApiErrorSetter } from "./lib/api/getEnhancedPrompts";
import { activeTabAtom } from "@/store/atoms";
import { useAtom } from "jotai";

const iconStyle = "w-5 h-5 mr-2";
const tabTriggerStyle =
  "flex items-center justify-center bg-muted text-muted-foreground border-border hover:bg-secondary hover:text-secondary-foreground focus:ring-ring active:bg-secondary active:text-secondary-foreground text-lg";

const App = () => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  
  // Initialize API error setter
  useInitializeApiErrorSetter();

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="fixed top-[20px] left-[50%] -translate-x-1/2 z-50">
            <ErrorNotification />
          </div>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                LocalGen UI
              </h1>
              <p className="text-center text-lg text-muted-foreground mt-2">
                Generate images with the OpenAI API
              </p>
            </div>

            <Tabs
              defaultValue="create"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mx-auto w-full max-w-4xl"
            >
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="create">Create</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="create" className="mt-4">
                <ImageGeneration />
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <History />
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <Settings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
