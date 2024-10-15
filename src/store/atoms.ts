import { defaultGenerationOptions } from "@/config/imageGeneration";
import { estimateCost } from "@/lib/costEstimation";
import { createFieldAtom } from "@/lib/utils";
import { GeneratedImage, GenerationOptions } from "@/types";
import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import { GeneratedImageAction } from "./actions";
import { generatedImagesReducer } from "./reducers";

export const showGenerationOptionsAtom = atom(false);
export const generationOptionsAtom = atom<GenerationOptions>(
  defaultGenerationOptions
);
export const gaUseExactPromptAtom = createFieldAtom(
  generationOptionsAtom,
  "useExactPrompt"
);

export const apiKeyAtom = atom("");
export const isApiKeyValidAtom = atom(false);

export const isGeneratingAtom = atom(false);
export const errorAtom = atom<string | null>(null);
export const priceAtom = atom(estimateCost(defaultGenerationOptions));
export const generatedImagesAtom = atomWithReducer<
  GeneratedImage[],
  GeneratedImageAction
>([], generatedImagesReducer);
