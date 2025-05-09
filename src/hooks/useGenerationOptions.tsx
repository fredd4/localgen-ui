import { defaultGenerationOptions } from "@/config/imageGeneration";
import { estimateCost } from "@/lib/costEstimation";
import {
  generationOptionsAtom,
  priceAtom,
  showGenerationOptionsAtom,
} from "@/store/atoms";
import { PromptEnhancementModelValue, QualityValue } from "@/types";
import { useAtom } from "jotai";
import { useEffect } from "react";

// Local storage keys
const AGENT_MODE_KEY = "localgen_agent_mode";
const PROMPT_ENHANCEMENT_MODEL_KEY = "localgen_prompt_enhancement_model";
const QUALITY_KEY = "localgen_quality";

export const useGenerationOptions = () => {
  const [price, setPrice] = useAtom(priceAtom);
  const [showSettings, setShowSettings] = useAtom(showGenerationOptionsAtom);
  const toggleShowSettings = () => setShowSettings((prev) => !prev);
  const [generationOptions, setGenerationOptions] = useAtom(
    generationOptionsAtom
  );

  // Load saved settings from local storage on component mount
  useEffect(() => {
    try {
      // Load agent mode setting
      const savedAgentMode = localStorage.getItem(AGENT_MODE_KEY);
      
      // Load prompt enhancement model setting
      const savedPromptEnhancementModel = localStorage.getItem(PROMPT_ENHANCEMENT_MODEL_KEY) as PromptEnhancementModelValue | null;
      
      // Load quality setting
      const savedQuality = localStorage.getItem(QUALITY_KEY) as QualityValue | null;
      
      // If we have saved values, update the generation options
      if (savedAgentMode !== null || savedPromptEnhancementModel !== null || savedQuality !== null) {
        setGenerationOptions(prevOptions => ({
          ...prevOptions,
          ...(savedAgentMode !== null && { agentMode: savedAgentMode === "true" }),
          ...(savedPromptEnhancementModel !== null && { 
            promptEnhancementModel: 
              savedPromptEnhancementModel === "gpt-4o" || savedPromptEnhancementModel === "gpt-4o-mini" 
                ? savedPromptEnhancementModel 
                : defaultGenerationOptions.promptEnhancementModel 
          }),
          ...(savedQuality !== null && {
            quality: 
              savedQuality === "low" || savedQuality === "medium" || savedQuality === "high"
                ? savedQuality
                : defaultGenerationOptions.quality
          }),
        }));
      }
    } catch (error) {
      console.error("Error loading settings from local storage:", error);
    }
  }, [setGenerationOptions]);

  // Save settings to local storage when they change
  useEffect(() => {
    try {
      localStorage.setItem(AGENT_MODE_KEY, String(generationOptions.agentMode));
      localStorage.setItem(PROMPT_ENHANCEMENT_MODEL_KEY, generationOptions.promptEnhancementModel);
      localStorage.setItem(QUALITY_KEY, generationOptions.quality);
    } catch (error) {
      console.error("Error saving settings to local storage:", error);
    }
  }, [
    generationOptions.agentMode, 
    generationOptions.promptEnhancementModel,
    generationOptions.quality
  ]);

  useEffect(() => {
    const price = estimateCost(generationOptions);
    setPrice(price);
  }, [generationOptions, setPrice]);

  return {
    price,
    showSettings,
    toggleShowSettings,
    generationOptions,
    setGenerationOptions,
  };
};
