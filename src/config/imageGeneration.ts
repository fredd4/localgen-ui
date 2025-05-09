import { AspectRatioValue, GenerationOptions } from "@/types";
import { AspectRatioParameter } from "@/types/models";
import {
  RectangleHorizontalIcon,
  RectangleVerticalIcon,
  SquareIcon,
} from "lucide-react";

export const MAX_IMAGES = 6;
export const MIN_IMAGES = 1;

export const defaultGenerationOptions: GenerationOptions = {
  model: "gpt-image-1",
  prompt: "",
  aspectRatio: "square",
  quality: "medium",
  transparency: false,
  moderation: "low",
  numImages: MIN_IMAGES,
  imageInput: undefined,
  agentMode: false,
  promptEnhancementModel: "gpt-4o-mini",
} as const;

export const aspectRatios: {
  value: AspectRatioValue;
  label: string;
  description: string;
  Icon: typeof SquareIcon;
}[] = [
  {
    value: "square",
    label: "Square",
    description: "1024x1024",
    Icon: SquareIcon,
  },
  {
    value: "horizontal",
    label: "Horizontal",
    description: "1536×1024",
    Icon: RectangleHorizontalIcon,
  },
  {
    value: "vertical",
    label: "Vertical",
    description: "1024×1536",
    Icon: RectangleVerticalIcon,
  },
];

// Define the cost structure type to help with TypeScript
type GenerationCostStructure = {
  [quality: string]: {
    [size in AspectRatioParameter]: number;
  };
};

// Per image pricing for GPT-image-1 - exact pricing based on quality and dimensions
export const generationCost: GenerationCostStructure = {
  low: {
    "1024x1024": 0.011,
    "1024x1536": 0.016,
    "1536x1024": 0.016,
  },
  medium: {
    "1024x1024": 0.042,
    "1024x1536": 0.063,
    "1536x1024": 0.063,
  },
  high: {
    "1024x1024": 0.167,
    "1024x1536": 0.25,
    "1536x1024": 0.25,
  },
} as const;
