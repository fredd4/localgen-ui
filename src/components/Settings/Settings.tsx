import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ApiKeyInput } from "./ApiKeyInput";
import { useManageSavedImages } from "@/hooks/useManageSavedImages";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Settings = () => {
  const { savedImagesCount, savedImagesCost } = useManageSavedImages();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your API key and other settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="api-key" className="text-sm font-medium">
            OpenAI API Key
          </label>
          <Alert className="mb-4">
            <InfoIcon className="h-4 w-4 mr-2" />
            <AlertDescription>
              <p className="text-sm">
                <strong>Privacy Notice:</strong> Your API key is stored only in your browser's local storage and is never sent to our servers. 
                All generated images are also stored only in your browser.
              </p>
              <p className="text-sm mt-1">
                Please download any images you wish to keep, as they may be lost if you clear your browser data or switch browsers.
              </p>
            </AlertDescription>
          </Alert>
          <ApiKeyInput />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Usage</label>
          <p className="text-sm text-gray-500">
            Total cost: ${savedImagesCost.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Images generated: {savedImagesCount}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
