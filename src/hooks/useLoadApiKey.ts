import { getSetting, hasSetting } from "@/lib/idb/settingsStore";
import { validateApiKey } from "@/lib/validateApiKey";
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
  const dummyStringSetter = (value: string) => console.log(value);
  const dummyBooleanSetter = (value: boolean) => console.log(value);

  useEffect(() => {
    const loadApiKey = async () => {
      if (setLoading) setLoading(true);
      try {
        const hasApiKeyStored = await hasSetting(apiKeySetting);
        if (hasApiKeyStored) {
          const storedApiKey = await getSetting(apiKeySetting);
          if (storedApiKey) {
            setApiKey(storedApiKey);
            await validateApiKey(
              storedApiKey,
              setIsApiKeyValid,
              setApiKey,
              setError ?? dummyStringSetter,
              setLoading ?? dummyBooleanSetter
            );
          }
        }
      } catch (error) {
        if (setError) setError((error as Error).message);
      } finally {
        if (setLoading) setLoading(false);
      }
    };

    loadApiKey();
  }, []);

  return { apiKey, setApiKey, isApiKeyValid, setIsApiKeyValid };
};
