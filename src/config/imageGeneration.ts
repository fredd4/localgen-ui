import { GenerationOptions } from "@/types";
import {
  RectangleHorizontalIcon,
  RectangleVerticalIcon,
  SquareIcon,
} from "lucide-react";

export const defaultGenerationOptions = {
  aspectRatio: "square",
  style: "vivid",
  hdQuality: false,
  numImages: 1,
} as GenerationOptions;

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