import { AspectRatioValue } from "@/types";

export type StyleValue = "natural" | "vivid";

export interface GenerationOptions {
  model: string;
  prompt: string;
  useExactPrompt: boolean;
  aspectRatio: AspectRatioValue;
  style: StyleValue;
  hdQuality: boolean;
  numImages: number;
}

type GeneratedImageState = "pending" | "generated" | "saved" | "error";
export interface GeneratedImage {
  id: string;
  generationId: string;
  state: GeneratedImageState;
  locallySaved: boolean;
  usedOptions: GenerationOptions;
  image: string;
  revisedPrompt: string;
  error: string;
  cost: number;
  createdAt: Date;
  isProcessing?: boolean;
}
