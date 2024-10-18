import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ApiKeyInput } from "./ApiKeyInput";
import { useManageSavedImages } from "@/hooks/useManageSavedImages";

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
            API Key
          </label>
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
