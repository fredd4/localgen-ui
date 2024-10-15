import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoadApiKey } from "@/hooks/useLoadApiKey";
import { removeSetting } from "@/lib/idb/settingsStore";
import { validateApiKey } from "@/lib/validateApiKey";
import { apiKeySetting } from "@/store/idbSettings";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useState } from "preact/hooks";

export const ApiKeyInput = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { apiKey, setApiKey, isApiKeyValid, setIsApiKeyValid } = useLoadApiKey(
    setError,
    setLoading
  );

  const onBlur = () => {
    if (apiKey) {
      validateApiKey(apiKey, setIsApiKeyValid, setApiKey, setError, setLoading);
    }
  };

  const onRemoveButtonClick = async () => {
    setLoading(true);
    try {
      await removeSetting(apiKeySetting);
      setApiKey("");
      setIsApiKeyValid(false);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      {loading ? (
        <div className="flex h-20 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="space-y-6">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center text-red-600">
                <XCircle className="mr-2 h-5 w-5" /> {error}
              </div>
            </motion.div>
          )}
          {isApiKeyValid ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between rounded-lg bg-green-100 p-4">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="mr-2 h-6 w-6" /> Your API key is valid
                </div>
                <Button variant="destructive" onClick={onRemoveButtonClick}>
                  Remove
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) =>
                  setApiKey((e.target as HTMLInputElement).value)
                }
                onBlur={onBlur}
                placeholder="Enter your OpenAI API key"
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
