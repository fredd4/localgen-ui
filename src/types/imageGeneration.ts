import { AspectRatioValue } from "@/types";

export type QualityValue = "low" | "medium" | "high";
export type ModerationValue = "low" | "auto";

export interface GenerationOptions {
  model: string;
  prompt: string;
  useExactPrompt: boolean;
  aspectRatio: AspectRatioValue;
  quality: QualityValue;
  transparency: boolean;
  moderation: ModerationValue;
  numImages: number;
  imageInput?: string;
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
