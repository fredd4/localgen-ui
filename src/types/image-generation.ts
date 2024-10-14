import { aspectRatios } from "@/config/image-generation";


export type AspectRatioSetting = (typeof aspectRatios)[number];
export type AspectRatioValue = AspectRatioSetting["value"];
