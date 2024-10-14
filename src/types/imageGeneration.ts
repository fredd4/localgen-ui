import { aspectRatios } from "@/config/imageGeneration";
export type AspectRatioSetting = (typeof aspectRatios)[number];
export type AspectRatioValue = AspectRatioSetting["value"];
export type StyleValue = "natural" | "vivid";

export interface GenerationOptions {
  aspectRatio: AspectRatioValue;
  style: "natural" | "vivid";
  hdQuality: boolean;
  numImages: number;
}
