import { GenerationOptions } from "@/types";
import { useState } from "preact/hooks";

export const useGenerationOptions = () => {
  const [price, setPrice] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const toggleShowSettings = () => setShowSettings((prev) => !prev);

  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>({
    aspectRatio: "square",
    style: "vivid",
    hdQuality: false,
    numImages: 1,
  });

  return {
    price,
    setPrice,
    showSettings,
    toggleShowSettings,
    generationOptions,
    setGenerationOptions,
  };
};
