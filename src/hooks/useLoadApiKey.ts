import { getSetting, hasSetting } from "@/lib/idb/settingsStore";
import { apiKeyAtom, isApiKeyValidAtom } from "@/store/atoms";
import { apiKeySetting } from "@/store/idbSettings";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useLoadApiKey = (
  setError?: (error: string) => void,
  setLoading?: (loading: boolean) => void
) => {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [isApiKeyValid, setIsApiKeyValid] = useAtom(isApiKeyValidAtom);
  
  useEffect(() => {
    const loadApiKey = async () => {
      if (setLoading) setLoading(true);
      try {
        // Check for environment variable first
        const envApiKey = import.meta.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
        if (envApiKey) {
          // Using API key from environment variable
          setApiKey(envApiKey);
          setIsApiKeyValid(true);
          if (setLoading) setLoading(false);
          return;
        }

        const hasApiKeyStored = await hasSetting(apiKeySetting);
        if (hasApiKeyStored) {
          const storedApiKey = await getSetting(apiKeySetting);
          if (storedApiKey) {
            setApiKey(storedApiKey);
            setIsApiKeyValid(true);
          }
        }
      } catch (error) {
        if (setError) setError((error as Error).message);
      } finally {
        if (setLoading) setLoading(false);
      }
    };

    loadApiKey();
  // We intentionally exclude dependencies for this effect as it should only run once
  }, []);

  return { apiKey, isApiKeyValid };
};
