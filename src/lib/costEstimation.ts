import type { GenerationOptions } from "@/types";

const costPerImage = (settings: GenerationOptions) => {
  if (settings.hdQuality) {
    if (settings.aspectRatio === "square") {
      return 0.08;
    } else {
      return 0.12;
    }
  } else {
    if (settings.aspectRatio === "square") {
      return 0.04;
    } else {
      return 0.08;
    }
  }
};

export const estimateCost = (settings: GenerationOptions) =>
  costPerImage(settings) * settings.numImages;
