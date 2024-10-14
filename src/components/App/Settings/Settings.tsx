import { useState } from "preact/hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const [apiKey, setApiKey] = useState("");

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
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Usage</label>
          <p className="text-sm text-gray-500">Total cost: $0.00</p>
          <p className="text-sm text-gray-500">Images generated: 0</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
