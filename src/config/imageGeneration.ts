import { GenerationOptions } from "@/types";
import {
  RectangleHorizontalIcon,
  RectangleVerticalIcon,
  SquareIcon,
} from "lucide-react";

export const MAX_IMAGES = 6;
export const MIN_IMAGES = 1;

export const defaultGenerationOptions: GenerationOptions = {
  prompt: "",
  useExactPrompt: false,
  aspectRatio: "square",
  style: "vivid",
  hdQuality: false,
  numImages: MIN_IMAGES,
} as const;

export const aspectRatios = [
  {
    value: "square",
    label: "Square",
    description: "1024x1024",
    Icon: SquareIcon,
  },
  {
    value: "horizontal",
    label: "Horizontal",
    description: "1792×1024",
    Icon: RectangleHorizontalIcon,
  },
  {
    value: "vertical",
    label: "Vertical",
    description: "1024×1792",
    Icon: RectangleVerticalIcon,
  },
] as const;

export const generationCost = {
  hd: {
    square: 0.08,
    nonSquare: 0.12,
  },
  nonHd: {
    square: 0.04,
    nonSquare: 0.08,
  },
} as const;