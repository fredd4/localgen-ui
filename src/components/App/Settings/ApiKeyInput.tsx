import { Input } from "@/components/ui/input";
import { useEffect, useState } from "preact/hooks";
import { hasSetting, getSetting, setSetting, removeSetting } from "@/lib/idb/settingsStore";
import { apiKeySetting } from "@/config/idbSettings";
import { Button } from "@/components/ui/button";

export const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);

  useEffect(() => {
    if (!apiKey) {
      hasSetting(apiKeySetting).then((hasApiKeyStored) => {
        if (hasApiKeyStored) {
          setLoading(true)
          try {
            getSetting(apiKeySetting).then((value) => {
              setApiKey(value)
              setHasApiKey(true)
            })
          } catch (error) {
            setError((error as Error).message)
          } finally {
            setLoading(false)
          }
        } else {
          setHasApiKey(false)
        }
      })
    }
  }, [apiKey]);

  useEffect(() => {
    if (hasApiKey) {
      if (apiKey.startsWith("sk-")) { /* TODO: validate API key via OpenAI */
        setIsApiKeyValid(true)
      } else {
        setIsApiKeyValid(false)
        setHasApiKey(false)
      }
    }
  }, [hasApiKey, apiKey]);

  const onBlur = () => {
    if (apiKey) {
      setHasApiKey(true);
    }
  }

  const onRemoveButtonClick = async () => {
    setLoading(true)
    try {
      await removeSetting(apiKeySetting)
      setApiKey("")
      setHasApiKey(false)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
      <>
        {loading && <div>Loading...</div>}
        {
          (apiKey && hasApiKey && isApiKeyValid) ? (
            <>
              <div className="text-green-500">API key is valid</div>
              <Button
                variant="destructive"
                onClick={onRemoveButtonClick}
              >Remove</Button>
            </>
          ) : (
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey((e.target as HTMLInputElement).value)}
              onBlur={onBlur}
              placeholder="sk-[...]"
              className=""
            />
          )
        }
        {error && <div className="text-red-500">{error}</div>}

      </>
    );
}