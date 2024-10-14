import { defaultGenerationOptions } from "@/config/imageGeneration";
import { GenerationOptions } from "@/types";
import { useState } from "preact/hooks";

export const useGenerationOptions = () => {
  const [price, setPrice] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const toggleShowSettings = () => setShowSettings((prev) => !prev);

  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>(defaultGenerationOptions);

  return {
    price,
    setPrice,
    showSettings,
    toggleShowSettings,
    generationOptions,
    setGenerationOptions,
  };
};
