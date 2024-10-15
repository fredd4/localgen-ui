import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getSetting,
  hasSetting,
  removeSetting,
  setSetting,
} from "@/lib/idb/settingsStore";
import { apiKeySetting } from "@/store/idbSettings";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "preact/hooks";

export const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);

  useEffect(() => {
    const loadApiKey = async () => {
      setLoading(true);
      try {
        const hasApiKeyStored = await hasSetting(apiKeySetting);
        if (hasApiKeyStored) {
          const storedApiKey = await getSetting(apiKeySetting);
          if (storedApiKey) {
            setApiKey(storedApiKey);
            await validateApiKey(storedApiKey);
          }
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadApiKey();
  }, []);

  const validateApiKey = async (key: string) => {
    if (!key.startsWith("sk-")) {
      setError("Invalid API key format");
      setIsApiKeyValid(false);
      setApiKey("");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://api.openai.com/v1/models/dall-e-3",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${key}`,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        if (
          data.id === "dall-e-3" &&
          data.object === "model" &&
          data.owned_by === "system"
        ) {
          setIsApiKeyValid(true);
          await setSetting(apiKeySetting, key);
        } else {
          setError("API key is invalid");
          setIsApiKeyValid(false);
          setApiKey("");
        }
      } else {
        setError("API key is invalid");
        setIsApiKeyValid(false);
        setApiKey("");
      }
    } catch {
      setError("An error occurred during validation");
      setIsApiKeyValid(false);
      setApiKey("");
    } finally {
      setLoading(false);
    }
  };

  const onBlur = () => {
    if (apiKey) {
      validateApiKey(apiKey);
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
