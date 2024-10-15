import { apiKeySetting } from "@/store/idbSettings";
import { setSetting } from "./idb/settingsStore";

export const validateApiKey = async (
  key: string,
  setIsApiKeyValid: (isValid: boolean) => void,
  setApiKey: (apiKey: string) => void,
  setError: (error: string) => void,
  setLoading: (loading: boolean,
  ) => void) => {
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
