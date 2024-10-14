import type { GenerationOptions } from "@/types";
import { generationCost } from "@/config/imageGeneration";

const costPerImage = (settings: GenerationOptions) => {
  if (settings.hdQuality) {
    if (settings.aspectRatio === "square") {
      return generationCost.hd.square;
    } else {
      return generationCost.hd.nonSquare;
    }
  } else {
    if (settings.aspectRatio === "square") {
      return generationCost.nonHd.square;
    } else {
      return generationCost.nonHd.nonSquare;
    }
  }
};

export const estimateCost = (settings: GenerationOptions) =>
  costPerImage(settings) * settings.numImages;
