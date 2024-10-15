import { aspectRatios } from "@/config/imageGeneration";
export type AspectRatioSetting = (typeof aspectRatios)[number];
export type AspectRatioValue = AspectRatioSetting["value"];
export type StyleValue = "natural" | "vivid";

export interface GenerationOptions {
  prompt: string;
  useExactPrompt: boolean;
  aspectRatio: AspectRatioValue;
  style: StyleValue;
  hdQuality: boolean;
  numImages: number;
}
