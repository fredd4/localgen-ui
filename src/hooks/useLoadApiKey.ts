import { getSetting, hasSetting } from "@/lib/idb/settingsStore";
import { apiKeyAtom, isApiKeyValidAtom } from "@/store/atoms";
import { apiKeySetting } from "@/store/idbSettings";
import { useAtom } from "jotai";
import { useEffect } from "react";

// Helper to determine if we're running on Firebase hosting
const isFirebaseHosting = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if we're on a Firebase hosting domain
  const hostname = window.location.hostname;
  return hostname.includes('firebaseapp.com') || 
         hostname.includes('web.app') ||
         // Check for a production environment
         import.meta.env.PROD === true;
};

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
        // In development mode, we can use environment variables
        // But in production/Firebase hosting, we skip this to avoid exposing keys
        if (!isFirebaseHosting()) {
          const envApiKey = import.meta.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
          if (envApiKey) {
            // Using API key from environment variable (only in development)
            setApiKey(envApiKey);
            setIsApiKeyValid(true);
            if (setLoading) setLoading(false);
            return;
          }
        }

        // Always try to load from IndexedDB (works in all environments)
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

  // Return both the values and their setters
  return { apiKey, setApiKey, isApiKeyValid, setIsApiKeyValid };
};
