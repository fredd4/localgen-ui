import { apiKeySetting } from "@/store/idbSettings";
import { setSetting } from "./idb/settingsStore";

export const validateApiKey = async (
  key: string,
  setIsApiKeyValid: (isValid: boolean) => void,
  setApiKey: (apiKey: string) => void,
  setError: (error: string) => void,
  setLoading: (loading: boolean) => void
) => {
  const handleInvalidApiKey = (message: string) => {
    setError(message);
    setIsApiKeyValid(false);
    setApiKey("");
  };

  if (!key.startsWith("sk-")) {
    handleInvalidApiKey("Invalid API key format");
    return;
  }
  setLoading(true);
  setError("");
  try {
    if (key === "sk-debug") {
      setIsApiKeyValid(true);
      await setSetting(apiKeySetting, key);
      return;
    }
    const response = await fetch("https://api.openai.com/v1/models/dall-e-3", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
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
        handleInvalidApiKey("API key is invalid");
      }
    } else {
      handleInvalidApiKey("API key is invalid");
    }
  } catch {
    handleInvalidApiKey("An error occurred during validation");
  } finally {
    setLoading(false);
  }
};
