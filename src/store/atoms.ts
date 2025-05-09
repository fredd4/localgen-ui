import { defaultGenerationOptions } from "@/config/imageGeneration";
import { estimateCost } from "@/lib/costEstimation";
import { GeneratedImage, GenerationOptions } from "@/types";
import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import { GeneratedImageAction } from "./actions";
import { generatedImagesReducer } from "./reducers";

export const showGenerationOptionsAtom = atom(false);
export const generationOptionsAtom = atom<GenerationOptions>(
  defaultGenerationOptions
);
export const promptEnhancingAtom = atom(false);

export const apiKeyAtom = atom("");
export const isApiKeyValidAtom = atom(false);

export const isGeneratingAtom = atom(false);
export const errorAtom = atom<string | null>(null);
export const priceAtom = atom(estimateCost(defaultGenerationOptions));
export const generatedImagesAtom = atomWithReducer<
  GeneratedImage[],
  GeneratedImageAction
>([], generatedImagesReducer);

export const savedImagesAtom = atomWithReducer<
  GeneratedImage[],
  GeneratedImageAction
>([], generatedImagesReducer);
export const savedImagesCountAtom = atom((get) => get(savedImagesAtom).length);
export const savedImagesCostAtom = atom((get) =>
  get(savedImagesAtom).reduce((acc, image) => acc + image.cost, 0)
);

// Reference image atom for image generation
export const referenceImageAtom = atom<string | null>(null);
export const activeTabAtom = atom<string>("create");
