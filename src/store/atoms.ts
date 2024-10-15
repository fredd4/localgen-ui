import { defaultGenerationOptions } from "@/config/imageGeneration";
import { estimateCost } from "@/lib/costEstimation";
import { createFieldAtom } from "@/lib/utils";
import { GeneratedImage, GenerationOptions } from "@/types";
import { atom } from "jotai";

export const showGenerationOptionsAtom = atom(false);
export const generationOptionsAtom = atom<GenerationOptions>(
  defaultGenerationOptions
);
export const gaUseExactPromptAtom = createFieldAtom(
  generationOptionsAtom,
  "useExactPrompt"
);

export const isGeneratingAtom = atom(false);
export const generatedImagesAtom = atom<GeneratedImage[]>([]);
export const errorAtom = atom<string | null>(null);
export const priceAtom = atom(estimateCost(defaultGenerationOptions));

export const apiKeyAtom = atom("");
export const isApiKeyValidAtom = atom(false);
