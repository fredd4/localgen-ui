import type { GenerationOptions } from "@/types";
import { generationCost } from "@/config/imageGeneration";
import { modelConfigs } from "@/config/models";

const costPerImage = (settings: GenerationOptions) => {
  const qualityLevel = settings.quality;
  
  // Get the actual size string (e.g., "1024x1024") from the aspect ratio
  const modelConfig = modelConfigs[settings.model];
  if (!modelConfig) {
    console.error(`Model config not found for ${settings.model}`);
    return 0;
  }
  
  const size = modelConfig.capabilities.aspectRatioToSize[settings.aspectRatio];
  if (!size) {
    console.error(`Size not defined for aspect ratio ${settings.aspectRatio}`);
    return 0;
  }
  
  // Look up the cost based on quality and size
  return generationCost[qualityLevel][size as keyof typeof generationCost[typeof qualityLevel]] || 0;
};

export const estimateCost = (settings: GenerationOptions) =>
  costPerImage(settings) * settings.numImages;
